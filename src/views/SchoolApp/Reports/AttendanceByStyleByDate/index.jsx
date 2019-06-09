import React from 'react';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { attendanceByStyleByDateReportReset } from 'src/redux/actionCreators/report/attendanceByStyleByDateReport';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import DateField from 'components/Forms/DateField';
import { log } from 'log';
import './styles.less';

type AttendanceByStyleByDateProps = {
  schoolId: string,
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
  schoolStyles: [{}],
  dispatchattendanceByStyleByDateReportReset: Function,
};

const validate = values => {
  const errors = {};
  if (!values.SchoolStyleId) {
    errors.SchoolStyleId = 'Please select a program.';
  }
  if (!values.StartDate) {
    errors.StartDate = 'Please select start date.';
  }
  if (!values.EndDate) {
    errors.EndDate = 'Please select end date.';
  } else if (!moment(values.EndDate).isSameOrAfter(values.StartDate)) {
    errors.EndDate = 'End Date can not be less than Start Date';
  }
  return errors;
};

class AttendanceByStyleByDate extends React.Component {
  props: AttendanceByStyleByDateProps;
  onSubmit = formData => {
    formData.SchoolId = this.props.schoolId;

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };
  componentWillUnmount() {
    this.props.dispatchattendanceByStyleByDateReportReset();
  }

  render() {
    return (
      <form
        className="AttendanceByStyleByDate"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <InputBlock>
          <SelectField
            label="Program*"
            name="SchoolStyleId"
            placeholder="Select a Program"
            id="Program"
            className="SelectProgram"
            help={true}
            required={true}
            options={
              this.props.schoolStyles &&
              this.props.schoolStyles.payload &&
              this.props.schoolStyles.payload.map(item => {
                return {
                  label: item.Name,
                  value: item.Id,
                };
              })
            }
          />
          <DateField
            past
            label="Start Date*"
            name="StartDate"
            id="StartDate"
            placeholder="Select a Start Date"
            help={true}
          />
          <DateField
            past
            label="End Date*"
            name="EndDate"
            id="EndDate"
            placeholder="Select a End Date"
            help={true}
          />
        </InputBlock>
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
          {this.props.attendanceByStyleByDateReport &&
            this.props.attendanceByStyleByDateReport.payload !== null &&
            this.props.attendanceByStyleByDateReport.payload.length !== 0 && (
              <Link
                className="pt-button pt-icon-envelope"
                to={{
                  pathname: `/app/school-app/${
                    this.props.schoolId
                  }/school-detail/messaging/outbox/compose`,
                  //filtered students passed into this.props.location.state.filteredStudents
                  state: {
                    filteredStudents: this.props.attendanceByStyleByDateReport
                      .payload,
                  },
                }}
              >
                &nbsp;Send Message
              </Link>
            )}
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    attendanceByStyleByDateReport: state.report.attendanceByStyleByDateReport,
    schoolStyles: state.school.styles,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchattendanceByStyleByDateReportReset: data => {
      dispatch(attendanceByStyleByDateReportReset(data));
    },
  };
};
const connectedAttendanceByStyleByDate = connect(
  AttendanceByStyleByDate,
  mapStateToProps,
  mapDispatchToProps
);
export default reduxForm({
  form: 'attendance-school-report-form', // a unique identifier for this form
  validate,
})(connectedAttendanceByStyleByDate);
