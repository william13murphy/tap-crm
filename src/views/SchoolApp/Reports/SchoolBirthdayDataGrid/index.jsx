import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import './styles.less';

type SchoolBirthdayDataGridProps = {
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

class SchoolBirthdayDataGrid extends React.Component {
  props: SchoolBirthdayDataGridProps;

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
          Header: 'Phone',
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
          Header: 'Date Of Birth',
          accessor: 'DOB',
          Cell: row => (
            <span className="date">
              {row.original.DOB &&
                moment(row.original.DOB).format('MMMM D, YYYY')}
            </span>
          ),
        },
      ],
    };
  }
  render() {
    if (this.props.data === 0) {
      return (
        <div className="SchoolBirthdayDataGrid">
          <h4>No Birthday Report Found</h4>
        </div>
      );
    }

    return (
      <div className="SchoolBirthdayDataGrid__container">
        <Link
          className="pt-button pt-icon-envelope"
          to={{
            pathname: `/app/school-app/${
              this.props.schoolId
            }/school-detail/messaging/outbox/compose`,
            //filtered students passed into this.props.location.state.filteredStudents
            state: {
              filteredStudents: this.props.data,
            },
          }}
        >
          &nbsp;Send Message
        </Link>
        <DynamicHeightReactTable
          pageSize={this.props.data.length}
          className="SchoolBirthdayDataGrid linked-row"
          data={this.props.data}
          columns={this.state.columns}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              if (column.Header === 'Email') {
                this.props.history.push({
                  pathname: `/app/school-app/${
                    this.props.schoolId
                  }/reports/birthday-report/send-email`,

                  state: {
                    studentId: rowInfo.original.StudentId,
                    schoolId: rowInfo.original.SchoolId,
                    firstName: rowInfo.original.FirstName,
                    lastName: rowInfo.original.LastName,
                    prevPath: location.pathname,
                  },
                });
              } else if (column.Header === 'Phone') {
                this.props.history.push({
                  pathname: `/app/school-app/${
                    this.props.schoolId
                  }/reports/birthday-report/send-sms`,

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
                  `/app/school-app/${this.props.schoolId}/students/detail/${
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
  SchoolBirthdayDataGrid,
  mapStateToProps
);
