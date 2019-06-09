import React from 'react';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import {
  getTimeZoneLabel,
  calculateUTCDateTimeFromLocalDateAndTime,
} from 'src/util/localization/timezone';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import DateField from 'components/Forms/DateField';
import TimeField from 'components/Forms/TimeField';
import ProgramSelectField from 'components/Forms/ConnectedFields/ProgramSelectField';
import InstructorSelectField from 'components/Forms/ConnectedFields/InstructorSelectField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import ReadOnlyMessage from 'components/DataLoading/ReadOnlyMessage';
import { log } from 'log';

type EditClassFormProps = {
  id: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: string,
  timeZone: string,
  history: {
    push: any,
  },
  initialValues: any,
};

const validate = (values, initialValues) => {
  let iV = initialValues.initialValues;
  const errors = {};

  if (!values.Name) {
    errors.Name = 'Please enter a Name.';
  }

  if (!values.Program) {
    errors.Program = 'Please select a Program.';
  }

  if (!values.Instructor) {
    errors.Instructor = 'Please select an Instructor.';
  }

  if (!values.MaximumStudents) {
    errors.MaximumStudents = 'Please enter Maximum Students.';
  }

  if (iV.StartDate) {
    if (!values.StartDate) {
      errors.StartDate = 'Please select a Start Date.';
    }
  }

  if (values.EndDate) {
    if (!moment(values.EndDate).isSameOrAfter(values.StartDate)) {
      errors.EndDate = 'End Date can not be less than Start Date';
    }
  }

  let currentDate = moment().startOf('day');
  let currentTimeStamp = moment().valueOf();
  let startDate = moment(values.StartDate).startOf('day');
  let startTime = moment(values.StartTimeUtc).valueOf();
  let startTimeOnly = moment(values.StartTimeUtc).format('HH:mm:ss');
  let endTime = moment(values.EndTimeUtc).format('HH:mm:ss');

  if (!values.StartTimeUtc) {
    errors.StartTimeUtc = 'Please select a Start Time';
  } else if (startTime <= currentTimeStamp && startDate.isSame(currentDate)) {
    errors.StartTimeUtc =
      'Start Time can not be less than or equal to current time';
  }

  if (!values.EndTimeUtc) {
    errors.EndTimeUtc = 'Please enter an End Time.';
  } else if (endTime < startTimeOnly) {
    errors.EndTimeUtc = 'End Time can not be less than or equal to Start time';
  }

  return errors;
};

/*Timepicker accepts moment object, DB expects 'xx:xx:xx' - string
- Changed time field names to a different name than the DB uses and
  altered the value in onSubmit()
- The value from the DB is assigned to the new field name in componentWillMount()
*/

class EditClassForm extends React.Component {
  props: EditClassFormProps;

  componentWillMount() {
    this.setSchoolTimeZone();
  }

