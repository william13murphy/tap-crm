import React from 'react';
import { reduxForm, FieldArray } from 'redux-form';
import connect from 'src/redux/connect';
import moment from 'moment';
import { Field } from 'redux-form';
import AppointmentTimeInput from 'components/Forms/AppointmentTimeInput';
// import AppointmentTimeField from 'components/Forms/AppointmentTimeField';
// import TimePicker from 'react-time-picker';

import {
  getTimeZoneLabel,
  getMomentUTCDateTime,
  calculateUTCDateTimeFromLocalDateAndTime,
} from 'src/util/localization/timezone';

import { validate } from './validate';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import DateField from 'components/Forms/DateField';
import TimeField from 'components/Forms/TimeField';
import AppointmentTimeField from 'components/Forms/AppointmentTimeField';
import SubmitButton from 'components/Forms/SubmitButton';
import ReadOnlyMessage from 'components/DataLoading/ReadOnlyMessage';
import MemberList from './MemberList';
import AdditionalMembers from './AdditionalMembers';

import { log } from 'log';
import './styles.less';

type AppointmentFormProps = {
  id: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: string,
  userId: string,
  timeZone: string,
  location: Object,
  // initialValues: any,
  initialValues: {
    StartDate: Date,
    StartTimeUtc: Date,
    EndTimeUtc: Date,
  },
  match: { params: { schoolId: string } },
  appContext: { schoolId: string },
};

class AppointmentForm extends React.Component {
  props: AppointmentFormProps;

  constructor(props: AppointmentFormProps) {
    super(props);
    this.state = {
      timeZoneTypes: null,
      timeZone: '',
      addNewMembers: [],
      timeValue: '',
    };
  }

  componentWillMount() {
    this.setSchoolTimeZone();
  }

  setSchoolTimeZone() {
    let schoolTimeZone = getTimeZoneLabel(
      this.props.references,
      this.props.schoolProfile.payload.TimeZoneId
    );

    this.setState({
      schoolTimeZone,
    });
  }

  formDataCombineAppointmentMembers(formData) {
    let Staffs = [],
      Students = [];

    formData.Staffs =
      formData.Staffs &&
      formData.Staffs.filter(item => typeof item === 'string');

    formData.Students =
      formData.Students &&
      formData.Students.filter(item => typeof item === 'string');

    if (formData.Staffs) {
      Staffs = formData.Staffs.map(item => {
        return {
          UserId: item,
        };
      });
    }

    if (formData.Students) {
      Students =
        formData.Students &&
        formData.Students.map(item => {
          return {
            UserId: item,
          };
        });
    }

    formData.AppointmentMembers = Staffs.concat(Students);
    delete formData.Staffs;
    delete formData.Students;

    return formData;
  }

  formDataCombineAdditionalMembers(formData) {
    let LeadStatusId = '9343c118-35e7-4010-a08c-a37568ff060d';
    let SchoolMarketingId = 'f6cbd393-eb7d-4140-ad8f-079fd7df1be5';

    let newLeadData;

    newLeadData =
      formData.AdditionalMembers &&
      formData.AdditionalMembers.map(element => {
        element['LeadStatusId'] = LeadStatusId;
        element['SchoolMarketingId'] = SchoolMarketingId;
        return element;
      });

    formData['newLeadData'] = newLeadData || ' ';

    return formData;
  }

  formDataFormatDateTime(formData) {
    let startDateTimeUtc = calculateUTCDateTimeFromLocalDateAndTime(
      this.state.schoolTimeZone,
      moment(formData.StartDate).format('YYYY-MM-DD'),
      moment(formData.StartTimeUtc).format('HH:mm:ss')
    );

    // Split the date & time:
    let StartTimeUtc = startDateTimeUtc.format('HH:mm:ss');
    let StartDate = startDateTimeUtc.format('YYYY-MM-DDTHH:mm:ss');

    let endDateTimeUtc = calculateUTCDateTimeFromLocalDateAndTime(
      this.state.schoolTimeZone,
      moment(formData.StartDate).format('YYYY-MM-DD'),
      moment(formData.EndTimeUtc).format('HH:mm:ss')
    );

    // Split the date & time:
    let EndTimeUtc = endDateTimeUtc.format('HH:mm:ss');
    let EndDate = endDateTimeUtc.format('YYYY-MM-DDTHH:mm:ss');

    return Object.assign({}, formData, {
      StartDate,
      StartTimeUtc,
      EndDate,
      EndTimeUtc,
    });
  }

