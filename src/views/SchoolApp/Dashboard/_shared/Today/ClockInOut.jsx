import React from 'react';

import connect from 'src/redux/connect';
import Module from 'components/Layout/Module';
import Modal from 'components/Modal';
import { getReferenceItemOptions } from 'api/referenceItems';
import { schoolClockInOutFetch } from 'src/redux/actionCreators/school/clockInOut';
import {
  calculateLocalDateTimeFromUTCDateAndTime,
  getTimeZoneLabel,
} from 'src/util/localization/timezone';

import moment from 'moment';

type ClockInOutModuleProps = {
  history: {},
  match: {
    path: string,
    params: {
      schoolId: string,
    },
  },
  location: Object,
  clockInOut: {
    payload: string,
  },
  dispatchSchoolClockInOutFetch: string,
  references: {},
};

class ClockInOutModule extends React.Component {
  props: ClockInOutModuleProps;

  componentWillMount() {
    this.setSchoolTimeZone();
  }

  setSchoolTimeZone() {
    let schoolTimeZone = getTimeZoneLabel(
      this.props.references,
      this.props.schoolProfile.payload.TimeZoneId
    );

    this.setState({
      schoolTimeZone,
    });
  }

  getClockInOutStatus = () => {
    if (!this.props.clockInOut.payload) return null;

    let clockInOutTypes = getReferenceItemOptions(
      'LstClockInOutTypes',
      this.props.references
    );

    let matched = clockInOutTypes.find(
      item => item.value == this.props.clockInOut.payload
    );
    let clockInOutStatus = { title: '', message: '' };

    let utcTime = moment.utc();

    let localTime = calculateLocalDateTimeFromUTCDateAndTime(
      this.state.schoolTimeZone,
      utcTime,
      utcTime
    ).format('MMMM Do, YYYY, h:mm:ss a');

    if (matched.label === 'OUT') {
      clockInOutStatus = {
        title: 'Clock Out',
        message: `You have been clocked out: ${localTime}`,
      };
    }
    if (matched.label === 'IN') {
      clockInOutStatus = {
        title: 'Clock In',
        message: `You are now clocked in: ${localTime}`,
      };
    }

    return clockInOutStatus;
  };

  render() {
    let clockInOutStatus = this.getClockInOutStatus();
    const schoolId = this.props.match.params.schoolId;
    return (
      <Module className="ClockInOutModule">
        <Modal
          title={clockInOutStatus.title}
          closeUrl={`/app/school-app/${schoolId}/dashboard/today`}
        >
          <h3>{clockInOutStatus.message}</h3>
        </Modal>
      </Module>
    );
  }
}
function mapStateToProps(state) {
  return {
    schoolProfile: state.school.profile,
    references: state.utility.references,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSchoolClockInOutFetch: userId => {
      dispatch(schoolClockInOutFetch(userId));
    },
  };
};

export default connect(
  ClockInOutModule,
  mapStateToProps,
  mapDispatchToProps
);
