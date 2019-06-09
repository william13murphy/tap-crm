import { createStudent, getSchoolStyleRates, getSchoolStyles, getStudentPlanDetail, postStudentPlanEnrollment, savePlanPaymentAccount, saveStudentPlanStudent, updateStudentPlan } from 'api';
import Spinner from 'components/DataLoading/Spinner';
import CountryStateSelectField from 'components/Forms/ConnectedFields/CountryStateSelectField';
import DateField from 'components/Forms/DateField';
import EmailField from 'components/Forms/EmailField';
import ImageField from 'components/Forms/ImageField';
import InputBlock from 'components/Forms/InputBlock';
import SelectField from 'components/Forms/SelectField';
import SwitchField from 'components/Forms/SwitchField';
import TextField from 'components/Forms/TextField';
import ValidatedInput from 'components/Forms/ValidatedInput';
import Toast from 'components/Toast';
import moment from 'moment';
import React from 'react';
import { Spring } from 'react-spring/renderprops';
import { reduxForm } from 'redux-form';
import { schoolStyleClassesFetch } from 'src/redux/actionCreators/school/styleClasses';
import { schoolStyleRanksFetch } from 'src/redux/actionCreators/school/styleRanks';
import { schoolStylesFetch } from 'src/redux/actionCreators/school/styles';
import connect from 'src/redux/connect';
import countryIds from 'src/redux/data/countryIds';
import { base64StringToFields, imageToBase64String } from 'util/base64';
import { localCurrencySymbol } from 'util/localization/localValues';
import AddPaymentAccountForm from '../../Students/Plans/PlanDetail/Payment/PaymentAccount/AddPaymentAccountForm';
import './styles.less';


type AddSchoolStudentRapidFormProps = {
  schoolId: string,
  userId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolProfile: {
    payload: {
      CountryId: string,
    },
  },
  token: {
    payload: {
      UserId: string,
    },
  },
};


const initialValues =  {
  student: {
    User: {
      Profile: {
        GenderId: '8a29a4ab-62a7-4a06-b2fa-46a40f449a84'//male
      }
    }
  },
  plan: {
    planStartDate: moment().format('YYYY-MM-DDThh:mm:ss.SSSZ'),
    paymentStartDate: moment().add(1, 'week').format('YYYY-MM-DDThh:mm:ss.SSSZ'),
    renewalDate: moment().add(1, 'year').format('YYYY-MM-DDThh:mm:ss.SSSZ'),
    planEndDate: moment().add(1, 'year').format('YYYY-MM-DDThh:mm:ss.SSSZ'),
    totalPaymentAmount: "0",
    downPaymentAmount: "0",
    paymentFrequencyId: "86b72363-9989-4d45-9c58-b51c27ef26ac",//monthly
    numberOfPayments: "1",
    signupFee: "0",
    cancellationFee: "0"
  }
};

const validate = (values, initialValues) => {
  let countryId = initialValues.schoolProfile.payload.CountryId;
  const errors = {
    student: {
      User: {
        Profile: {},
      }
    },
    plan: {
    }
  };

  if (values && values.student && values.student.User) {
    if (values.student.User.Profile) {
      if (!values.student.User.Profile.FirstName) {
        errors.student.User.Profile.FirstName = 'Please enter a First Name.';
      }
      if (!values.student.User.Profile.LastName) {
        errors.student.User.Profile.LastName = 'Please enter a Last Name.';
      }
    }
  }
  if (!values.student.Address1) {
    errors.student.Address1 = 'Please enter a Street Address.';
  }
  if (!values.student.City) {
    errors.student.City = 'Please enter a City.';
  }
  if (!values.student.State) {
    errors.student.State = 'Please enter a State.';
  }

  // If the Country is Australia, then we need to validate for a minimum of 4 characters,
  // rather than checking for 5 characters.

  if (countryId === countryIds.Australia) {
    if (!values.student.Zip) {
      errors.student.Zip = 'Please enter the Post Code';
    } else if (values.student.Zip.length < 4) {
      errors.student.Zip = 'Invaid Post Code Format: Atleast 4 characters required.';
    }
  } else {
    if (!values.student.Zip) {
      errors.student.Zip = 'Please enter the Zip Code';
    } else if (values.student.Zip.length < 5) {
      errors.student.Zip = 'Invaid Zip Code Format: Atleast 5 characters required.';
    } else if (values.student.Zip.length > 10) {
      errors.student.Zip = 'Exceeded a Maximum limit of 10 characters.';
    }
  }

  if (!values.student.User) {
    values.student.User = { Profile: {} };
  }

  if (values && values.student && values.student.User) {
    if (!values.student.User.Email) {
      errors.student.User.Email = 'Please enter an Email Address.';
    }

    if (values.student.User.Profile) {
      if (!values.student.User.Profile.Dob) {
        errors.student.User.Profile.Dob = 'Please enter a Birth Date.';
      }
      if (!values.student.User.Profile.GenderId) {
        errors.student.User.Profile.GenderId = 'Please enter a Gender.';
      }
    }
  }

  return errors;
};

