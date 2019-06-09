import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import SwitchField from 'components/Forms/SwitchField';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';

import { imageToBase64String, base64StringToFields } from 'util/base64';
import { getReferenceItemOptions } from 'api/referenceItems';
import { log } from 'log';

type EditSchoolProfileFormProps = {
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
  const errors = {};
  if (!values.Name) {
    errors.CurrencyTypeId = 'Please select a Name.';
  }
  if (!values.CountryId) {
    errors.CountryId = 'Please select a Country.';
  }

  if (values.TaxRate) {
    if (values.TaxRate > 100) {
      errors.TaxRate = 'Tax Rate cannnot be greater than 100%';
    }
  }

  return errors;
};

class EditSchoolProfileForm extends React.Component {
  props: EditSchoolProfileFormProps;
  state = {
    IsPosEnabled: this.props.initialValues.IsPosEnabled,
  };

  onSubmit = formData => {
    formData['SchoolId'] = this.props.schoolId;
    delete formData.Logo;

    log('EditSchoolProfileForm onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };

  componentWillMount() {
    this.setState({
      timeZoneTypes: getReferenceItemOptions(
        'LstTimeZones',
        this.props.references
      ),
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Name*" name="Name" required={true} />
        </InputBlock>

        <InputBlock>
          <TextField label="Primary Phone" name="PrimaryPhone" />
        </InputBlock>

        <InputBlock>
          <TextField label="Seconary phone" name="SecondaryPhone" />
        </InputBlock>
        <InputBlock>
          <TextField label="Email*" name="Email" required={true} />
        </InputBlock>

        <InputBlock>
          <TextField label="Fax" name="Fax" />
        </InputBlock>
        <InputBlock>
          <TextField label="Website" name="Website" />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Country*"
            name="CountryId"
            placeholder="Select an Account Type"
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
            label="Disbursement Frequency*"
            name="DisbursmentFrequencyId"
            placeholder="Select an Account Type"
            referenceOptions="LstFrequencyTypes"
          />
        </InputBlock>
        <InputBlock>
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

const ConnectedEditSchoolProfileForm = connect(
  EditSchoolProfileForm,
  mapStateToProps
);

export default reduxForm({
  form: 'edit-school-bank', // a unique identifier for this form
  validate,
})(ConnectedEditSchoolProfileForm);
