import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import SelectField from 'components/Forms/SelectField';
import RadioFieldGroup from 'components/Forms/RadioField/RadioFieldGroup';
import RadioField from 'components/Forms/RadioField';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import EfcUserCustomReportContainer from 'containers/Administration/EfcUserCustomReportContainer';
import StudentListDetail from './StudentList/StudentListDetail';
import { log } from 'log';

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
    this.handleChange = this.handleChange.bind(this);
  }
  onSubmit = formData => {
    log(formData);
  };
  handleChange(event) {
    this.setState({
      messageType: event.target.value,
    });
  }
  handleSelectField(newIndex) {
    this.setState({
      listId: newIndex,
    });
  }
  render() {
    if (this.props.allStudentLists.payload.length === 0) {
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
            {this.state.listId && (
              <EfcUserCustomReportContainer
                dispatchFetchParams={this.state.listId}
              >
                <StudentListDetail schoolId={this.props.schoolId} />
              </EfcUserCustomReportContainer>
            )}
            <div className="SelectList__FormButtonsContainer">
              <Link
                to={{
                  pathname: `/app/admin/messaging/detail/${
                    this.props.schoolId
                  }/outbox/compose/${this.state.listId}/${
                    this.state.messageType
                  }`,
                  state: {
                    initialValues: this.props.allStudentLists,
                  },
                }}
                className={
                  !this.state.listId || !this.state.messageType
                    ? 'disabled-link'
                    : ''
                }
              >
                <button
                  className="pt-button pt-intent-primary"
                  disabled={
                    this.state.listId && this.state.messageType ? false : true
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
    allStudentLists: state.administration.efcUserCustomReports,
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
