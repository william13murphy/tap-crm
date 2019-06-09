import React from 'react';
import { reduxForm } from 'redux-form';

import TextField from 'components/Forms/TextField';
import EmailField from 'components/Forms/EmailField';
import SubmitButton from 'components/Forms/SubmitButton';
import InputBlock from 'components/Forms/InputBlock';
import ImageField from 'components/Forms/ImageField';

import { imageToBase64String, base64StringToFields } from 'util/base64';
import { validateEmail } from 'src/util';
import { log } from 'log';
import './styles.less';

const validate = values => {
  const errors = {};
  if (!values.Name) {
    errors.Name = 'Please enter a Name.';
  }
  if (!values.CountryId) {
    errors.CountryId = 'Please enter a Country.';
  }
  if (!values.Email) {
    errors.Email = 'Please enter an Email Address.';
  }
  if (values.Email) {
    errors.Email = validateEmail(values.Email);
  }

  return errors;
};

const defaultTimeZoneId = {
  label: 'Eastern',
  value: '4718cca3-b1fa-4f66-90c5-233630dbaa71',
};

const defaultRegionId = {
  label: 'North America',
  value: '388c1a74-e276-4de8-abd5-391b489b4b36',
};

type AddClientFormProps = {
  clientPost: {
    status: string,
    payload: {
      clientId: string,
    },
    error: boolean,
  },
  dispatchFormPost: any,
  // dispatchClientDetailFetch: any,
  dispatchFormReset: any,
  match: {
    params: {
      id: string,
    },
  },
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};
class AddClientForm extends React.Component {
  props: AddClientFormProps;

  constructor(props) {
    super(props);
    this.state = {
      DUNS_Lookup: 'https://www.dnb.com/duns-number/lookup.html',
    };
  }

  onSubmit = formData => {
    // Temporary hard-coded time zone and region
    formData['TimeZoneId'] = defaultTimeZoneId.value;
    formData['RegionId'] = defaultRegionId.value;

    if (formData.logoFile) {
      imageToBase64String(formData.logoFile).then(base64ImageString => {
        const base64Fields: {
          headerString: string,
          imageString: string,
        } = base64StringToFields(base64ImageString);

        formData['LogoHeader'] = base64Fields.headerString;
        formData['Logo'] = base64Fields.imageString;

        log('Add Contact onSubmit formData: ', formData);
        this.props.dispatchFormPost(formData);
      });
    } else {
      log('Add Contact onSubmit formData: ', formData);
      this.props.dispatchFormPost(formData);
    }
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form
        className="AddClientForm"
        onSubmit={handleSubmit(this.onSubmit)}
        method="POST"
      >
        <InputBlock>
          <TextField label="Client Name*" name="Name" required={true} />
          <EmailField label="Email*" name="Email" required={true} />
        </InputBlock>

        <InputBlock>
          <TextField label="Website URL" name="Url" />
          <TextField
            label="Primary Phone Number*"
            name="PrimaryPhone"
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField label="Secondary Phone Number" name="SecondaryPhone" />
          <TextField label="Fax Number" name="Fax" />
        </InputBlock>

        <InputBlock>
          <ImageField name="logoFile" label="Logo" />
          <TextField label="Tax ID" name="TaxId" />
        </InputBlock>

        <InputBlock>
          <TextField label="DUNS Number" name="Duns" />
          <a
            className="DUNS_Lookup"
            href={this.state.DUNS_Lookup}
            target="_blank"
          >
            DUNS Lookup
          </a>
        </InputBlock>

        <div className="FormButtonsContainer">
          <SubmitButton disabled={pristine || submitting}>
            Save & Continue
          </SubmitButton>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'client-add', // a unique identifier for this form
  validate,
})(AddClientForm);
