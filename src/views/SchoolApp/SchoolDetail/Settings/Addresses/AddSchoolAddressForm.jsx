import CountryStateSelectField from 'components/Forms/ConnectedFields/CountryStateSelectField';
import InputBlock from 'components/Forms/InputBlock';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import ValidatedInput from 'components/Forms/ValidatedInput';
import { log } from 'log';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import countryIds from 'src/redux/data/countryIds';

type connectedAddSchoolAddressFormProps = {
  schoolId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
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

    // If the Country is Australia, then we need to validate for a minimum of 4 characters,
    // rather than checking for 5 characters.
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

class connectedAddSchoolAddressForm extends React.Component {
  props: connectedAddSchoolAddressFormProps;

  constructor(props: connectedAddSchoolAddressFormProps) {
    super(props);
    this.state = {
      countryId: null,
      addressCode: 'Zip*',
    };
  }
  onSubmit = formData => {
    formData.SchoolId = this.props.schoolId;
    log('onSubmit formData', formData);
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
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SelectField
            label="Address Type*"
            name="Address.AddressTypeId"
            placeholder="Select Address Type"
            referenceOptions="LstAddressTypes"
          />
        </InputBlock>

        <InputBlock>
          <label className="pt-label">
            Address Line 1*
            <div className="pt-input-group">
              <Field
                required={true}
                name="Address.Address1"
                component={ValidatedInput}
                type="text"
              />
            </div>
          </label>
        </InputBlock>

        <InputBlock>
          <label className="pt-label">
            Address Line 2
            <div className="pt-input-group">
              <Field
                name="Address.Address2"
                component={ValidatedInput}
                type="text"
              />
            </div>
          </label>
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
          <label className="pt-label">
            <CountryStateSelectField
              label="State*"
              name="Address.State"
              countryId={this.state.countryId}
              required={true}
            />
          </label>
          <label className="pt-label">
            {`${this.state.addressCode}`}
            <div className="pt-input-group">
              <Field
                required={true}
                name="Address.Zip"
                component={ValidatedInput}
              />
            </div>
          </label>
        </InputBlock>

        <InputBlock>
          <label className="pt-label">
            City/Town:*
            <div className="pt-input-group">
              <Field
                required={true}
                name="Address.City"
                component={ValidatedInput}
                type="text"
              />
            </div>
          </label>
        </InputBlock>

        <div className="FormButtonsContainer">
          <SubmitButton>Save</SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    references: state.utility.references,
  };
};

const AddSchoolAddressForm = connect(
  connectedAddSchoolAddressForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-address', // a unique identifier for this form
  validate,
})(AddSchoolAddressForm);
