import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';

import RateMasterContainer from 'containers/Utility/RateMasterContainer';
import SelectField from 'components/Forms/SelectField';
import { log } from 'log';

type AddSchoolRateFormProps = {
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

const validate = values => {
  const errors = {};
  if (!values.RateMasterId) {
    errors.RateMasterId = 'Please select a Rate Type.';
  }
  if (!values.Detail) {
    errors.Detail = 'Please enter a Description.';
  }
  if (!values.Trans) {
    errors.Trans = 'Please enter a Transaction Cost.';
  } else if (
    values.RateMasterId === 'dc0a48e8-e3e6-47a9-9042-206f9570458f' //EFT Handling Rates
  ) {
    if (parseFloat(values.Trans) > 3) {
      errors.Trans = 'Transaction cost must be less then or equal to 3%';
    }
  } else if (
    values.RateMasterId === 'c9ff14ab-23e9-46b7-a6d2-20f4458fdc00' //Card Handling Rates
  ) {
    if (parseFloat(values.Trans) > 5) {
      errors.Trans = 'Transaction cost must be less then or equal to 5%';
    }
  } else if (
    values.RateMasterId === '5a370781-5ac4-4614-8591-48905b5e99c0' //Cash Handling Rates
  ) {
    if (parseFloat(values.Trans) > 1) {
      errors.Trans = 'Transaction cost must be less then or equal to 1%';
    }
  } else if (
    values.RateMasterId === '23799638-3b66-4f0e-a855-d2f278c22afb' //School Commision Rates
  ) {
    if (parseFloat(values.Trans) > 6) {
      errors.Trans = 'Transaction cost must be less then or equal to 6%';
    }
  } else if (
    values.RateMasterId === 'f76f9dbc-71bd-4595-8f43-f74c706eb111' //EFT Transaction Rates
  ) {
    if (parseFloat(values.Trans) > 0.1) {
      errors.Trans = 'Transaction cost must be less then or equal to 0.10$';
    }
  } else if (
    values.RateMasterId === '7de2e696-f932-4838-94b7-7eb8a3238412' //Card Transaction Rates
  ) {
    if (parseFloat(values.Trans) > 0.25) {
      errors.Trans = 'Transaction cost must be less then or equal to 0.25$';
    }
  }
  return errors;
};

class AddSchoolRateForm extends React.Component {
  props: AddSchoolRateFormProps;
  constructor(props) {
    super(props);
    this.state = {
      selectedRateType: '',
    };
    this.handleSelectField = this.handleSelectField.bind(this);
  }
  onSubmit = formData => {
    formData['SchoolId'] = this.props.schoolId;
    formData['CreatedBy'] = this.props.token.payload.UserId;

    log('AddSchoolRateForm onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };
  getRateMasterOptions = () => {
    return (
      this.props.rateTypes &&
      this.props.rateTypes.payload &&
      this.props.rateTypes.payload.map(item => {
        return {
          label: item.Description,
          value: item.Id,
        };
      })
    );
  };

  handleSelectField = event => {
    this.setState({ selectedRateType: event });
  };
  render() {
    let rate =
      this.props.rateTypes &&
      this.props.rateTypes.payload &&
      this.props.rateTypes.payload.find(
        item => item.Id === this.state.selectedRateType
      );
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <RateMasterContainer>
          <InputBlock>
            <SelectField
              label="Rate Type*"
              name="RateMasterId"
              placeholder="Select a Rate Type"
              options={this.getRateMasterOptions()}
              onChange={(evt, newIndex) => this.handleSelectField(newIndex)}
            />
          </InputBlock>
        </RateMasterContainer>

        <InputBlock>
          <TextField
            label="Description*"
            name="Detail"
            textarea={true}
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField
            label={
              rate && rate.RateHint === 'Percentage'
                ? 'Commission Percentage*'
                : 'Transaction Cost*'
            }
            percent={rate && rate.RateHint === 'Percentage' ? true : false}
            currency={rate && rate.RateHint === 'Currency' ? true : false}
            name="Trans"
            input={{ min: 0, step: '.01' }}
            required={true}
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
    token: state.token,
    rateTypes: state.utility.rateMaster,
  };
};

const connectedAddSchoolRateForm = connect(
  AddSchoolRateForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-rate', // a unique identifier for this form
  validate,
})(connectedAddSchoolRateForm);
