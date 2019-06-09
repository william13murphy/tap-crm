import React from 'react';
import debounce from 'lodash/debounce';
import { reduxForm, Fields } from 'redux-form';
import connect from 'src/redux/connect';

import Collapsible from 'components/Collapsible';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import DateField from 'components/Forms/DateField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import NoDataMessage from 'components/DataLoading/NoDataMessage';
import StateSelectField from 'components/Forms/ConnectedFields/StateSelectField';
import SchoolStylesSelectField from 'components/Forms/ConnectedFields/SchoolStylesSelectField';
import { log } from 'log';

type SmartListFilterFormProps = {
  schoolId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {};
  return errors;
};

class SmartListFilterForm extends React.Component {
  props: SmartListFilterFormProps;
  state = {
    autoSubmitComplete: false,
    defaultSubmitComplete: false,
    onSubmitComplete: false,
    countryId: null,
    programId: null,
  };

  componentWillReceiveProps(nextProps) {
    //submits the form when filter fields are changed
    if (
      nextProps.dirty &&
      nextProps.valid &&
      nextProps.formState.values !== this.props.formState.values &&
      !this.state.onSubmitComplete
    ) {
      setTimeout(this.props.handleSubmit(this.onSubmit), 0);
    } else {
      this.setState({ onSubmitComplete: false });
    }
  }

  onSubmit = debounce(formData => {
    this.setState({ onSubmitComplete: true }, () => {
      let newFormData = {};

      newFormData.FilterJson = formData;
      newFormData.SchoolId = this.props.schoolId;
      newFormData.Name = 'Hardcoded Report Name';

      log('onSubmit newFormData', newFormData);
      this.props.handleFilters(newFormData); //passes data back to SmartListPage to be used for saving reports
      this.props.dispatchFormPost(newFormData);
    });
  }, 1000);

  handleAutoSubmit = () => {
    //Load all students by default
    if (!this.state.defaultSubmitComplete && !this.props.initialValues) {
      this.setState({ defaultSubmitComplete: true }, () => {
        let autoSubmitData = {};
        autoSubmitData.FilterJson = {};
        autoSubmitData.SchoolId = this.props.schoolId;
        autoSubmitData.Name = 'Hardcoded Report Name';
        log('Default - Loading All Students', autoSubmitData);
        this.props.handleFilters(autoSubmitData);
        this.props.dispatchFormPost(autoSubmitData);
      });
    }
    //Auto submit form when a report is loaded
    if (!this.state.autoSubmitComplete && this.props.autoSubmit) {
      this.setState({ autoSubmitComplete: true }, () => {
        let autoSubmitData = {};
        autoSubmitData.FilterJson = this.props.initialValues;
        autoSubmitData.SchoolId = this.props.schoolId;
        autoSubmitData.Name = 'Hardcoded Report Name';
        log('Load Report > Auto Submitting filters', autoSubmitData);
        this.props.handleFilters(autoSubmitData);
        this.props.dispatchFormPost(autoSubmitData);
      });
    }
  };

  handleCountryChange = value => {
    this.setState({
      countryId: value,
    });
  };

  handleStyleChange = value => {
    this.setState({
      programId: value,
    });
  };

  handleClearFilters = () => {
    this.props.reset();
    this.props.handleClearFilters();
    this.setState({ programId: null });
  };

