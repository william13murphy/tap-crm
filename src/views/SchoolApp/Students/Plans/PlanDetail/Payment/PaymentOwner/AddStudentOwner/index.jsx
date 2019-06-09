import React from 'react';
import { reduxForm } from 'redux-form';
import Modal from 'components/Modal';

import connect from 'src/redux/connect';

import SelectMockInput from 'components/Forms/SelectMockInput';

import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import DateField from 'components/Forms/DateField';
import CountryStateSelectField from 'components/Forms/ConnectedFields/CountryStateSelectField';
import countryIds from 'src/redux/data/countryIds';
import AddOwner from './AddOwner';

import StudentDetailContainer from 'containers/Student/StudentDetailContainer';
import StudentOwnerFormContainer from 'containers/Student/StudentOwnerFormContainer';

import './styles.less';

type AddStudentOwnerProps = {
  studentId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  planId: any,
  schoolId?: string,
  countryId: string,

  schoolProfile: {
    payload: {
      CountryId: string,
    },
  },
  studentDetail: {
    payload: {
      User: {
        Profile: {
          FirstName: string,
          LastName: string,
        },
      },
      Id: string,
      SchoolId: string,
    },
  },
  students: Array<{}>,
  initialValues: any,
  update?: boolean,
};

class AddStudentOwner extends React.Component {
  constructor(props: AddStudentOwnerProps) {
    super(props);
    this.state = {
      accountOwner: null,
      selectOptions: [],
    };
  }

  componentDidMount() {
    let countryId = this.props.countryId;

    // if (!this.props.update) {
    this.setState({
      selectOptions: this.props.students.payload.map(cV => {
        return {
          label:
            cV.LastName +
            ', ' +
            cV.FirstName +
            ' - ' +
            cV.Email +
            ' - #' +
            cV.BarCode,
          value: cV.StudentId,
        };
      }),
    });
    // }

    // Checks whether the selected Country is Australia,
    // and if so changes the addressCode label as Post Code
    let addressCode =
      countryId === countryIds.Australia ? 'Post Code*' : 'Zip*';

    this.setState({
      countryId,
      addressCode,
    });
  }
  handleSelectChange = e => {
    if (e) {
      this.setState({ accountOwner: e.value });
    }
  };
  render() {
    let planId = this.props.planId || this.props.initialValues.planId;
    let schoolId = this.props.schoolId || this.props.initialValues.schoolId;

    return (
      <Modal
        className="AddStudentOwner"
        title={`${
          this.props.update ? 'Edit Account Owner' : 'Add New Account Owner'
        }`}
        closeUrl={`/app/school-app/${schoolId}/students/plans/detail/${planId}/payment`}
      >
        <SelectMockInput
          className="AddStudentOwner__SelectInput"
          options={this.state.selectOptions}
          value={this.state.accountOwner}
          onChange={this.handleSelectChange}
          placeholder="Select a Student"
          label="Select a Student (Optional)"
        />
        {this.props.update ? (
          <div>
            {this.state.accountOwner && this.state.accountOwner != null ? (
              <StudentDetailContainer
                dispatchFetchParams={this.state.accountOwner}
              >
                <AddOwner
                  planId={planId}
                  schoolId={schoolId}
                  CountryId={this.props.countryId}
                  schoolProfile={this.props.schoolProfile}
                />
              </StudentDetailContainer>
            ) : (
              <AddOwner
                formInitialRender={true}
                planId={planId}
                schoolId={schoolId}
                CountryId={this.props.countryId}
                schoolProfile={this.props.schoolProfile}
              />
            )}
          </div>
        ) : (
          <AddOwner update initialValues={this.props.initialValues} />
        )}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    studentDetail: state.student.detail,
    studentCalendar: state.student.studentCalendar,
  };
};

export default connect(
  AddStudentOwner,
  mapStateToProps
);
