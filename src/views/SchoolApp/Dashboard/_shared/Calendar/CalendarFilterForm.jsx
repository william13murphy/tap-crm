import React from 'react';
import { reduxForm } from 'redux-form';

import connect from 'src/redux/connect';

import SwitchField from 'components/Forms/SwitchField';
import { roles } from 'util/auth/roles';

type CalendarFilterFormProps = {
  schoolId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  instructors: {
    payload: [],
  },
  role: string,
  checkedUserClass: boolean,
  checkedUserAppointment: boolean,
  handleFormValuesChange: Function,
  formState: {
    values: {},
  },
};

const validate = values => {
  const errors = {};

  return errors;
};

class CalendarFilterForm extends React.Component {
  props: CalendarFilterFormProps;
  onSubmit = formData => {};

  componentWillReceiveProps(nextProps) {
    this.props.handleFormValuesChange(nextProps.formState.values);
  }

  getWeeksSelect = () => {
    return Array.from(new Array(53), (val, i) => {
      return {
        label: i.toString(),
        value: i,
      };
    });
  };
  render() {
    return (
      <form
        className="Calendar__FiltersForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <h1 className="Calendar__FiltersForm__title">Filter By</h1>

        <div className="SmartList__columns">
          <h3>My Calendar</h3>
          <SwitchField
            label="Classes"
            name="UserClass"
            checked={this.props.checkedUserClass}
          />
          <SwitchField
            label="Appointments"
            name="UserAppointment"
            checked={this.props.checkedUserAppointment}
          />
        </div>

        {this.props.role !== roles.INSTRUCT && (
          <div className="SmartList__columns">
            <h3>Staff Calendars</h3>
            {this.props.instructors.payload &&
              this.props.instructors.payload.map((instructor, i) => (
                <SwitchField
                  key={i}
                  label={`${instructor.User.Profile.FirstName}  ${
                    instructor.User.Profile.LastName
                  }`}
                  name={`Instructors[${instructor.UserId}]`}
                />
              ))}
          </div>
        )}

        <div className="FormButtonsContainer" />
      </form>
    );
  }
}

const CalendarFilter = reduxForm({
  form: 'calendar-filter', // a unique identifier for this form
  validate,
})(CalendarFilterForm);

const mapStateToProps = state => ({
  role: state.token.payload.Role,
  formState: state.form['calendar-filter'], // <== Inject the form store itself
});

export default connect(
  CalendarFilter,
  mapStateToProps
);
