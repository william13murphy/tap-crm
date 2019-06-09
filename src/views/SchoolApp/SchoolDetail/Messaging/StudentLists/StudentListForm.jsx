import React from 'react';
import { reduxForm, FieldArray } from 'redux-form';
import connect from 'src/redux/connect';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';

import SchoolUtilityStudentsContainer from 'containers/School/SchoolUtilityStudentsContainer';
import AddStudentsToListDataGrid from './AddStudentsToListDataGrid';
import { log } from 'log';
import './styles.less';

type StudentListFormProps = {
  studentId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  posId: string,
  schoolUtilityStudents: Array<{}>,
};

const validate = values => {
  const errors = {};
  if (!values.Name) {
    errors.Name = 'Please enter a Name.';
  }
  if (!values.Description) {
    errors.Description = 'Please enter a Description.';
  }

  if (!values.Students) {
    errors.Students = 'Student must be selected';
  }
  return errors;
};

class StudentListForm extends React.Component {
  props: StudentListFormProps;
  constructor(props) {
    super(props);
    this.state = {
      studentIds: [],
      isStudentSelected: false,
    };
  }

  onSubmit = formData => {
    formData.Students = this.state.studentIds;
    formData.SchoolId = this.props.schoolId;
    let Students = [];
    if (formData.Students) {
      Students =
        formData.Students &&
        formData.Students.map(item => {
          return {
            StudentId: item,
          };
        });
    }
    delete formData.Students;
    formData.Students = Students;

    log('AddStudentList onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };
  setStudentIds = studentIds => {
    this.setState({
      studentIds: studentIds,
      isStudentSelected: true,
    });
  };
  render() {
    return (
      <form
        className="StudentListForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <InputBlock>
          <TextField label="Name*" name="Name" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Description*" name="Description" required={true} />
        </InputBlock>
        <hr />
        <h3 className="AppointmentForm__header">Select Members*</h3>

        <SchoolUtilityStudentsContainer
          dispatchFetchParams={this.props.schoolId}
        >
          <AddStudentsToListDataGrid
            schoolId={this.props.schoolId}
            //check if data came from smart list or SchoolUtilityStudentsContainer
            data={
              this.props.location.state
                ? this.props.location.state.filteredStudents
                : this.props.schoolUtilityStudents.payload
            }
            setStudentIds={this.setStudentIds}
          />
        </SchoolUtilityStudentsContainer>

        <hr />
        <div className="FormButtonsContainer">
          <SubmitButton
            disabled={!this.state.isStudentSelected}
            intent="pt-intent-primary"
          >
            Submit
          </SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  schoolUtilityStudents: state.school.utilityStudents,
});

const ConnectedStudentListForm = connect(
  StudentListForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-student-list', // a unique identifier for this form
  validate,
})(ConnectedStudentListForm);
