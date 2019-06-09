import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import connect from 'src/redux/connect';

import SelectMockInput from 'components/Forms/SelectMockInput';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';

import StudentAttendanceModel from './Model';

type StudentAttendanceFormProps = {
  references: {},
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
  studentId: string,
  classScheduleId: string,
};

const validate = values => {
  const errors = {};

  return errors;
};

class StudentAttendanceForm extends React.Component {
  props: StudentAttendanceFormProps;
  onSubmit = formData => {
    formData.ClassScheduleId = this.props.classScheduleId;
    formData.CheckInTimeUtc = moment.utc().format('HH:mm');
    formData.CreatedBy = this.props.token.payload.UserId;
    this.props.dispatchFormPost(formData);
  };
  render() {
    const ConnectedStudentAttendanceSelect = StudentAttendanceModel(
      SelectField
    );
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <div className="FormButtonsContainer">
          <ConnectedStudentAttendanceSelect />
          <SubmitButton intent="pt-intent-primary">Attend</SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

const connectedStudentAttendanceForm = connect(
  StudentAttendanceForm,
  mapStateToProps
);

export default reduxForm({
  form: 'student-class-checkin-form', // a unique identifier for this form
  validate,
})(connectedStudentAttendanceForm);
