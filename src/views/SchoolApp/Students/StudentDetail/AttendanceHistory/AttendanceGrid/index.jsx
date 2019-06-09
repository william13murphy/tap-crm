import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { Link } from 'react-router-dom';
import moment from 'moment';
import connect from 'src/redux/connect';
import {
  calculateLocalDateTimeFromUTCDateAndTime,
  getTimeZoneLabel,
} from 'src/util/localization/timezone';

import './styles.less';

type AttendanceGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  studentId: string,
};

class AttendanceGrid extends React.Component {
  props: AttendanceGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Program',
          accessor: 'StyleName',
        },
        {
          Header: 'Class',
          accessor: 'SchoolClassName',
        },
        {
          Header: 'Date',
          accessor: 'CreatedOn',
          Cell: props => (
            <span className="date">
              {props.value && moment(props.value).format('YYYY-MM-DD')}
            </span>
          ),
        },
        {
          Header: 'CheckIn Time',
          accessor: 'CheckInTimeUtc',
          Cell: row => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.state.schoolTimeZone,
              row.original.ClassDate,
              row.original.CheckInTimeUtc
            );
            return (
              <span className="date">
                {row.value && localDate.format('hh:mm a')}
              </span>
            );
          },
        },
      ],
    };
  }

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

  render() {
    if (this.props.data.payload.length === 0) {
      return (
        <div className="AttendanceGrid">
          <h4>No Attendance Found</h4>
        </div>
      );
    }
    return (
      <div className="AttendanceGrid">
        <DynamicHeightReactTable
          pageSize={this.props.data.payload.length}
          className="linked-row"
          data={this.props.data.payload}
          columns={this.state.columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push({
                pathname: `/app/school-app/${
                  this.props.match.params.schoolId
                }/dashboard/class-detail/${rowInfo.original.SchoolClassId}/${
                  rowInfo.original.ClassScheduleId
                }`,
                state: { initialValues: rowInfo.original },
              });
            },
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schoolProfile: state.school.profile,
    references: state.utility.references,
  };
};

export default connect(
  AttendanceGrid,
  mapStateToProps
);
