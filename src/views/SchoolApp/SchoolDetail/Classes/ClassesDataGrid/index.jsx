import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import connect from 'src/redux/connect';
import moment from 'moment';
import { getReferenceItemOptions } from 'api/referenceItems';
import {
  getTimeZoneLabel,
  calculateLocalDateTimeFromUTCDateAndTime,
} from 'src/util/localization/timezone';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import { localDateFormat } from 'util/localization/localValues';
import './styles.less';

type ClassesDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  references: {},
  schoolId: string,
  match: {
    path: string,
    url: string,
  },
};

class ClassesDataGrid extends React.Component {
  props: ClassesDataGridProps;
  state = {
    data: [],
    columns: [
      {
        Header: 'Program',
        accessor: 'SchoolStyleId',
        Cell: rowInfo => {
          let style = this.state.schoolStyles.find(
            item => item.Id === rowInfo.original.SchoolStyleId
          );
          return style.Name;
        },
        filterMethod: (filter, row) => {
          if (filter.value === 'All') {
            return row;
          } else if (filter.value === row.SchoolStyleId) {
            return row;
          }
        },
        Filter: ({ filter, onChange }) => {
          return (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: '100%' }}
              value={filter ? filter.value : 'All'}
            >
              <option value="All">All</option>
              {this.state.schoolStyles.map(item => (
                <option key={item.Id} value={item.Id}>
                  {item.Name}
                </option>
              ))}
            </select>
          );
        },
      },
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Day of the Week',
        accessor: 'DayOfWeek',
      },
      {
        Header: 'Start Date',
        accessor: 'StartDate',
        Cell: rowInfo => {
          let localDateTime = calculateLocalDateTimeFromUTCDateAndTime(
            this.state.schoolTimeZone,
            rowInfo.original.StartDate,
            rowInfo.original.StartTimeUtc
          );
          return (
            <span className="date">
              {rowInfo.value && localDateTime.format(localDateFormat())}
            </span>
          );
        },
        filterMethod: (filter, row) => {
          let localDate = calculateLocalDateTimeFromUTCDateAndTime(
            this.state.schoolTimeZone,
            row._original.StartDate,
            row._original.StartTimeUtc
          );
          let obj = {
            ...row,
            StartDate: localDate.format(localDateFormat()),
          };

          return filterPayloadMethod(filter, obj, 'StartDate');
        },
        Filter: filter,
      },
      {
        Header: 'End Date',
        accessor: 'EndDate',
        Cell: rowInfo => {
          let localDate = calculateLocalDateTimeFromUTCDateAndTime(
            this.state.schoolTimeZone,
            rowInfo.original.EndDate,
            rowInfo.original.EndTimeUtc
          );
          return (
            <span className="date">
              {rowInfo.value &&
                rowInfo.value != '9999-12-31T00:00:00' &&
                localDate.format(localDateFormat())}
            </span>
          );
        },
        filterMethod: (filter, row) => {
          let localDate = calculateLocalDateTimeFromUTCDateAndTime(
            this.state.schoolTimeZone,
            row._original.EndDate,
            row._original.EndTimeUtc
          );
          let obj = {
            ...row,
            EndDate: localDate.format(localDateFormat()),
          };

          return filterPayloadMethod(filter, obj, 'EndDate');
        },
        Filter: filter,
      },
      {
        Header: 'Start Time',
        accessor: 'StartTimeUtc',
        Cell: rowInfo => {
          let localDate = calculateLocalDateTimeFromUTCDateAndTime(
            this.state.schoolTimeZone,
            rowInfo.original.StartDate,
            rowInfo.original.StartTimeUtc
          );

          return (
            <span className="date">
              {rowInfo.value && localDate.format('hh:mm a')}
            </span>
          );
        },
        filterMethod: (filter, row) => {
          let localDate = calculateLocalDateTimeFromUTCDateAndTime(
            this.state.schoolTimeZone,
            row.StartDate,
            row.StartTimeUtc
          );
          let obj = {
            ...row,
            StartTimeUtc: localDate.format('hh:mm a'),
          };

          return filterPayloadMethod(filter, obj, 'StartTimeUtc');
        },
        Filter: filter,
      },
      {
        Header: 'End Time',
        accessor: 'EndTimeUtc',
        Cell: rowInfo => {
          let localDate = calculateLocalDateTimeFromUTCDateAndTime(
            this.state.schoolTimeZone,
            rowInfo.original.StartDate,
            rowInfo.original.EndTimeUtc
          );
          return (
            <span className="date">
              {rowInfo.value && localDate.format('hh:mm a')}
            </span>
          );
        },
        filterMethod: (filter, row) => {
          let localDate = calculateLocalDateTimeFromUTCDateAndTime(
            this.state.schoolTimeZone,
            row.EndDate,
            row.EndTimeUtc
          );
          let obj = {
            ...row,
            EndTimeUtc: localDate.format('hh:mm a'),
          };

          return filterPayloadMethod(filter, obj, 'EndTimeUtc');
        },
        Filter: filter,
      },
      {
        Header: 'Maximum Students',
        accessor: 'MaximumStudents',
      },
      {
        Header: 'Frequency Type',
        accessor: 'FrequencyTypeId',
        Cell: rowInfo => {
          let frequencyTypeList = getReferenceItemOptions(
            'LstFrequencyTypes',
            this.props.references
          );

          let matchedFrequency = frequencyTypeList.find(
            item => item.value === rowInfo.value
          );

          return (
            <span className="status">
              {rowInfo.value && matchedFrequency && matchedFrequency.label}
            </span>
          );
        },
        filterMethod: (filter, row) =>
          filterReferenceMethod(
            filter,
            row,
            this.props.references,
            'LstFrequencyTypes',
            'FrequencyTypeId'
          ),
        Filter: filter,
      },
    ],
  };

  componentWillMount() {
    this.setSchoolTimeZone();

    let dataWithDayOfWeek = [];
    if (this.props.data) {
      dataWithDayOfWeek = this.props.data.map(item => {
        return { ...item, DayOfWeek: moment(item.StartDate).format('dddd') };
      });
    }
    this.setState({
      data: dataWithDayOfWeek,
      schoolStyles: this.props.schoolStyles.payload,
    });
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
    if (this.state.data.length === 0) {
      return (
        <div className="ClassesDataGrid">
          <h4>No Classes Found</h4>
        </div>
      );
    }

    return (
      <DynamicHeightReactTable
        pageSize={this.props.data.length}
        className="ClassesDataGrid linked-row"
        data={this.state.data}
        columns={this.state.columns}
        filterable={true}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            this.props.history.push(
              `/app/school-app/${
                this.props.schoolId
              }/school-detail/classes/class-detail/${rowInfo.original.Id}`
            );
          },
        })}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    references: state.utility.references,
    schoolStyles: state.school.styles,
    schoolProfile: state.school.profile,
  };
}

export default connect(
  ClassesDataGrid,
  mapStateToProps
);