  render() {
    this.handleAutoSubmit();
    let styleRanks =
      this.state.programId &&
      this.props.styles.payload.filter(
        element => element.Id === this.state.programId
      )[0].StyleRanks;
    let rankOptions;
    if (styleRanks !== null && styleRanks !== '') {
      rankOptions = styleRanks.map(item => {
        return {
          label: item.Name,
          value: item.Id,
        };
      });
    }

    return (
      <form
        className="SmartList__FiltersForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <h1 className="SmartList__FiltersForm__title">Filter by</h1>

        <Collapsible title="Program" isOpen>
          <InputBlock>
            <SchoolStylesSelectField
              InputOptions={{
                menuPosition: 'absolute',
              }}
              name="ProgramId"
              label="Program"
              placeholder="Select a Program"
              onChange={(event, value) => this.handleStyleChange(value)}
            />
          </InputBlock>
          <InputBlock>
            {this.state.programId &&
              (styleRanks !== null ? (
                <SelectField
                  InputOptions={{
                    menuPosition: 'absolute',
                  }}
                  label="Rank"
                  name="RankId"
                  placeholder="Select a Rank"
                  options={rankOptions}
                />
              ) : (
                <NoDataMessage errorMessage="No Ranks Found" />
              ))}
          </InputBlock>
          <div>
            <label className="pt-label">Weeks at Grade</label>
          </div>
          <InputBlock>
            <TextField
              name="WeeksAtGradeMinimum"
              placeholder="Minimum"
              type="number"
              input={{ min: 0, max: 52 }}
            />
            <TextField
              name="WeeksAtGradeMaximum"
              placeholder="Maximum"
              type="number"
              input={{ min: 0, max: 52 }}
            />
          </InputBlock>
          <InputBlock>
            <DateField label="Last Attended: Prior" name="LastAttendedBefore" />
            <DateField label="Last Attended: After" name="LastAttendedAfter" />
          </InputBlock>
        </Collapsible>

        <Collapsible title="Location">
          <InputBlock>
            <SelectField
              InputOptions={{
                menuPosition: 'absolute',
              }}
              label="Distance from School"
              name="Distance"
              placeholder="Select a Distance"
              options={[
                {
                  label: '1 mile',
                  value: 1,
                },
                {
                  label: '5 miles',
                  value: 5,
                },
                {
                  label: '10 miles',
                  value: 10,
                },
                {
                  label: '25 miles',
                  value: 25,
                },
                {
                  label: '50 miles',
                  value: 50,
                },
              ]}
            />
          </InputBlock>
          <InputBlock>
            <SelectField
              InputOptions={{
                menuPosition: 'absolute',
              }}
              label="Country"
              name="CountryId"
              placeholder="Select a Country"
              referenceOptions="LstCountries"
              onChange={(event, value) => this.handleCountryChange(value)}
            />
          </InputBlock>

          <InputBlock>
            <StateSelectField
              InputOptions={{
                menuPosition: 'absolute',
                menuPlacement: 'top',
              }}
              label="State*"
              name="State"
              countryId={this.state.countryId}
              required={true}
            />
          </InputBlock>

          <InputBlock>
            <TextField label="City" name="City" />
          </InputBlock>

          <InputBlock>
            <TextField label="Street Address" name="Address1" />
          </InputBlock>

          <InputBlock>
            <TextField label="Zip Code" name="Zip" />
          </InputBlock>
        </Collapsible>

        <Collapsible title="Status">
          <InputBlock>
            <TextField
              label="Weeks Until Birthday"
              name="WeeksUntilBirthday"
              type="number"
              input={{ min: 0 }}
            />
          </InputBlock>

          <InputBlock>
            <TextField
              label="Weeks Active"
              name="WeeksActive"
              type="number"
              input={{ min: 0 }}
            />
          </InputBlock>

          <InputBlock>
            <TextField
              label="Weeks Inactive"
              name="WeeksInactive"
              type="number"
              input={{ min: 0 }}
            />
          </InputBlock>
        </Collapsible>

        <Collapsible title="Financial">
          <InputBlock>
            <SelectField
              InputOptions={{
                menuPosition: 'absolute',
              }}
              label="Payment Method"
              name="PaymentMethodId"
              placeholder="Select a Payment Method"
              referenceOptions="LstPaymentTypes"
            />
          </InputBlock>
          <InputBlock>
            <TextField
              label="Weeks Until Expiration"
              name="WeeksUntilExpiration"
              type="number"
            />
          </InputBlock>

          <div>
            <label className="pt-label">Payment Amount</label>
          </div>
          <InputBlock>
            <TextField
              name="PaymentMinimumAmount"
              placeholder="Minimum"
              type="number"
              input={{ min: 0 }}
            />
            <TextField
              name="PaymentMaximumAmount"
              placeholder="Maximum"
              type="number"
              input={{ min: 0 }}
            />
          </InputBlock>
        </Collapsible>

        <Collapsible title="Demographic">
          <InputBlock>
            <SelectField
              InputOptions={{
                menuPosition: 'absolute',
              }}
              label="Gender"
              name="GenderId"
              placeholder="Select a Gender"
              referenceOptions="LstGenders"
            />
          </InputBlock>
          <InputBlock>
            <TextField
              label="Age Minimum"
              name="AgeMin"
              placeholder="Minimum"
              type="number"
              input={{ min: 0 }}
            />
            <TextField
              label="Age Maximum"
              name="AgeMax"
              placeholder="Maximum"
              type="number"
              input={{ min: 0 }}
            />
          </InputBlock>
        </Collapsible>

        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
          <button
            type="button"
            onClick={this.handleClearFilters}
            className="pt-button pt-intent-primary"
          >
            Clear Filters
          </button>
        </div>
      </form>
    );
  }
}

SmartListFilterForm = reduxForm({
  form: 'SmartListFilterForm', // a unique identifier for this form
  validate,
})(SmartListFilterForm);

const mapStateToProps = state => ({
  formState: state.form.SmartListFilterForm, // <== Inject the form store itself
  references: state.utility.references,
  styles: state.school.styles,
  token: state.token,
});

export default connect(
  SmartListFilterForm,
  mapStateToProps
);
