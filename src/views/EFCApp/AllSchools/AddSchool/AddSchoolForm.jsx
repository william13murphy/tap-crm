import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import SwitchField from 'components/Forms/SwitchField';

import AllClientsContainer from 'containers/Client/AllClientsContainer';
import ClientSelectField from 'components/Forms/ConnectedFields/ClientSelectField';

import { getReferenceItems, getReferenceItemOptions } from 'api/referenceItems';
import { log } from 'log';

type AddSchoolFormProps = {
  id: string,
  references: {},
  utility: Object,
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {};
  if (!values.ClientId) {
    errors.ClientId = 'Please select a Client.';
  }
  if (!values.Name) {
    errors.Name = 'Please enter a School Name.';
  }
  if (!values.Email) {
    errors.Email = 'Please enter a School Email Address.';
  }
  if (!values.TypeId) {
    errors.TypeId = 'Please select a School Type.';
  }
  if (!values.CountryId) {
    errors.CountryId = 'Please select a Country.';
  }
  if (!values.TimeZoneId) {
    errors.TimeZoneId = 'Please select a Time Zone.';
  }
  if (!values.DisbursmentFrequencyId) {
    errors.DisbursmentFrequencyId =
      'Please select a Disbursement Frequency Type.';
  }

  if (!values.TaxRate) {
    errors.TaxRate = 'Please enter the Tax Rate.';
  } else if (values.TaxRate) {
    if (values.TaxRate > 100) {
      errors.TaxRate = 'Tax Rate cannnot be greater than 100%';
    }
  }

  return errors;
};

class AddSchoolForm extends React.Component {
  props: AddSchoolFormProps;
  state = {
    timeZoneTypes: [],
    IsPosEnabled: false,
  };

  componentWillMount() {
    this.setState({
      timeZoneTypes: getReferenceItemOptions(
        'LstTimeZones',
        this.props.references
      ),
    });
  }

  onSubmit = formData => {
    if (this.props.clientId) {
      formData.ClientId = this.props.clientId;
    }

    formData.CreatedOn = moment().format('YYYY-MM-DD');
    formData.ChangedOn = moment().format('YYYY-MM-DD');
    formData.CommisionTypeId = 'fb7d3b0b-cf6e-43bc-ac51-1762d3c111ad';
    formData.CommisionThreshold = 20000;

    delete formData.confirmEmail;
    delete formData.Role;
    delete formData.Bank;
    delete formData.Addresses;
    delete formData.Contacts;

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        {!this.props.clientId ? (
          <InputBlock>
            <AllClientsContainer>
              <ClientSelectField
                name="ClientId"
                label="Select Client*"
                required={true}
              />
            </AllClientsContainer>
          </InputBlock>
        ) : (
          ''
        )}
        <InputBlock>
          <TextField label="School Name*" name="Name" required={true} />
        </InputBlock>

        <InputBlock>
          <TextField label="School Email*" name="Email" required={true} />
        </InputBlock>

        <InputBlock>
          <SelectField
            label="School Type*"
            name="TypeId"
            placeholder="Select a School Type"
            referenceOptions="LstSchoolTypes"
          />
        </InputBlock>

        <InputBlock>
          <SelectField
            label="Country*"
            name="CountryId"
            placeholder="Select a Country"
            referenceOptions="LstCountries"
            required={true}
          />
          <SelectField
            label="Time Zone*"
            name="TimeZoneId"
            placeholder="Select a Time Zone"
            options={this.state.timeZoneTypes.map(item => {
              return { label: item.Code, value: item.value };
            })}
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <SelectField
            label="Disbursement Frequency Type*"
            name="DisbursmentFrequencyId"
            placeholder="Select a Disbursement Frequency Type"
            referenceOptions="LstFrequencyTypes"
          />
          <TextField
            percent
            type="number"
            input={{ min: 0, step: '.01' }}
            label="Tax Rate*"
            name="TaxRate"
          />
        </InputBlock>
        <InputBlock>
          <SwitchField
            label="Display POS"
            name="IsPosEnabled"
            checked={this.state.IsPosEnabled}
            onClick={() => {
              this.setState({ IsPosEnabled: !this.state.IsPosEnabled });
            }}
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
    references: state.utility.references,
  };
};

const connectedAddSchoolForm = connect(
  AddSchoolForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school', // a unique identifier for this form
  validate,
})(connectedAddSchoolForm);
