import React from 'react';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import SubmitButton from 'components/Forms/SubmitButton';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import { reduxForm } from 'redux-form';

import { getReferenceItemById } from 'api/referenceItems';
import { log } from 'log';

type AdditionalClassesFormProps = {
  report: {
    attendanceByProgram: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
  columns: number,
  sideNav?: boolean,
  handleSubmit: any,
  dispatchFormPost: any,
  token: {
    payload: {
      SchoolId: string,
    },
  },
  schoolStyles: [{}],
  SchoolStyleId: string,
  styleRateId: string,
};

const validate = values => {
  const errors = {};
  if (!values.Name) {
    errors.Name = 'Please Enter a Name.';
  }
  if (!values.AdditionalClassId) {
    errors.AdditionalClassId = 'Please select an Additional Class.';
  }
  if (!values.ClassesCost) {
    errors.ClassesCost = 'Please Enter Additional Class Cost.';
  }
  return errors;
};

class AdditionalClassesForm extends React.Component {
  props: AdditionalClassesFormProps;
  onSubmit = formData => {
    formData.AdditionalClassId = formData.AdditionalClassId;
    formData.ClassesCost = formData.ClassesCost;
    formData.StyleRateId = this.props.styleRateId;

    // Use the LstAdditionalClasses Description in place of the "Name" field:
    formData.Name = getReferenceItemById(
      this.props.references,
      'LstAdditional Classes',
      formData.AdditionalClassId
    ).Description;

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };

  render() {
    return (
      <form
        className="AdditionalClassesForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <InputBlock>
          <SelectField
            label="Number of Additional Classes"
            name="AdditionalClassId"
            placeholder="Additional Classes"
            referenceOptions="LstAdditional Classes"
            help={true}
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Annual Cost"
            name="ClassesCost"
            placeholder="Additional Annual Cost"
            type="number"
            input={{ min: 0, step: '.01' }}
            required={true}
            help={true}
            currency
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

const connectedAdditionalClassesForm = connect(
  AdditionalClassesForm,
  mapStateToProps
);

export default reduxForm({
  form: 'additional-classes-form', // a unique identifier for this form
  validate,
})(connectedAdditionalClassesForm);
