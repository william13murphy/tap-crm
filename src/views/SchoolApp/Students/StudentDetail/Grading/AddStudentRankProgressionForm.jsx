import React from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import connect from 'src/redux/connect';
import moment from 'moment';
import { Position } from '@blueprintjs/core';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import ProgramSelectField from 'components/Forms/ConnectedFields/ProgramSelectField';
import ProgramRankSelectField from 'components/Forms/ConnectedFields/ProgramRankSelectField';
import DateField from 'components/Forms/DateField';

import { schoolStyleRanksFetch } from 'src/redux/actionCreators/school/styleRanks';
import { log } from 'log';

type AddStudentRankProgressionFormProps = {
  studentId: string,
  schoolStyleId: string,
  references: {},
  dispatchFormPost: any,
  dispatchSchoolStyleRanksFetch: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  token: {
    payload: {
      UserId: string,
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.EnrollmentDate) {
    errors.EnrollmentDate = 'Please select an Enrollment date.';
  }
  return errors;
};

class AddStudentRankProgressionForm extends React.Component {
  props: AddStudentRankProgressionFormProps;
  onSubmit = formData => {
    formData['StudentId'] = this.props.studentId;
    formData['CreatedBy'] = this.props.token.payload.UserId;
    formData.EnrollmentDate = moment
      .utc(formData.EnrollmentDate)
      .startOf('day')
      .format();

    log('AddStudentRankProgressionForm onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <ProgramRankSelectField label="Rank*" name="StyleRankId" />
        </InputBlock>
        <InputBlock>
          <DateField
            label="Enrollment Date*"
            name="EnrollmentDate"
            required={true}
            position={Position.RIGHT}
          />
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
  };
};

const connectedAddStudentRankProgressionForm = connect(
  AddStudentRankProgressionForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-student-rank-progression', // a unique identifier for this form
  validate,
})(connectedAddStudentRankProgressionForm);