class AddSchoolStudentRapidForm extends React.Component {
  constructor(props: AddSchoolStudentRapidFormProps) {
    super(props);
    this.state = {
      countryId: null,
      addressCode: 'Zip*',
      isAutoRenewal: true,
      endDateLabel: 'Plan End Date*',
      paymentFrequencyTypes: [],
      numberOfPayments: 0,
      downPaymentAmount: 0,
      paymentAmountPreview: 0,
      isSaving: false,
      ranks: [],
      programs: [],
      rates: [],
      rateOptions: [],
      planValues: {}
    };
    this.prevRecurringFee = 0;
    this.registerSaveShortcut();

  }


  componentDidUpdate(prevProps) {
    this.prevRecurringFee = this.getRecurringPaymentAmount(prevProps);
  }

  registerSaveShortcut() {
    const { handleSubmit } = this.props;
    const handleSubmitPreprocess = this.handleSubmit.bind(this);
    document.onkeyup = (e) => {
      if (e.which == 13) {
        handleSubmit(handleSubmitPreprocess)();
      }
    };
  }


  getProgramData = () => {
    const schoolId = this.props.schoolId;
      getSchoolStyles(schoolId)
      .done( (payload) => {
        const firstProgram = payload[0];
        const firstProgramId = firstProgram.Id;
        this.setState({
          payload,
          programs: payload.filter(item => item.StyleRanks).map(item => ({label: item.Name, value: item.Id, styleRanks: item.StyleRanks })),
          selectedProgram: firstProgramId
        }, () => {
          if(payload.length && firstProgramId) {
            this.onProgramChange('', firstProgramId);
            this.getRatesData(firstProgramId);
          }
        });
      })
      .fail( (error) => {
        this.setState({
          error
        });
      })
  }

  onProgramChange = (e, styleId) => {
    const { programs } = this.state;
    const selectedProgram = programs.find(item => item.value == styleId);
    if(selectedProgram) {
      const styleRanks = selectedProgram.styleRanks || [];
      const firstRank = selectedProgram ? selectedProgram.styleRanks[0] : undefined;
      this.setState({
        selectedProgram: styleId,
        ranks: styleRanks.map(item => ({label: item.Name, value: item.Id })),
        selectedRank: firstRank ? firstRank.value : ''
      }, () => {
        this.getRatesData(styleId);
      })
    }
  }

  onRankChange = (e, rankId) => {
    this.setState({
      selectedRank: rankId
    });
  }


  onRateChange = (e, rateId) => {
    const rateData = this.state.rates.find(item => item.Id == rateId);
    console.log('RATE DATA', rateData);
    this.setState({
      planValues: {
        planStartDate: rateData.StartDate,
        paymentStartDate: rateData.StartDate,
        planEndDate: rateData.EndDate,
        totalPaymentAmount: rateData.TotalCost || 0,
        signUpFee: rateData.SignupCost,
        cancellationFee: rateData.CancellationCost
      }
    });
  }

  getPlanData() {
    const initData = {
      planStartDate: moment().format('YYYY-MM-DDThh:mm:ss'),
      paymentStartDate:moment().add(1, 'week').format('YYYY-MM-DDThh:mm:ss'),
      planEndDate:moment().add(1, 'year').format('YYYY-MM-DDThh:mm:ss'),
      totalPaymentAmount: 0,
      subsequentPaymentAmount: 0,
      numberOfPayments: 1,
      signUpFee: 0,
      cancellationFee: 0,
      downPaymentAmount: 0,
    };

    let formValues = {};

    if(this.props.formData && this.props.formData.values && this.props.formData.values.plan) {
      const { plan = {} } = this.props.formData.values;
      formValues = {...plan};
    }

    const { planValues } = this.state;
    const finalData = {...initData, ...formValues, ...planValues };
    return finalData;
  }



