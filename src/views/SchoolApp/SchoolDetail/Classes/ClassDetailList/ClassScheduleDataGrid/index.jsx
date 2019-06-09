import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import connect from 'src/redux/connect';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';

import NoDataMessage from 'components/DataLoading/NoDataMessage';
import moment from 'moment';
import {
  getTimeZoneLabel,
  calculateLocalDateTimeFromUTCDateAndTime,
} from 'util/localization/timezone';

import './styles.less';

type ClassScheduleDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  classScheduleData: {
    payload: [{}],
  },
};

class ClassScheduleDataGrid extends React.Component {
  props: ClassScheduleDataGridProps;
  constructor(props) {
    super(props);

    let schoolTimeZone = getTimeZoneLabel(
      this.props.references,
      this.props.schoolProfile.payload.TimeZoneId
    );

    this.state = {
      data: [],
      columns: [
        {
          Header: 'Date',
          accessor: 'Date',
          Cell: rowInfo => {
            return rowInfo.original.Date.slice(0, 10);
          },
        },
        {
          Header: 'Start Time',
          accessor: 'StartTimeUtc',
          Cell: rowInfo => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              schoolTimeZone,
              this.props.classScheduleData.payload.StartDate,
              rowInfo.original.StartTimeUtc
            );
            return (
              <span className="date">
                {rowInfo.value && localDate.format('h:mm a')}
              </span>
            );
          },
        },
        {
          Header: 'End Time',
          accessor: 'EndTimeUtc',
          Cell: rowInfo => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              schoolTimeZone,
              this.props.classScheduleData.payload.StartDate,
              rowInfo.original.EndTimeUtc
            );
            return (
              <span className="date">
                {rowInfo.value && localDate.format('h:mm a')}
              </span>
            );
          },
        },
        {
          Header: 'Attendance',
          accessor: 'TotalAttendance',
        },
        {
          Header: 'Status',
          accessor: 'StatusId',
          Cell: row => {
            if (this.props.classScheduleData.payload.Schedules) {
              return (
                <ReferenceOutput
                  listName="LstClassStatusTypes"
                  id={row.original.StatusId}
                />
              );
            } else {
              return null;
            }
          },
        },
      ],
    };
  }

  componentDidMount() {
    let classScheduleData = [];

    if (
      this.props.classScheduleData &&
      this.props.classScheduleData.payload &&
      this.props.classScheduleData.payload.Schedules
    ) {
      classScheduleData = this.props.classScheduleData.payload.Schedules.map(
        item => {
          return item;
        }
      );
    }

    let data = classScheduleData;

    this.setState({ data });
  }

  render() {
    if (this.state.data) {
      return (
        <DynamicHeightReactTable
          className="linked-row"
          data={this.state.data}
          pageSize={this.state.data.length}
          columns={this.state.columns}
          verticalBuffer={50}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push(
                `/app/school-app/${
                  this.props.schoolId
                }/dashboard/class-detail/${rowInfo.original.SchoolClassId}/${
                  rowInfo.original.Id
                }`
              );
            },
          })}
        />
      );
    } else {
      return <NoDataMessage errorMessage="No Class Schedules Found" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    classScheduleData: state.school.classDetail,
    references: state.utility.references,
    schoolProfile: state.school.profile,
  };
};

export default connect(
  ClassScheduleDataGrid,
  mapStateToProps
);
