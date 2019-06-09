import React from 'react';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';

import { schoolAccountSummaryFetch } from 'src/redux/actionCreators/school/accountSummary';
import { log } from 'log';

type SummaryByMonthByYearFormProps = {
  schoolId: string,
  handleSubmit: any,
  dispatchFormPost: any,
};

const validate = values => {
  const errors = {};
  if (!values.Month) {
    errors.Month = 'Please select a Month.';
  }
  if (!values.Year) {
    errors.Year = 'Please select a Year.';
  }
  return errors;
};

const allYears = () => {
  let years = [];
  let currentYear = moment().format('YYYY');
  let yearDiff = currentYear - 2010;

  while (yearDiff >= 0) {
    years.push(currentYear--);
    yearDiff--;
  }

  return years;
};

class SummaryByMonthByYearForm extends React.Component {
  props: SummaryByMonthByYearFormProps;

  onSubmit = formData => {
    formData.SchoolId = this.props.schoolId;
    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };

  render() {
    const allMonths = moment.months();
    return (
      <form
        className="SummaryByMonthByYearForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <InputBlock>
          <SelectField
            label="Month*"
            name="Month"
            placeholder="Select a Month"
            id="Month"
            className="SelectMonth"
            help={true}
            required={true}
            options={allMonths.map((item, index) => {
              return {
                label: item,
                value: index + 1,
              };
            })}
          />
          <SelectField
            label="Year*"
            name="Year"
            placeholder="Select a Year"
            id="Year"
            className="SelectYear"
            help={true}
            required={true}
            options={allYears().map((item, index) => {
              return {
                label: item,
                value: item,
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolAccountSummaryFetch(data));
    },
  };
};

const connectedSummaryByMonthByYearForm = connect(
  SummaryByMonthByYearForm,
  mapStateToProps,
  mapDispatchToProps
);
export default reduxForm({
  form: 'summary-form', // a unique identifier for this form
  validate,
})(connectedSummaryByMonthByYearForm);
