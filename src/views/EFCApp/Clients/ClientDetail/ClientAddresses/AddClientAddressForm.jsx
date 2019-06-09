import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';

import CountryStateSelectField from 'components/Forms/ConnectedFields/CountryStateSelectField';
import countryIds from 'src/redux/data/countryIds';
import { log } from 'log';

type AddClientAddressFormProps = {
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  clientId: string,
  dispatchFormPost: any,
  dispatchFormReset: any,
  references: {},
};

const validate = values => {
  const errors = {
    Address: {},
  };
  if (values && values.Address) {
    if (!values.Address.AddressTypeId) {
      errors.Address.AddressTypeId = 'Please enter an Address Type.';
    }
    if (!values.Address.Address1) {
      errors.Address.Address1 = 'Please enter a Street Address.';
    }
    if (!values.Address.CountryId) {
      errors.Address.CountryId = 'Please enter a Country.';
    }
    if (!values.Address.State) {
      errors.Address.State = 'Please enter a State.';
    }

    if (!values.Address.City) {
      errors.Address.City = 'Please enter a City or Town.';
    }

    if (values.Address.CountryId === countryIds.Australia) {
      if (!values.Address.Zip) {
        errors.Address.Zip = 'Please enter the Post Code';
      } else if (values.Address.Zip.length < 4) {
        errors.Address.Zip =
          'Invaid Post Code Format: Atleast 4 characters required.';
      }
    } else {
      if (!values.Address.Zip) {
        errors.Address.Zip = 'Please enter the Zip Code';
      } else if (values.Address.Zip.length < 5) {
        errors.Address.Zip =
          'Invaid Zip Code Format: Atleast 5 characters required.';
      } else if (values.Address.Zip.length > 10) {
        errors.Address.Zip = 'Exceeded a Maximum limit of 10 characters.';
      }
    }
  }

  return errors;
};

const tempAddressTypes = [
  {
    label: 'Mailing',
    value: 'e0e08fcd-a1e3-4810-ab49-7f49124b52d3',
  },
  {
    label: 'Billing',
    value: '781469bf-8815-478c-b1ef-8baf06149f07',
  },
  {
    label: 'Shipping',
    value: '89917168-ff35-4619-a500-632410868499',
  },
  {
    label: 'Preferred',
    value: '9f131320-420b-43cc-af22-0d60400fe8dd',
  },
];

class AddClientAddressForm extends React.Component {
  constructor(props: AddClientAddressFormProps) {
    super(props);
    this.state = {
      countryId: null,
      addressCode: 'Zip*',
    };
  }

  onSubmit = formData => {
    formData['ClientId'] = this.props.clientId;

    log('onSubmit', formData);
    this.props.dispatchFormPost(formData);
  };

  handleCountryChange = value => {
    // Checks whether the selected Country is Australia,
    // and if so changes the addressCode label as Post Code
    let addressCode = value === countryIds.Australia ? 'Post Code*' : 'Zip*';

    this.setState({
      countryId: value,
      addressCode,
    });
  };

  componentDidMount() {
    if (this.props.initialValues) {
      let countryId = this.props.initialValues.Address.CountryId;

      this.setState({
        countryId: countryId,
      });
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form
        className="AddClientAddressForm"
        onSubmit={handleSubmit(this.onSubmit)}
        method="POST"
      >
        <InputBlock>
          <SelectField
            label="Address Type*"
            name="Address.AddressTypeId"
            placeholder="Select Address Type"
            referenceOptions="LstAddressTypes"
          />
        </InputBlock>

        <InputBlock>
          <TextField
            label="Address Line 1*"
            name="Address.Address1"
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField label="Address Line 2" name="Address.Address2" />
        </InputBlock>

        <InputBlock>
          <SelectField
            label="Country*"
            name="Address.CountryId"
            placeholder="Select Address Type"
            referenceOptions="LstCountries"
            onChange={(event, value) => this.handleCountryChange(value)}
          />
        </InputBlock>

        <InputBlock>
          <CountryStateSelectField
            label="State*"
            name="Address.State"
            countryId={this.state.countryId}
            required={true}
          />
          <TextField
            label={`${this.state.addressCode}`}
            name="Address.Zip"
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField label="City/Town:*" name="Address.City" require={true} />
          <TextField label="County" name="Address.County" />
        </InputBlock>

        <div className="FormButtonsContainer">
          <SubmitButton disabled={pristine || submitting}>Save</SubmitButton>
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

const connectedAddClientAddressForm = connect(
  AddClientAddressForm,
  mapStateToProps
);

export default reduxForm({
  form: 'client-address-create', // a unique identifier for this form
  validate,
})(connectedAddClientAddressForm);
