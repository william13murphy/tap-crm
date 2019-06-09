import React from 'react';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import styleVariables from 'styles/_variables';
import { log } from 'log';

type CheckIntoClassFormProps = {
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

class CheckIntoClassForm extends React.Component {
  props: CheckIntoClassFormProps;
  constructor() {
    super();
    this.state = {
      checkedIn: false,
    };
  }
  onSubmit = formData => {
    log('Submit formData: ', formData);
    // this.props.dispatchFormPost(formData);
  };
  handleClockClick = () => {
    if (!this.state.checkedIn) {
      this.setState({
        checkedIn: true,
      });
      alert(
        `You are now checked in: ${moment().format('MMMM Do, YYYY, h:mm a')}`
      );
    }
  };
  renderCheckInComponent() {
    if (this.state.checkedIn) {
      return (
        <div
          className="pt-callout pt-intent-success"
          style={{ display: 'inline-block' }}
        >
          <h4>
            <strong>Checked In:</strong>{' '}
            {moment().format('dddd, MMMM DD, YYYY, h:mm a')}
          </h4>
        </div>
      );
    } else {
      return (
        <button
          onClick={this.handleClockClick}
          className="pt-button pt-intent-primary"
        >
          Attend This Class
        </button>
      );
    }
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <div>{this.renderCheckInComponent()}</div>

        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
          */}
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'check-into-class', // a unique identifier for this form
  validate,
})(CheckIntoClassForm);