  getRatesData = (styleId) => {
    getSchoolStyleRates(styleId)
    .done((payload) => {
      const firstRate = payload ? payload[0] : {}
      const rates = [...payload];
      this.setState({
        rateOptions: payload.map(item => ({label: item.Name, value: item.Id })),
        rates,
        selectedRate: firstRate.Id
      })
    })
    .fail( (error) => {
      this.setState({
        error
      });
    })

  }

  renderError = () => {
    if(this.state.error) {
      <div>
        <p style={{background: 'orage'}}>{JSON.stringify(this.state.error)}</p>
      </div>
    }
    return null;
  }


  handleFrequencyPaymentTypeChange = value => {
    this.state.paymentFrequencyTypes.map((element, index) => {
      if (element.value === value) {
        this.setState({
          numberOfPayments: paymentFrequencyTypes[element.label],
          paymentAmountPreview:
            (this.props.planDetail.PlanTotal - this.state.downPaymentAmount) /
            paymentFrequencyTypes[element.label],
        });
      }
    });
  };

  componentDidMount() {
    let countryId = this.props.initialValues
      ? this.props.initialValues.CountryId
      : this.props.schoolProfile.payload.CountryId;

    // Checks whether the selected Country is Australia,
    // and if so changes the addressCode label as Post Code
    let addressCode =
      countryId === countryIds.Australia ? 'Post Code*' : 'Zip*';

    this.setState({
      countryId,
      addressCode,
    });

    this.getProgramData();
  }

  renderStudentDetails = () => (
      <div style={{flex: '1 1 0'}}>
        <InputBlock>
          <TextField
            label="First Name*"
            name="student.User.Profile.FirstName"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Last Name*"
            name="student.User.Profile.LastName"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <EmailField label="Email*" name="student.User.Email" required={true} />
        </InputBlock>
        <InputBlock>
          <DateField
            dob
            label="Date of Birth*"
            name="student.User.Profile.Dob"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Gender*"
            name="student.User.Profile.GenderId"
            required={true}
            referenceOptions="LstGenders"
          />
        </InputBlock>
        <InputBlock>
          <TextField label="Address Line 1*" name="student.Address1" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Address Line 2" name="student.Address2" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="City*" name="student.City" required={true} />
          <CountryStateSelectField
            label="State*"
            name="student.State"
            countryId={this.props.schoolProfile.payload.CountryId}
            required={true}
          />
        </InputBlock>
        <InputBlock>
            <TextField
              label={`${this.state.addressCode}`}
              name="student.Zip"
              required={true}
            />
            <TextField
              label="Phone Number"
              name="student.User.PhoneNumber"
              required={true}
            />
        </InputBlock>
        <InputBlock>
            <ImageField label="Profile Picture" name="student.PictureFile" required={true} />
        </InputBlock>
        <InputBlock />
    </div>
  )

  getRecurringPaymentAmount = (props) => {
    let recurringAmount = 0;
    const vData = this.getPlanData();
    console.log('VDATA', vData);

    const {totalPaymentAmount, downPaymentAmount, subsequentPaymentAmount, numberOfPayments = 1 } = vData;

    if(subsequentPaymentAmount) {
      return parseFloat(subsequentPaymentAmount);
    }

    if((parseFloat(totalPaymentAmount) - parseFloat(downPaymentAmount)) > 0) {
      return ((parseFloat(totalPaymentAmount) - parseFloat(downPaymentAmount))/numberOfPayments);
    }

    return recurringAmount;
  }

  renderProgramDetails = () => {
    const { schoolId, studentId } = this.props.match.params;
    const recurringAmount = this.getRecurringPaymentAmount(this.props) || 0;

    return (
      <div style={{flex: '1 1 0', width: '100%'}}>
        <div className='recurringPay'>
          <Spring
            from={{ value: this.prevRecurringFee }}
            to={{ value: recurringAmount }}>
            { props => {
              const amount = (props.value || 0).toFixed(2).split('.');
              return (
                <p className='value'>{`${localCurrencySymbol()}${amount[0]}`}<span style={{fontSize: '24px'}}>{`${amount[1] || '00'}`}</span></p>
              )
            }}
          </Spring>
          <p className='key'>Subscription Amount</p>
        </div>
        <InputBlock>
            <ImageField label="Attach Document" name="plan.PictureFile" />
        </InputBlock>
        <InputBlock>
          <SelectField
            name="plan.program.StyleId"
            label="Program"
            required={true}
            onChange={this.onProgramChange}
            options={this.state.programs}
          />
        </InputBlock>
        <InputBlock>
          {this.state.ranks.length && (
              <SelectField
                label="Rank"
                name="plan.program.RankId"
                required={true}
                options={this.state.ranks}
                onChange={this.onRankChange}
              />
            )}
        </InputBlock>
        <InputBlock>
          {this.state.rateOptions.length && (
            <SelectField
              label="Rate"
              name="plan.program.rateId"
              required={true}
              options={this.state.rateOptions}
              onChange={ this.onRateChange }
            />
          )}
        </InputBlock>

        <AddPaymentAccountForm planId={this.props.match.params.planId} />
      </div>
    )

  }


