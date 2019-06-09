import React from 'react';
import connect from 'src/redux/connect';
import { getReferenceItemIdByDescription } from 'api/referenceItems';
import { Field, reduxForm } from 'redux-form';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import InputBlock from 'components/Forms/InputBlock';
import moment from 'moment';
import { log } from 'log';

type AddEfcContactFormProps = {
  match: {
    params: {
      id: string,
    },
  },
  clientId: string,
  references: {},
  dispatchFormPost: any,
  data: [{}],
  handleSubmit: any,
  token: {
    payload: {
      UserId: string,
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.Name) {
    errors.UserId = 'Please select a Name.';
  }
  return errors;
};

class AddEfcContactForm extends React.Component {
  props: AddEfcContactFormProps;
  onSubmit = formData => {
    let selectedUser = this.props.data.find(
      item => item.Id === formData.User.Email
    );

    const InternalContactTypeId = getReferenceItemIdByDescription(
      this.props.references,
      'LstContactTypes',
      'Internal (EFC)'
    ).Id;

    const InternalContactRoleId = getReferenceItemIdByDescription(
      this.props.references,
      'LstInternalContactTypes',
      'Account Manager'
    ).Id;

    // Add field defaults:
    formData.Administrator = true;
    formData.Preffered = true;
    if (!formData.User) {
      formData.User = {};
    }
    if (!formData.User.Profile) {
      formData.User.Profile = {};
    }

    formData.SchoolId = this.props.schoolId;
    formData.ContactTypeId = InternalContactTypeId;
    formData.ContactRoleId = InternalContactRoleId;
    formData.UserId = selectedUser && selectedUser.Id;
    formData.User.Id = selectedUser && selectedUser.Id;
    formData.User.CreatedOn = moment().format('YYYY-MM-DD');
    formData.User.CreatedBy = this.props.token.payload.UserId;
    formData.User.Profile.FirstName = selectedUser && selectedUser.FirstName;
    formData.User.Profile.LastName = selectedUser && selectedUser.LastName;
    formData.User.Profile.GenderId = selectedUser && selectedUser.GenderId;
    formData.User.Profile.Dob = selectedUser && selectedUser.Dob;
    formData.User.Profile.UserTypeId = selectedUser && selectedUser.UserTypeId;
    formData.User.Profile.CountryId = selectedUser && selectedUser.CountryId; // United States
    formData.User.UserName = selectedUser && selectedUser.Email;
    formData.User.Email = selectedUser.Email;
    formData.User.Password = 'tempPass!!11';

    log('Add EFC Contact - onSubmit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SelectField
            {...this.props}
            label="Email*"
            name="User.Email"
            placeholder="EFC Contact Name"
            help={true}
            required={true}
            options={this.props.efcUsers.payload.map(item => {
              return {
                label: `${item.FirstName} ${item.LastName} - ${item.Email}`,
                value: item.Id,
              };
            })}
          />
        </InputBlock>
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientContactPost: state.client.contactPost,
    references: state.utility.references,
    token: state.token,
    efcUsers: state.administration.efcUsers,
  };
}

const connectedAddInternalClientContact = connect(
  AddEfcContactForm,
  mapStateToProps
);

export default reduxForm({
  form: 'client-internal-contact-create', // a unique identifier for this form
  validate,
})(connectedAddInternalClientContact);
