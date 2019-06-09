import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import moment from 'moment';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SwitchField from 'components/Forms/SwitchField';
import SelectField from 'components/Forms/SelectField';
import PrivateComponent from 'components/Auth/PrivateComponent';
import { roles, authorizeRole } from 'util/auth/roles';
import { log } from 'log';
import './styles.less';

type AddStudentNoteFormProps = {
  studentId: string,
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
  parentNoteId: string,
  initialValues: {
    ParentId: string,
  },
};

const validate = values => {
  const errors = {};
  if (!values.NoteTypeId) {
    errors.NoteTypeId = 'Please select a Note Type.';
  }
  if (!values.Title) {
    errors.Title = 'Please enter a Title.';
  }
  if (!values.Detail) {
    errors.Detail = 'Please enter a Description.';
  }
  return errors;
};

class AddStudentNoteForm extends React.Component {
  props: AddStudentNoteFormProps;
  constructor() {
    super();
  }
  onSubmit = formData => {
    formData['StudentId'] = this.props.studentId;
    formData.Title = `${this.props.studentId} -- ${moment().format(
      'MMMM Do, YYYY - h:mm a'
    )}`;

    formData.StudentFlag = false; // StudentFlag is unused.

    if (!formData.SchoolFlag) {
      formData.SchoolFlag = false;
    }

    if (!formData.EFCFlag) {
      formData.EFCFlag = false;
    }

    const efcStaffRole = authorizeRole(
      this.props.token.payload.Role,
      roles.SUBSET_EFC_STAFF
    );

    // Always add School Flag for notes created by EFC Staff.
    if (efcStaffRole) {
      formData.SchoolFlag = true;
    }

    formData.ParentId =
      this.props.initialValues && this.props.initialValues.ParentId;

    // NoteTypeId: Internal = EFC users, Restricted = EFC & School users, Public = EFC & School & Student users.
    // Currently all notes have "Restricted" behavior (viewable by EFC & School Users)
    // Future note: If adding a field for notetype, use a radio button with clear description of each type.
    // Internal = 1b75cba3-ae36-4fd9-810e-72b27f9b46e2; Restricted = 7770a67a-d3fc-4822-aad0-2d5c8a7fa43b; Public = dc58e268-8434-4851-af40-ab1a976a64f9;

    formData.NoteTypeId = '7770a67a-d3fc-4822-aad0-2d5c8a7fa43b';
    formData.CreatedBy = this.props.token.payload.UserId;

    log('AddStudentNoteForm onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form
        className="AddStudentNoteForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <InputBlock>
          <TextField
            label="Note*"
            name="Detail"
            textarea={true}
            required={true}
          />
        </InputBlock>
        <PrivateComponent allow={roles.SUBSET_SCHOOL_STAFF}>
          <strong>Flag for EFC</strong>
          <SwitchField title="Flag for EFC Staff" name="EFCFlag" />
        </PrivateComponent>
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

const connectedAddStudentNoteForm = connect(
  AddStudentNoteForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-student-note', // a unique identifier for this form
  validate,
})(connectedAddStudentNoteForm);