  onSubmit = formData => {
    formData.UserId = this.props.userId;

    formData = this.formDataFormatDateTime(formData);
    formData = this.formDataCombineAppointmentMembers(formData);

    formData = this.formDataCombineAdditionalMembers(formData);

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };

  onTimeChange = value => {
    this.setState({
      timeValue: value,
    });
  };

  render() {
    let currentDate = moment().format();

    console.log('THIS IS THE START TIME UTC:', this.props.initialValues);

    return (
      <div>
        {this.props.initialValues.StartTimeUtc < currentDate ? (
          <ReadOnlyMessage errorMessage="This Form is Read Only because the Appointment has ended." />
        ) : (
          ''
        )}
        <fieldset
          disabled={this.props.initialValues.StartTimeUtc < currentDate}
        >
          <form
            className="AppointmentForm"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            method="POST"
          >
            <InputBlock>
              <TextField
                label="Title*"
                name="Title"
                id="Dashboard.AddNewAppointment.Name"
                placeholder="Enter the title"
                required={true}
                help={true}
              />
              <SelectField
                label="Type*"
                name="AppointmentTypeId"
                placeholder=" "
                required={true}
                referenceOptions="LstAppointmentTypes"
                disabled={this.props.initialValues.StartTimeUtc < currentDate}
              />
            </InputBlock>
            <fieldset className="List__field1">
              <FieldArray
                name="AdditionalMembers"
                component={props => {
                  return <AdditionalMembers {...props} title={'Add Members'} />;
                }}
              />
            </fieldset>
            <InputBlock>
              <TextField
                label="Description*"
                name="Description"
                id="Dashboard.AddNewAppointment.Description"
                placeholder="Add a Description"
                required={true}
                // textarea={true}
                help={true}
              />
            </InputBlock>
            <InputBlock />
            <hr />

            <h3 className="AppointmentForm__header">Appointment Schedule</h3>

            <InputBlock>
              <DateField
                future
                label="Date*"
                name="StartDate"
                id="Dashboard.AddNewAppointment.StartDate"
                placeholder="Select Date"
                help={true}
              />
            </InputBlock>

            <InputBlock>
              {/* <Field name="dob" component={AppointmentTimeInput} /> */}
              {/* <AppointmentTimeField
                label="Time Start*"
                id="Dashboard.AddNewAppointment.StartTimeUtc"
                name="StartTimeUtc"
                help={true}
                disabled={this.props.initialValues.StartTimeUtc < currentDate}
              /> */}
              <TimeField
                label="Time Start*"
                id="Dashboard.AddNewAppointment.StartTimeUtc"
                name="StartTimeUtc"
                help={true}
                disabled={this.props.initialValues.StartTimeUtc < currentDate}
              />

              <TimeField
                label="Time End*"
                id="Dashboard.AddNewAppointment.EndTimeUtc"
                name="EndTimeUtc"
                help={true}
                disabled={this.props.initialValues.StartTimeUtc < currentDate}
              />
            </InputBlock>
            <hr />

            <h3 className="AppointmentForm__header">Select Members</h3>

            <InputBlock columns={2} className="List__container">
              <fieldset className="List__field1">
                <FieldArray
                  name="Staffs"
                  component={props => {
                    return (
                      <MemberList
                        {...props}
                        schoolId={
                          this.props.match.params.schoolId ||
                          this.props.appContext.schoolId
                        }
                        title={'Add Staff'}
                        member={'Staff'}
                      />
                    );
                  }}
                />
              </fieldset>
              <fieldset className="List__field2">
                <FieldArray
                  name="Students"
                  component={props => {
                    return (
                      <MemberList
                        {...props}
                        schoolId={
                          this.props.match.params.schoolId ||
                          this.props.appContext.schoolId
                        }
                        title={'Add Student'}
                        member={'Student'}
                      />
                    );
                  }}
                />
              </fieldset>
            </InputBlock>

            <hr />
            <div className="FormButtonsContainer">
              <SubmitButton intent="pt-intent-primary">
                {`${
                  this.props.update ? 'Save Details' : 'Create Appointment'
                } `}
              </SubmitButton>
            </div>
          </form>
        </fieldset>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    appContext: state.appContext,
    userId: state.token.payload.UserId,
    schoolDetail: state.school.detail,
    schoolProfile: state.school.profile,
    references: state.utility.references,
  };
};

const AppointmentFormConnected = connect(
  AppointmentForm,
  mapStateToProps
);

export default reduxForm({
  form: 'appointment-form', // a unique identifier for this form
  validate,
})(AppointmentFormConnected);
