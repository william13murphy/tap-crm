import React from 'react';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import connect from 'src/redux/connect';
import moment from 'moment';

import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';

import './styles.less';

type InventoryGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  studentId: string,
  schoolId: string,
  original: {
    StatusTypeId: string,
  },
};

class AttendanceByStyleByDateDataGrid extends React.Component {
  props: InventoryGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'FirstName',
          accessor: 'FirstName',
        },
        {
          Header: 'LastName',
          accessor: 'LastName',
        },
        {
          Header: 'Email',
          accessor: 'Email',
          Cell: row => (
            <div>
              <span className="SendEmail__cell" title="Send an Email">
                {row.value}
              </span>
            </div>
          ),
        },
        {
          Header: 'Phone Number',
          accessor: 'PhoneNumber',
          Cell: row => (
            <div>
              <span className="SendSMS__cell" title="Send a SMS">
                {row.value}
              </span>
            </div>
          ),
        },
        {
          Header: 'Status Type',
          accessor: 'StatusTypeId',
          Cell: props => {
            if (props.original.StatusTypeId) {
              return (
                <ReferenceOutput
                  listName="LstStudentStatusTypes"
                  id={props.original.StatusTypeId}
                  references={this.props.references}
                />
              );
            } else {
              return null;
            }
          },
          filterMethod: (filter, row) =>
            filterReferenceMethod(
              filter,
              row,
              this.props.references,
              'LstStudentStatusTypes',
              'StatusTypeId'
            ),
          Filter: filter,
        },
        {
          Header: 'Program Name',
          accessor: 'StyleName',
        },
        {
          Header: 'Enrollment Date',
          accessor: 'EnrollmentDate',
          Cell: row => {
            return moment(row.original.EnrollmentDate).format('YYYY-MM-DD');
          },
        },
        {
          Header: 'Class Required',
          accessor: 'ClassRequired',
        },
        {
          Header: 'Class Attended',
          accessor: 'ClassAttended',
        },
        {
          Header: 'Class Absent',
          accessor: 'ClassAbsent',
        },
        {
          Header: 'Absent Percent',
          accessor: 'AbsentPercent',
        },
      ],
    };
  }
  render() {
    const schoolId = this.props.match.params.schoolId;

    if (
      this.props.data &&
      this.props.data.payload &&
      this.props.data.payload.length === 0
    ) {
      return (
        <div className="InventoryGrid">
          <h4>No Attendance Report Found</h4>
        </div>
      );
    }

    return (
      <div className="InventoryGrid__container">
        <DynamicHeightReactTable
          pageSize={
            this.props.data && this.props.data.payload
              ? this.props.data.payload.length
              : 0
          }
          className="InventoryGrid linked-row"
          data={
            this.props.data &&
            this.props.data.payload &&
            this.props.data.payload
          }
          columns={this.state.columns}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              if (column.Header === 'Email') {
                this.props.history.push({
                  pathname: `/app/school-app/${schoolId}/reports/attendance-report/send-email`,

                  state: {
                    studentId: rowInfo.original.StudentId,
                    schoolId: rowInfo.original.SchoolId,
                    firstName: rowInfo.original.FirstName,
                    lastName: rowInfo.original.LastName,
                    prevPath: location.pathname,
                  },
                });
              } else if (column.Header === 'Phone Number') {
                this.props.history.push({
                  pathname: `/app/school-app/${schoolId}/reports/attendance-report/send-sms`,

                  state: {
                    studentId: rowInfo.original.StudentId,
                    schoolId: rowInfo.original.SchoolId,
                    firstName: rowInfo.original.FirstName,
                    lastName: rowInfo.original.LastName,
                    prevPath: location.pathname,
                  },
                });
              } else {
                this.props.history.push(
                  `/app/school-app/${schoolId}/students/detail/${
                    rowInfo.original.StudentId
                  }`
                );
              }
            },
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
  };
};

export default connect(
  AttendanceByStyleByDateDataGrid,
  mapStateToProps
);
