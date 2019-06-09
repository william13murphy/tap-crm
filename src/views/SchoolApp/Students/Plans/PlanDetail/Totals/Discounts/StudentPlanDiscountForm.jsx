import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';

import { localCurrencyValue } from 'util/localization/localValues';

type StudentPlanDiscountFormProps = {
  schoolDiscounts: Array<{}>,
  token: {
    payload: {
      UserId: string,
    },
  },
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  routeParams: any,
};

const validate = values => {
  return {};
};

class StudentPlanDiscountForm extends React.Component {
  props: StudentPlanDiscountFormProps;
  onSubmit = formData => {
    formData.CreatedBy = this.props.token.payload.UserId;
    formData['planId'] = this.props.routeParams;
    this.props.dispatchFormPost(formData);
  };
  handleProgramChange = (e, programId) => {
    if (programId) {
      const selectedProgram = this.props.styles.payload.filter(cV => {
        if (cV.Id === programId) {
          return true;
        }
      })[0];
      this.setState({
        selectedProgram,
      });
    } else {
      this.setState({
        selectedProgram: null,
      });
    }
  };
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
        className="StudentPlanDiscountForm"
      >
        <InputBlock>
          <SelectField
            name="SchoolDiscountId"
            placeholder="Select a Discount"
            options={this.props.schoolDiscounts.map((cV, i) => {
              let label;
              if (cV.TypeId === '41a05cd6-b273-4ce1-a51a-c63e9154d8e4') {
                label = `${cV.Name}: ${cV.Value}%`;
              } else if (
                cV.TypeId === '13ffcaec-5eb0-4ccf-90f2-f0c4e3a11b6c' ||
                cV.TypeId === 'b1b9e29e-1fda-49c5-b3b6-8ead06935a9c'
              ) {
                label = `${cV.Name}: ${localCurrencyValue(cV.Value)}`;
              }
              return {
                label: label,
                value: cV.Id,
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

export default reduxForm({
  form: 'student-plan-payment-discount-form', // a unique identifier for this form
  validate,
})(StudentPlanDiscountForm);