  componentDidMount() {
    this.props.initialize({
      Name: this.props.initialValues && this.props.initialValues.Name,
      Description:
        this.props.initialValues && this.props.initialValues.Description,
      Instructor:
        this.props.initialValues && this.props.initialValues.Instructor,
      SchoolStyleId:
        this.props.initialValues && this.props.initialValues.SchoolStyleId,
      MaximumStudents:
        this.props.initialValues && this.props.initialValues.MaximumStudents,
      StartDate: this.props.initialValues && this.props.initialValues.StartDate,
      EndDate: this.props.initialValues && this.props.initialValues.EndDate,
      StartTime:
        this.props.initialValues && this.props.initialValues.StartTimeUtc,
      EndTime: this.props.initialValues && this.props.initialValues.EndTimeUtc,
      Id: this.props.initialValues && this.props.initialValues.Id,
      SchoolId: this.props.initialValues && this.props.initialValues.SchoolId,
      FrequencyTypeId:
        this.props.initialValues && this.props.initialValues.FrequencyTypeId,
    });
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

  onSubmit = formData => {
    /** Frequency set to Weekly */
    formData.FrequencyTypeId = 'c50a57d8-2146-4a55-87f3-52f71a845ab9';
    formData.MaximumStudents = parseInt(formData.MaximumStudents);
    formData.SchoolId = this.props.schoolId;

    let startUtcDateAndTime = calculateUTCDateTimeFromLocalDateAndTime(
      this.state.schoolTimeZone,
      moment(formData.StartDate).format('YYYY-MM-DD'),
      moment(formData.StartTime).format('HH:mm:ss')
    );
    formData.StartTimeUtc = startUtcDateAndTime.format('HH:mm:ss');

    let endDate = '9999-12-31T00:00:00';
    if (formData.EndDate) endDate = formData.EndDate;

    let endUtcDateAndTime = calculateUTCDateTimeFromLocalDateAndTime(
      this.state.schoolTimeZone,
      moment(formData.StartDate).format('YYYY-MM-DD'),
      moment(formData.EndTime).format('HH:mm:ss')
    );

    formData.EndTimeUtc = endUtcDateAndTime.format('HH:mm:ss');
    formData.EndDate = endDate;
    delete formData.Schedules;
    delete formData.Ranks;

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };

  render() {
    let currentDate = moment().format();

    return (
      <div>
        {this.props.initialValues &&
        this.props.initialValues.EndDate < currentDate ? (
          <ReadOnlyMessage errorMessage="This Form is Read Only because the Class has ended." />
        ) : (
          ''
        )}
        <fieldset
          disabled={
            this.props.initialValues
              ? this.props.initialValues.EndDate < currentDate
              : false
          }
        >
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
            <InputBlock>
              <TextField
                label="Class Name*"
                name="Name"
                id="School.Classes.EditClass.Name"
                required={true}
                help={true}
              />
            </InputBlock>

            <InputBlock>
              <TextField
                label="Description"
                name="Description"
                id="School.Classes.EditClass.Description"
                required={true}
                textarea={true}
                help={true}
              />
            </InputBlock>

            <InputBlock>
              <InstructorSelectField
                label="Instructor*"
                name="Instructor"
                id="School.Classes.EditClass.Instructor"
                required={true}
                help={true}
                disabled={
                  this.props.initialValues
                    ? this.props.initialValues.EndDate < currentDate
                    : false
                }
              />
            </InputBlock>
            <InputBlock>
              <ProgramSelectField
                label="Program*"
                name="SchoolStyleId"
                id="School.Classes.EditClass.Program"
                required={true}
                help={true}
                disabled={
                  this.props.initialValues
                    ? this.props.initialValues.EndDate < currentDate
                    : false
                }
              />
            </InputBlock>
            <InputBlock>
              <TextField
                label="Max Students*"
                name="MaximumStudents"
                id="School.Classes.EditClass.MaxStudents"
                type="number"
                input={{ min: 0 }}
                required={true}
                help={true}
              />
            </InputBlock>

            <hr />

            <h3>Class Schedule</h3>
            <InputBlock>
              {this.props.initialValues &&
              this.props.initialValues.HasStudents == true ? (
                <DateField
                  label="Start Date*"
                  name="StartDate"
                  id="School.Classes.EditClass.StartDate"
                  help={true}
                  disabled
                />
              ) : (
                <DateField
                  label="Start Date*"
                  name="StartDate"
                  id="School.Classes.EditClass.StartDate"
                  help={true}
                  disabled={
                    this.props.initialValues
                      ? this.props.initialValues.StartDate < currentDate
                      : false
                  }
                />
              )}
              <DateField
                label="End Date*"
                name="EndDate"
                id="School.Classes.EditClass.EndDate"
                help={true}
              />
            </InputBlock>
            <hr />
            <InputBlock>
              {this.props.initialValues &&
              this.props.initialValues.HasStudents == true ? (
                <TimeField
                  label="Time Start*"
                  id="School.Classes.EditClass.StartTimeUtc"
                  name="StartTime"
                  help={true}
                  disabled
                />
              ) : (
                <TimeField
                  label="Time Start*"
                  id="School.Classes.EditClass.StartTimeUtc"
                  name="StartTime"
                  help={true}
                  disabled={
                    this.props.initialValues
                      ? this.props.initialValues.EndDate < currentDate
                      : false
                  }
                />
              )}

              {this.props.initialValues &&
              this.props.initialValues.HasStudents == true ? (
                <TimeField
                  label="Time End*"
                  id="School.Classes.EditClass.EndTimeUtc"
                  name="EndTime"
                  help={true}
                  disabled
                />
              ) : (
                <TimeField
                  label="Time End*"
                  id="School.Classes.EditClass.EndTimeUtc"
                  name="EndTime"
                  help={true}
                  disabled={
                    this.props.initialValues
                      ? this.props.initialValues.EndDate < currentDate
                      : false
                  }
                />
              )}
            </InputBlock>
            <hr />

            <div className="FormButtonsContainer">
              <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
            </div>
          </form>
        </fieldset>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    references: state.utility.references,
    schoolProfile: state.school.profile,
  };
}

const ConnectedEditClassForm = connect(
  EditClassForm,
  mapStateToProps
);

export default reduxForm({
  form: 'edit-school-class', // a unique identifier for this form
  validate,
})(ConnectedEditClassForm);