  componentWillUnmount() {
    document.onkeyup = null;
  }


  renderPlanDetails = () => {

    const vData = this.getPlanData();

    return (
      <div style={{flex: '1 1 0'}}>
        <InputBlock>
          <DateField
            label="Plan Start Date*"
            name="plan.planStartDate"
            textarea={false}
            required={true}
            disabled={false}
            value={vData.planStartDate}
          />
        </InputBlock>
        <InputBlock>
          <DateField
              label="Payment Start Date*"
              name="plan.paymentStartDate"
              textarea={false}
              required={true}
              disabled={false}
              value={vData.paymentStartDate}
            />
        </InputBlock>
        <InputBlock>
          <SwitchField
            name="plan.isAutoRenewal"
            label="Auto Renewal"
            checked={this.state.isAutoRenewal}
            onClick={() => {
              let isAutoRenewal = this.state.isAutoRenewal;
              this.setState({
                isAutoRenewal: !isAutoRenewal,
              });
            }}
          />
        </InputBlock>
        <InputBlock>
          <div>
            {this.state.isAutoRenewal ? (
              <DateField
                label="Renewal Date*"
                name="plan.renewalDate"
                required={true}
              />
            ) : (
              <DateField
                label={this.state.endDateLabel}
                name="plan.planEndDate"
                textarea={false}
                required={true}
                value={vData.planEndDate}
              />
            )}
          </div>
        </InputBlock>
        <InputBlock>
          <TextField
            input={{ min: 0, step: '.01' }}
            component={ValidatedInput}
            label="Total Payment Amount"
            name="plan.totalPaymentAmount"
            type="number"
            textarea={false}
            currency={localCurrencySymbol()}
            value={vData.totalPaymentAmount || 0}
            onChange={(event, value) =>
              this.handleTotalPaymentChange(value)
            }

          />
        </InputBlock>
        <InputBlock>
          <TextField
            input={{ min: 0, step: '1' }}
            component={ValidatedInput}
            label="Down Payment Amount"
            name="plan.downPaymentAmount"
            type="number"
            textarea={false}
            required={true}
            value={vData.downPaymentAmount || 0}
            currency={localCurrencySymbol()}
            onChange={(event, value) =>
              this.handleDownPaymentAmountChange(value)
            }
          />
        </InputBlock>
        <InputBlock>
          <TextField
            input={{ min: 0, step: '1' }}
            component={ValidatedInput}
            label="Subsequent Payment Amount"
            name="plan.subsequentPaymentAmount"
            type="number"
            textarea={false}
            required={true}
            value={vData.subsequentPaymentAmount || 0}
            currency={localCurrencySymbol()}
            onChange={(event, value) =>
              this.handleSubsequentPaymentAmountChange(value)
            }
          />
        </InputBlock>
        <InputBlock>
          <SelectField
              label="Payment Frequency"
              name="plan.paymentFrequencyId"
              placeholder="Select a Payment Frequency"
              referenceOptions="LstPaymentFrequencies"
              required={true}
              onChange={(event, value) => {
                this.handleFrequencyPaymentTypeChange(value);
              }}
            />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Number of Payments"
            name="plan.numberOfPayments"
            type="number"
            textarea={false}
            required={true}
            value={vData.numberOfPayments || 1}
            onChange={(event, value) => {
              this.handleNumberOfPaymentsChange(value);
            }}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            input={{ min: 0, step: '1' }}
            component={ValidatedInput}
            label="Signup Fee"
            name="plan.signupFee"
            type="number"
            textarea={false}
            required={true}
            value={vData.signUpFee}
            currency={localCurrencySymbol()}
            onChange={(event, value) => {
              this.handleSignupFeeChange(value);
            }}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            input={{ min: 0, step: '1' }}
            component={ValidatedInput}
            label="Cancellation Fee"
            name="plan.cancellationFee"
            type="number"
            textarea={false}
            required={true}
            value={vData.cancellationFee}
            currency={localCurrencySymbol()}
            onChange={(event, value) => {
              this.handleCancellationFeeChange(value);
            }}
          />
        </InputBlock>
      </div>
    )
  }



