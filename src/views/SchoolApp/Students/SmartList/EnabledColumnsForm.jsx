import React from 'react';
import { reduxForm } from 'redux-form';
import SwitchField from 'components/Forms/SwitchField';
import Collapsible from 'components/Collapsible';
import connect from 'src/redux/connect';
import SubmitButton from 'components/Forms/SubmitButton';
import Spinner from 'components/DataLoading/Spinner';

type EnabledColumnsFormProps = {
  schoolId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  initialValues: string, // All formData is passed in as initialValues.
};

class EnabledColumnsForm extends React.Component {
  props: EnabledColumnsFormProps;
  constructor(props) {
    super(props);
    this.state = {
      FirstName: true,
      LastName: true,
      Email: true,
      PhoneNumber: true,
      StatusTypeId: true,
      SchoolId: false,
      StudentId: false,
      UserId: false,
      BarCode: false,
      Address1: false,
      Address2: false,
      City: false,
      County: false,
      State: false,
      Zip: false,
      CountryId: false,
      MobileNumber: false,
      Programs: false,
      LastAttended: false,
      AgeInYears: false,
      Dob: false,
      WeeksUntilBirthDay: false,
    };
  }

  onSubmit = formData => {
    this.props.handleColumnsChange(formData);
  };

  componentWillReceiveProps(props) {
    if (!this.props.initialized) {
      this.props.initialize({
        ...this.state,
      });
    }
  }

  render() {
    return (
      <form
        className="SmartList__ColumnsForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <div className="SmartList__columns">
          <Collapsible title="Table Columns">
            <SwitchField
              label="First Name"
              name="FirstName"
              checked={this.state.FirstName}
              onClick={() => {
                this.setState({ FirstName: !this.state.FirstName });
              }}
            />
            <SwitchField
              label="Last Name"
              name="LastName"
              checked={this.state.LastName}
              onClick={() => {
                this.setState({ LastName: !this.state.LastName });
              }}
            />
            <SwitchField
              label="Email"
              name="Email"
              checked={this.state.Email}
              onClick={() => {
                this.setState({ Email: !this.state.Email });
              }}
            />
            <SwitchField
              label="Phone Number"
              name="PhoneNumber"
              checked={this.state.PhoneNumber}
              onClick={() => {
                this.setState({ PhoneNumber: !this.state.PhoneNumber });
              }}
            />
            <SwitchField
              label="Status Type"
              name="StatusTypeId"
              checked={this.state.StatusTypeId}
              onClick={() => {
                this.setState({ StatusTypeId: !this.state.StatusTypeId });
              }}
            />
            <SwitchField
              label="School Id"
              name="SchoolId"
              checked={this.state.SchoolId}
              onClick={() => {
                this.setState({ SchoolId: !this.state.SchoolId });
              }}
            />
            <SwitchField
              label="Student Id"
              name="StudentId"
              checked={this.state.StudentId}
              onClick={() => {
                this.setState({ StudentId: !this.state.StudentId });
              }}
            />
            <SwitchField
              label="User Id"
              name="UserId"
              checked={this.state.UserId}
              onClick={() => {
                this.setState({ UserId: !this.state.UserId });
              }}
            />
            <SwitchField
              label="Bar Code"
              name="BarCode"
              checked={this.state.BarCode}
              onClick={() => {
                this.setState({ BarCode: !this.state.BarCode });
              }}
            />
            <SwitchField
              label="Address 1"
              name="Address1"
              checked={this.state.Address1}
              onClick={() => {
                this.setState({ Address1: !this.state.Address1 });
              }}
            />
            <SwitchField
              label="Address 2"
              name="Address2"
              checked={this.state.Address2}
              onClick={() => {
                this.setState({ Address2: !this.state.Address2 });
              }}
            />
            <SwitchField
              label="City"
              name="City"
              checked={this.state.City}
              onClick={() => {
                this.setState({ City: !this.state.City });
              }}
            />
            <SwitchField
              label="County"
              name="County"
              checked={this.state.County}
              onClick={() => {
                this.setState({ County: !this.state.County });
              }}
            />
            <SwitchField
              label="State"
              name="State"
              checked={this.state.State}
              onClick={() => {
                this.setState({ State: !this.state.State });
              }}
            />
            <SwitchField
              label="Zip"
              name="Zip"
              checked={this.state.Zip}
              onClick={() => {
                this.setState({ Zip: !this.state.Zip });
              }}
            />
            <SwitchField
              label="Country"
              name="CountryId"
              checked={this.state.CountryId}
              onClick={() => {
                this.setState({ CountryId: !this.state.CountryId });
              }}
            />
            <SwitchField
              label="Mobile Number"
              name="MobileNumber"
              checked={this.state.MobileNumber}
              onClick={() => {
                this.setState({ MobileNumber: !this.state.MobileNumber });
              }}
            />
            <SwitchField
              label="Programs"
              name="Programs"
              checked={this.state.Programs}
              onClick={() => {
                this.setState({ Programs: !this.state.Programs });
              }}
            />
            <SwitchField
              label="Last Attended"
              name="LastAttended"
              checked={this.state.LastAttended}
              onClick={() => {
                this.setState({ LastAttended: !this.state.LastAttended });
              }}
            />
            <SwitchField
              label="Age In Years"
              name="AgeInYears"
              checked={this.state.AgeInYears}
              onClick={() => {
                this.setState({ AgeInYears: !this.state.AgeInYears });
              }}
            />
            <SwitchField
              label="Dob"
              name="Dob"
              checked={this.state.Dob}
              onClick={() => {
                this.setState({ Dob: !this.state.Dob });
              }}
            />
            <SwitchField
              label="Weeks Until Birthday"
              name="WeeksUntilBirthDay"
              checked={this.state.WeeksUntilBirthDay}
              onClick={() => {
                this.setState({
                  WeeksUntilBirthDay: !this.state.WeeksUntilBirthDay,
                });
              }}
            />
            <div className="FormButtonsContainer">
              <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
              {/* <button
                type="button"
                onClick={this.props.reset}
                className="pt-button pt-intent-primary"
              >
                Reset Columns
              </button> */}
            </div>
          </Collapsible>
        </div>
      </form>
    );
  }
}

EnabledColumnsForm = reduxForm({
  form: 'enabledColumns', // a unique identifier for this form
})(EnabledColumnsForm);

const mapStateToProps = state => ({
  formState: state.form.enabledColumns, // <== Inject the form store itself
});

export default connect(
  EnabledColumnsForm,
  mapStateToProps
);
