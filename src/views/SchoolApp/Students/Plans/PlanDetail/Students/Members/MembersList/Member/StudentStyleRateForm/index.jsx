import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import NoDataMessage from 'components/DataLoading/NoDataMessage';
import SchoolStylesSelectField from 'components/Forms/ConnectedFields/SchoolStylesSelectField';

import SchoolStyleRatesContainer from 'containers/School/SchoolStyleRatesContainer';
import SchoolStyleRateAdditionalClassesManyContainer from 'containers/School/SchoolStyleRateAdditionalClassesManyContainer';
import StyleRateFieldsTable from './StyleRateFieldsTable';

type StudentStyleRateFormProps = {
  studentId: string,
  studentPackageId: string,
  studentPackageMemberId: string,
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  token: {
    payload: {
      UserId: string,
    },
  },
  schoolId: string,
};

const validate = values => {
  return {};
};

class StudentStyleRateForm extends React.Component {
  props: StudentStyleRateFormProps;
  onSubmit = formData => {
    formData.SchoolId = this.props.schoolId;
    formData.StudentId = this.props.studentId;
    formData.StudentPlanId = this.props.studentPlanId;
    formData.CreatedBy = this.props.token.payload.UserId;
    formData.PlanStudentId = this.props.studentPlanStudentId;

    if (!formData.ContractEndDate) {
      formData.ContractEndDate = '3000-01-01T00:00:00Z';
    }
    // Extended Fields Mapping:
    const styleRate = this.state.selectedStyleRate;
    // If PunchCard:
    if (
      this.state.selectedStyleRate.EnrollmentTypeId ===
      'f5fcc6fb-3e23-4e08-b227-e85978b93553'
    ) {
      // Punch card uses TotalCost for StyleRateExtendedPrice:
      if (!formData.StyleRateExtendedPrice) {
        formData.StyleRateExtendedPrice = styleRate.AnnualCost;
      }
      // Punch card has no CancellationCost:
      formData.StyleRateCancellationExtendedPrice = 0;
      // Punch card has no SignupCost:
      formData.StyleRateSignupExtendedPrice = 0;
      // Else if Subscription:
    } else {
      // Subscription uses AnnualCost for StyleRateExtendedPrice:
      if (!formData.StyleRateExtendedPrice) {
        formData.StyleRateExtendedPrice = styleRate.AnnualCost;
      }
      if (!formData.StyleRateCancellationExtendedPrice) {
        formData.StyleRateCancellationExtendedPrice =
          styleRate.CancellationCost;
      }
      if (!formData.StyleRateSignupExtendedPrice) {
        formData.StyleRateSignupExtendedPrice = styleRate.SignupCost;
      }
    }

    // Add extended class price based on selected Additional Class Id:
    if (formData.StyleRateAdditionalClassId) {
      const additionalClasses = this.props.styleRateAdditionalClassesMany
        .payload[this.state.selectedStyleRate.Id];
      const additionalClass = additionalClasses
        .filter((cV, i) => {
          if (cV.Id === formData.StyleRateAdditionalClassId) {
            return true;
          }
        })
        .filter(n => n)[0];
      formData.StyleRateAdditionalClassExtendedPrice =
        additionalClass.ClassesCost;
    }

    this.props.dispatchFormPost(formData);
  };
  handleStyleRateChange = (e, styleRateId) => {
    if (styleRateId) {
      const selectedStyleRate = this.props.styleRates.payload.filter(cV => {
        if (cV.Id === styleRateId) {
          return true;
        }
      })[0];
      this.setState({
        selectedStyleRate,
      });
    }
  };
  handleProgramChange = (e, programId) => {
    if (programId) {
      const selectedProgram = this.props.styles.payload.filter(cV => {
        if (cV.Id === programId) {
          return true;
        }
      })[0];
      this.setState({
        selectedProgram,
      });
      // Set state for style's ranks to be used in the starting rank dropdown
      if (selectedProgram.StyleRanks) {
        let selectedProgramRanks = selectedProgram.StyleRanks.map(rank => {
          return {
            label: rank.Name,
            value: rank.Id,
          };
        });
        this.setState({
          selectedProgramRanks,
        });
      }
    } else {
      this.setState({
        selectedProgram: null,
      });
    }
  };
  render() {
    const activeRates =
      this.props.styleRates &&
      this.props.styleRates.payload &&
      this.props.styleRates.payload
        .filter(
          item => item.StatusId !== '003d6fc3-0d38-409d-9285-861dba207d9e'
        )
        .map(cV => {
          return {
            label: cV.Name,
            value: cV.Id,
          };
        });
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
        className="StudentStyleRateForm"
      >
        <InputBlock>
          <SchoolStylesSelectField
            name="SchoolStyleId"
            label="Program*"
            required={true}
            onChange={this.handleProgramChange}
          />
        </InputBlock>
        <InputBlock>
          {this.state &&
            this.state.selectedProgramRanks && (
              <SelectField
                label="Initial Rank*"
                name="InitialStyleRankId"
                required={true}
                options={this.state.selectedProgramRanks}
              />
            )}
        </InputBlock>
        <InputBlock>
          {this.state &&
            this.state.selectedProgram && (
              <SchoolStyleRatesContainer
                dispatchFetchParams={this.state.selectedProgram.Id}
              >
                <div className="StyleRatesFields">
                  {activeRates && activeRates.length > 0 ? (
                    <SelectField
                      label="Rate*"
                      name="StyleRateId"
                      required={true}
                      onChange={this.handleStyleRateChange}
                      options={activeRates}
                    />
                  ) : (
                    <NoDataMessage errorMessage="No Active Rates Found" />
                  )}
                  {this.state.selectedStyleRate && (
                    <div className="StyleRateDependentFields">
                      {this.state.selectedStyleRate &&
                      this.state.selectedStyleRate.EnrollmentTypeId ===
                        'f5fcc6fb-3e23-4e08-b227-e85978b93553' && ( // PunchCard
                          <StyleRateFieldsTable
                            type="PunchCard"
                            styleRate={this.state.selectedStyleRate}
                          />
                        )}
                      {this.state.selectedStyleRate &&
                      this.state.selectedStyleRate.EnrollmentTypeId ===
                        '98aa6452-1ff2-4c4d-ad7b-c184cd96f8d2' && ( // Subscription
                          <div>
                            <StyleRateFieldsTable
                              type="Subscription"
                              styleRate={this.state.selectedStyleRate}
                            />
                            <SchoolStyleRateAdditionalClassesManyContainer
                              dispatchFetchParams={{
                                styleRateId: this.state.selectedStyleRate.Id,
                              }}
                            >
                              {this.props.styleRateAdditionalClassesMany
                                .payload &&
                                this.props.styleRateAdditionalClassesMany
                                  .payload[this.state.selectedStyleRate.Id] &&
                                this.props.styleRateAdditionalClassesMany
                                  .payload[this.state.selectedStyleRate.Id]
                                  .length > 0 && (
                                  <SelectField
                                    label="Additional Classes"
                                    name="StyleRateAdditionalClassId"
                                    required={true}
                                    options={this.props.styleRateAdditionalClassesMany.payload[
                                      this.state.selectedStyleRate.Id
                                    ].map((cV, i) => {
                                      return {
                                        label: cV.Name,
                                        value: cV.Id,
                                      };
                                    })}
                                  />
                                )}
                            </SchoolStyleRateAdditionalClassesManyContainer>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </SchoolStyleRatesContainer>
            )}
        </InputBlock>

        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    styles: state.school.styles,
    styleRates: state.school.styleRates,
    styleRateAdditionalClassesMany: state.school.styleRateAdditionalClassesMany,
  };
};

const connectedStudentStyleRateForm = connect(
  StudentStyleRateForm,
  mapStateToProps
);

export default reduxForm({
  form: 'student-style-rate-form', // a unique identifier for this form
  validate,
})(connectedStudentStyleRateForm);