    handleFrequencyPaymentTypeChange = value => {
      this.state.paymentFrequencyTypes.map((element, index) => {
        if (element.value === value) {
          this.setState({
            numberOfPayments: paymentFrequencyTypes[element.label],
            paymentAmountPreview:
              (this.props.planDetail.PlanTotal - this.state.downPaymentAmount) /
              paymentFrequencyTypes[element.label],
          });
        }
      });
    };

    calculatePaymentAmount(planTotal, downPaymentAmount, numberOfPayments) {
      return (planTotal - downPaymentAmount) / numberOfPayments;
    }

    handleNumberOfPaymentsChange = value => {
      this.setState({
        planValues: {
          ...this.state.planValues,
          numberOfPayments: value,
        }
      });
    };

    handleDownPaymentAmountChange = value => {
      this.setState({
        planValues: {
          ...this.state.planValues,
          downPaymentAmount: value,
        }
      });
    };

    handleSubsequentPaymentAmountChange = value => {
      this.setState({
        planValues: {
          ...this.state.planValues,
          subsequentPaymentAmount: value,
        }
      });
    }

    handleTotalPaymentChange = value => {
      this.setState({
        planValues: {
          ...this.state.planValues,
          totalPaymentAmount: value,
        },
      })
    }

    handleSignupFeeChange = value => {
      this.setState({
        planValues: {
          ...this.state.planValues,
          signupFee: value,
        },
      })
    }

    handleCancellationFeeChange = value => {
      this.setState({
        planValues: {
          ...this.state.planValues,
          cancellationFee: value,
        },
      })
    }

