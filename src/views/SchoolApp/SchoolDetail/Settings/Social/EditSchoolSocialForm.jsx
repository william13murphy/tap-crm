import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';

type EditSchoolSocialFormProps = {
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
};

class EditSchoolSocialForm extends React.Component {
  props: EditSchoolSocialFormProps;
  onSubmit = formData => {
    formData['Id'] = this.props.schoolId;

    // Remove these fields from formData, only use id and social media fields
    delete formData.Bank;
    delete formData.Addresses;
    delete formData.Contacts;
    delete formData.Administrator;
    delete formData.ChangedOn;
    delete formData.Client;
    delete formData.confirmEmail;
    delete formData.CreatedBy;
    delete formData.CreatedOn;
    delete formData.Fax;
    delete formData.Logo;
    delete formData.Name;
    delete formData.Preferred;
    delete formData.PrimaryPhone;
    delete formData.Role;
    delete formData.SecondaryPhone;
    delete formData.TaxId;
    delete formData.Url;
    delete formData.User;

    this.props.dispatchFormPost(formData);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Active Campaign Key" name="ActiveCampaignKey" />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Active Campaign Secret"
            name="ActiveCampaignSecret"
          />
        </InputBlock>
        <InputBlock>
          <TextField label="Active Campaign Url" name="ActiveCampaignUrl" />
        </InputBlock>
        <InputBlock>
          <TextField label="Active Campaign User" name="ActiveCampaignUser" />
        </InputBlock>
        <InputBlock>
          <TextField label="Facebook Key" name="FacebookKey" />
        </InputBlock>
        <InputBlock>
          <TextField label="Facebook User" name="FacebookUser" />
        </InputBlock>
        <InputBlock>
          <TextField label="Mind Me Key" name="MindMeKey" />
        </InputBlock>
        <InputBlock>
          <TextField label="Mind Me Secret" name="MindMeSecret" />
        </InputBlock>
        <InputBlock>
          <TextField label="Mind Me Url" name="MindMeUrl" />
        </InputBlock>
        <InputBlock>
          <TextField label="Mind Me User" name="MindMeUser" />
        </InputBlock>
        <InputBlock>
          <TextField label="Twilio Key" name="TwilioKey" />
        </InputBlock>
        <InputBlock>
          <TextField label="Twilio Other" name="TwilioOther" />
        </InputBlock>
        <InputBlock>
          <TextField label="Twilio User" name="TwilioUser" />
        </InputBlock>
        <InputBlock>
          <TextField label="Twitter Key" name="TwitterKey" />
        </InputBlock>
        <InputBlock>
          <TextField label="Twitter Other" name="TwitterOther" />
        </InputBlock>
        <InputBlock>
          <TextField label="Twitter User" name="TwitterUser" />
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

const connectedAddSchoolNoteForm = connect(
  EditSchoolSocialForm,
  mapStateToProps
);

export default reduxForm({
  form: 'edit-school-social', // a unique identifier for this form
})(connectedAddSchoolNoteForm);
