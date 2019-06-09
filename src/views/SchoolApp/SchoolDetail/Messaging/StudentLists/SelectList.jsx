import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';

import SelectField from 'components/Forms/SelectField';
import RadioFieldGroup from 'components/Forms/RadioField/RadioFieldGroup';
import RadioField from 'components/Forms/RadioField';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import SchoolStudentListDetailContainer from 'containers/School/SchoolStudentListDetailContainer';
import StudentListDetail from './StudentList/StudentListDetail';
import FilteredStudentListDetail from './StudentList/FilteredStudentListDetail';
import OutBoxFilteredStudentListDetail from './StudentList/OutBoxFilteredStudentListDetail';

import connect from 'src/redux/connect';

type SelectListProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: string,
  templateTypeId: string,
  templatePlaceholders: {
    payload: [],
  },
  students: {
    payload: [],
  },
  match: {
    params: {
      templateType: string,
    },
  },
  allStudentLists: {
    payload: [],
  },
};

const validate = values => {
  const errors = {};
  if (!values.SelsectAList) {
    errors.Name = 'Please select a list';
  }
  return errors;
};

class SelectList extends React.Component {
  props: SelectListProps;
  constructor(props) {
    super(props);
    this.state = {
      listId: '',
      messageType: '',
    };
    this.handleSelectField = this.handleSelectField.bind(this);
  }
  onSubmit = formData => {};

  handleSelectField(newIndex) {
    this.setState({
      listId: newIndex,
    });
  }

  handleSelectedStudents = selectedStudents => {
    this.setState({
      selectedStudents,
    });
  };

  render() {
    if (
      !this.props.location.state &&
      this.props.allStudentLists.payload.length === 0
    ) {
      return <NoDataMessage errorMessage="No Student Lists Found" />;
    } else {
      return (
        <div className="SelectList">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
            <InputBlock>
              <RadioFieldGroup label="Type">
                <div>
                  <RadioField
                    label="Email"
                    name="SelectList"
                    value="email"
                    onChange={event =>
                      this.setState({ messageType: event.target.value })
                    }
                  />
                </div>
                <div>
                  <RadioField
                    label="SMS"
                    name="SelectList"
                    value="sms"
                    onChange={event =>
                      this.setState({ messageType: event.target.value })
                    }
                  />
                </div>
                <div>
                  <RadioField
                    label="Letter"
                    name="SelectList"
                    value="letter"
                    onChange={event =>
                      this.setState({ messageType: event.target.value })
                    }
                  />
                </div>
              </RadioFieldGroup>
            </InputBlock>
            {this.props.location.state &&
            this.props.location.state.filteredStudents &&
            this.props.location.state.selectedStudentsData ? (
              <InputBlock>
                <OutBoxFilteredStudentListDetail
                  selectedStudentsDataPayload={
                    this.props.location.state.selectedStudentsData
                  }
                />
              </InputBlock>
            ) : (
              <InputBlock>
                <SelectField
                  label="Select a List*"
                  name="SelsectAList"
                  required={true}
                  options={
                    this.props.allStudentLists &&
                    this.props.allStudentLists.payload &&
                    this.props.allStudentLists.payload
                      .filter(item => {
                        return item.Students.length;
                      })
                      .map(item => {
                        return { label: item.Name, value: item.Id };
                      })
                  }
                  onChange={(evt, newIndex) => this.handleSelectField(newIndex)}
                />
              </InputBlock>
            )}

            {!this.props.location.state && this.state.listId && (
              <SchoolStudentListDetailContainer
                dispatchFetchParams={this.state.listId}
              >
                <StudentListDetail schoolId={this.props.schoolId} />
              </SchoolStudentListDetailContainer>
            )}
            <div className="SelectList__FormButtonsContainer">
              <Link
                to={{
                  pathname: `/app/school-app/${
                    this.props.schoolId
                  }/school-detail/messaging/outbox/compose/${this.state
                    .listId || 'smart-list-message'}/${this.state.messageType}`,
                  state: {
                    initialValues: this.props.allStudentLists,
                    smartList: !this.state.listId ? true : false,
                    filteredStudents: this.props.location.state
                      ? this.props.location.state.filteredStudents
                      : null,
                  },
                }}
              >
                <button
                  className="pt-button pt-intent-primary"
                  disabled={
                    (this.state.messageType && this.state.selectedStudents) ||
                    (this.state.messageType && this.state.listId) ||
                    this.state.messageType
                      ? false
                      : true
                  }
                >
                  <span className="button-text">Next</span>
                  <span className="pt-icon pt-icon-chevron-right" />
                </button>
              </Link>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    allStudentLists: state.school.allStudentLists,
  };
};

const ConnectedSMSSendForm = connect(
  SelectList,
  mapStateToProps
);

export default reduxForm({
  form: 'select-student-list', // a unique identifier for this form
  validate,
})(ConnectedSMSSendForm);
