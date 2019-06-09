import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import Modal from 'components/Modal';
import { getReferenceItemOptions } from 'api/referenceItems';
import { log } from 'log';

type ClockInOutFormProps = {
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  history: { push: any },
  clockInOut: {
    payload: string,
  },
  token: {
    payload: {
      UserName: string,
      SchoolId: string,
      UserId: string,
      TimeZone: string,
    },
  },
};

const validate = values => {
  const errors = {};
  return errors;
};

class ClockInOutForm extends React.Component {
  props: ClockInOutFormProps;
  constructor() {
    super();
    this.state = {
      clockedIn: false,
    };
  }
  onSubmit = formData => {
    log('Submit formData: ', formData);
    // this.props.dispatchFormPost(formData);
  };

  handleClockClick = () => {
    let clockInOutTypes = getReferenceItemOptions(
      'LstClockInOutTypes',
      this.props.references
    );

    let newStatus = null;

    let currentStatus = this.getClockInOutStatus();

    if (currentStatus && currentStatus.label === 'IN') {
      newStatus = clockInOutTypes.find(item => item.label == 'OUT');
    }

    if (!currentStatus || (currentStatus && currentStatus.label === 'OUT')) {
      newStatus = clockInOutTypes.find(item => item.label == 'IN');
    }

    const formData = {
      UserId: this.props.token.payload.UserId,
      SchoolId: this.props.schoolId,
      ClockInOutId: newStatus.value,
    };
    this.props.dispatchFormPost(formData);
  };

  getClockInOutStatus() {
    if (!this.props.clockInOut.payload) return null;

    let clockInOutTypes = getReferenceItemOptions(
      'LstClockInOutTypes',
      this.props.references
    );

    let matched = clockInOutTypes.find(
      item => item.value == this.props.clockInOut.payload
    );

    return matched;
  }

  render() {
    let currentStatus = this.getClockInOutStatus();

    const clockLabel =
      currentStatus && currentStatus.label === 'IN' ? 'Clock Out' : 'Clock In';

    const clockIntent =
      currentStatus && currentStatus.label === 'IN'
        ? 'pt-intent-danger'
        : 'pt-intent-success';

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <div className="pt-button-group">
          <button
            onClick={this.handleClockClick}
            className={`pt-button ${clockIntent}`}
          >
            {clockLabel}
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'clock-in-out', // a unique identifier for this form
  validate,
})(ClockInOutForm);
