import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SwitchField from 'components/Forms/SwitchField';
import SelectField from 'components/Forms/SelectField';
import EmailField from 'components/Forms/EmailField';
import { log } from 'log';
import '../styles.less';
type AddStudentContactFormProps = {
  studentId: string,
  schoolId: string,
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
  searchFuzzy: {
    payload: [{}],
  },
};

const validate = values => {
  const errors = {};
  if (!values.ContactTypeId) {
    errors.ContactTypeId = 'Please select a Contact Type.';
  }
  if (!values.Title) {
    errors.Title = 'Please enter a Title.';
  }
  if (!values.Detail) {
    errors.Detail = 'Please enter a Description.';
  }
  return errors;
};

class AddExistingUserContact extends React.Component {
  props: AddExistingUserContactProps;
  state = {
    selectedEmail: '',
  };

  onSubmit = formData => {
    log('formData', JSON.stringify(formData));
  };

  handleSelectField(newIndex) {
    this.setState({
      selectedEmail: newIndex,
    });
  }
  render() {
    let selectedEmailData = null;
    if (this.state.selectedEmail) {
      selectedEmailData =
        this.props.searchFuzzy &&
        this.props.searchFuzzy.payload &&
        this.props.searchFuzzy.payload.find(item => {
          if (item.Email === this.state.selectedEmail) {
            return item;
          }
        });
    }

    let existingUsers = this.props.searchFuzzy.payload.filter(item => {
      if (
        item.Type != 'LEAD' &&
        moment(moment().startOf('day')).diff(item.Dob, 'years') >= 18
      ) {
        return item;
      }
    });

    return (
      <div className="AddExistingUserContact">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
          <InputBlock>
            <SelectField
              label="Select Existing Contact*"
              name="ExistingContact"
              placeholder="Select a User"
              options={existingUsers.map(item => {
                return {
                  label:
                    item.FirstName +
                    ' ' +
                    item.LastName +
                    ' ' +
                    item.Email +
                    ' ' +
                    item.Type,
                  value: item.Email,
                };
              })}
              onChange={(evt, newIndex) => this.handleSelectField(newIndex)}
            />
          </InputBlock>
          <div className="SelectList__FormButtonsContainer">
            <Link
              to={{
                pathname: `/app/school-app/${
                  this.props.schoolId
                }/students/detail/${
                  this.props.studentId
                }/contacts/existing-contact/add/user`,
                state: {
                  initialValues: {
                    ...selectedEmailData,
                  },
                },
              }}
              className={!this.state.selectedEmail ? 'disabled-link' : ''}
            >
              <button
                className="pt-button pt-intent-primary"
                disabled={this.state.selectedEmail ? false : true}
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

const mapStateToProps = state => {
  return {
    token: state.token,
    studentDetail: state.student.detail,
    searchFuzzy: state.school.searchFuzzy,
  };
};

const connectedAddExistingUserContact = connect(
  AddExistingUserContact,
  mapStateToProps
);

export default reduxForm({
  form: 'add-student-contact', // a unique identifier for this form
  validate,
})(connectedAddExistingUserContact);
