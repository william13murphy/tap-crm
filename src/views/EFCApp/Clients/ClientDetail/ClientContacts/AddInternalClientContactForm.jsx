import React from 'react';
import connect from 'src/redux/connect';
import { getReferenceItemIdByDescription } from 'api/referenceItems';
import { Field, reduxForm } from 'redux-form';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import InputBlock from 'components/Forms/InputBlock';
import { log } from 'log';

type AddClientContactProps = {
  match: {
    params: {
      id: string,
    },
  },
  clientId: string,
  references: {},
  dispatchFormPost: any,
};

const validate = values => {
  const errors = {};
  if (!values.UserId) {
    errors.UserId = 'Please select a EFC Contact Name.';
  }
  return errors;
};

class AddInternalClientContactForm extends React.Component {
  props: AddClientContactProps;
  onSubmit = formData => {
    const newClientContact = formData;

    const InternalContactTypeId = getReferenceItemIdByDescription(
      this.props.references,
      'LstContactTypes',
      'Internal (EFC)'
    ).Id;

    const InternalContactRoleId = getReferenceItemIdByDescription(
      this.props.references,
      'LstInternalContactTypes',
      'Client Services'
    ).Id;

    newClientContact['ClientId'] = this.props.clientId;
    newClientContact['ContactTypeId'] = ExternalContactTypeId;
    newClientContact['ContactRoleId'] = InternalContactRoleId;
    newClientContact['Preffered'] = true;
    newClientContact['Administrator'] = false;

    log('Add Client Contact - onSubmit formData: ', newClientContact);
    this.props.dispatchFormPost(newClientContact);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SelectField
            label="Email*"
            name="UserId"
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
          <SubmitButton intent="pt-intent-primary">Save</SubmitButton>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    efcUsers: state.administration.efcUsers,
    clientContactPost: state.client.contactPost,
    references: state.utility.references,
  };
}

const connectedAddInternalClientContactForm = connect(
  AddInternalClientContactForm,
  mapStateToProps
);

export default reduxForm({
  form: 'client-internal-contact-create', // a unique identifier for this form
  validate,
})(connectedAddInternalClientContactForm);