  render() {

    const { isSaving } = this.state;
    
    return (
      <div className='rapidForm'>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} method="POST" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
          <div className='studentDetails row' style={{background: 'white'}}>
            { this.renderStudentDetails() }
          </div>
          <div className='programDetails row' style={{background: 'white'}}>
            { this.renderProgramDetails() }
          </div>
          <div className='planDetails row' style={{background: 'white'}}>
            { this.renderPlanDetails() }
          </div>
        </form>
        { this.renderError() }
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <button 
            disabled={isSaving} 
            className="pt-button pt-intent-primary pt-icon-floppy-disk" 
            style={{width: '40%', minWidth: '240px', margin: '12px'}} 
            intent="pt-intent-primary" 
            onClick={this.props.handleSubmit(this.handleSubmit)}
          >
           { isSaving ? 'Saving...' : 'Save'} 
          </button>
          <button 
            disabled={this.props.pristine || this.props.submitting || isSaving } 
            onClick={this.props.reset}
            className="pt-button pt-icon-eraser" 
          >
            Clear
          </button>
          { (isSaving || this.props.submitting) ? <Spinner size={true} /> : null }
        </div>
      </div>

    );
  }

  getStudentData = () => {
    const momentNow = moment();
    const today = momentNow.format('YYYY-MM-DD');
    const now = momentNow.format('YYYY-MM-DDTHH:mm:ss.SSS');

    const data = {...this.props.formData.values.student };
    data.User.Profile.UserTypeId = '5ebf5cca-df92-49c6-ae5f-f3c9670bf9d3';//Student
    data.User.Profile.CountryId = this.props.schoolProfile.payload.CountryId;
    data.UserCreatedOn = today;//'"2019-04-16",
    data.User.CreatedBy = this.props.userId;
    data.User.Claims = [
      {
        ClaimValue:"STUDENT"
      }
    ];
    data.User.UserName = data.User.Email;
    data.User.Password = "tempPass!!11";
    data.SchoolId = this.props.schoolId;
    data.UserId = this.props.userId;
    data.CreatedOn = now;
    data.CreatedBy = this.props.userId;
    data.CountryId = this.props.schoolProfile.payload.CountryId;
    data.StatusTypeId = "4b50ec65-c545-40fb-80a7-bf1f9b463524";//Unverified

    if (data.PictureFile) {
      imageToBase64String(data.PictureFile).then(base64ImageString => {
        const base64Fields = base64StringToFields(base64ImageString);

        data.User.Profile.PictureHeader = base64Fields.headerString;
        data.User.Profile.Picture = base64Fields.imageString;
        delete data.PictureFile;
      });
    }

    const planData = {...this.props.formData.values.plan }

    if (planData.PictureFile) {
      imageToBase64String(planData.PictureFile).then(base64ImageString => {
        const base64Fields = base64StringToFields(base64ImageString);

        data.fileName = planData.PictureFile.name;//BarCodePictureHeader
        data.fileData = base64Fields.imageString;//BarCodePicture
        delete planData.PictureFile;
      });
    } else {
      data.StatusTypeId = "3a3586a8-0e7c-4ecb-ac20-ae8e98a3ce76";//verified
    }
    return data;
  }

  handleSubmit = (d) => {
    this.setState({isSaving: true});

    const random = Math.floor(Math.random()*10000);
    const studentPayload = this.getStudentData();

    createStudent(studentPayload)
      .done((studentId) => {
        console.log('CREATED STUDENT ' + studentId);
        Toast.showSuccess(`Student ${studentPayload.User.UserName}  has been created.`);
        //enroll plan
        postStudentPlanEnrollment(this.props.schoolId)
          .done(planId => {
            Toast.showSuccess( `Plan has been created for ${studentPayload.User.UserName}`);

            //save plan
            console.log('CREATED PLAN ' + planId);
            const spsPayload = {
                PlanId: planId,
                CreatedBy: this.props.userId,
                StudentId: studentId
            };

            saveStudentPlanStudent(spsPayload)
              .done(planStudentId => {
                console.log('CREATED PLAN STUDENT ID ' + planStudentId);
                Toast.showSuccess('Plan is being updated with payment info...');

                getStudentPlanDetail(planId)
                  .done(planData => {
                    console.log('PLAN DATA ', planData);

                    const paymentData = {
                      ...this.props.formData.plan,
                      NumberOfPayment : 1,
                      RenewalIncreasePercent: null,
                      Id: planId,
                    };

                    const planPaymentAccountData = {
                      PaymentTypeId: '456c9dcc-4460-4ff9-9e11-d23750231788',//defaults to cash
                      ...this.props.planPaymentAccountForm.values,
                      planId,
                      CountryId: studentPayload.CountryId,
                      CurrencyTypeId: '3a2ea807-3ced-4fe9-9999-b415c9f3c0c3',//TODO
                      IsActive: true,
                      fileData: studentPayload.fileData,
                      fileName: studentPayload.fileName
                    };


                    Promise.all([updateStudentPlan({...planData, ...paymentData}), savePlanPaymentAccount(planPaymentAccountData) ])
                      .then(resp => {
                        console.log('PLAN UPDATED ' + resp[0]);
                        Toast.showSuccess('Plan is succesfully saved');
                        this.setState({isSaving: false});
                        console.log('PAYMENT ACCOUNT SAVED ' + resp[1]);
                        Toast.showSuccess('Payment account is succesfully saved');
                        this.props.history.push(`/app/school-app/${this.props.schoolId}/students/detail/${studentId}/summary`)
                      })
                      .finally(() => {
                          this.setState({isSaving: false});
                          Toast.showSuccess('Student form is saved.');
                      });
                  })
              })
            })
      })
      .fail((error) => {
        this.setState({
          error, isSaving: false
        },
        () => Toast.showError('Unable to save form: ' + error.Message))
      });
  }

}


const mapStateToProps = state => {
  return {
    token: state.token,
    references: state.utility.references,
    styles: state.school.styles,
    classes: state.school.classes,
    formData: state.form.rapidStudentEntry,
    references: state.utility.references,
    planPaymentAccountForm: state.form['add-account-owner'],
    initialValues,
    schoolProfile: state.school.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSchoolStyles: schoolId => {
      dispatch(schoolStylesFetch(schoolId));
    },
    getSchoolStyleRanks: styleId => {
      dispatch(schoolStyleRanksFetch(styleId));
    },
    getSchoolStyleClasses: styleId => {
      dispatch(schoolStyleClassesFetch(styleId));
    },
  };
};

const initializedForms = reduxForm({
  form: 'rapidStudentEntry',
  validate,
})(AddSchoolStudentRapidForm);


export default connect(
  initializedForms,
  mapStateToProps,
  mapDispatchToProps
);


