import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import { getReferenceItemOptions } from 'api/referenceItems';

import DefaultReactTable from 'components/Grid/DefaultReactTable';
import './styles.less';

type NoShowGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  references: {},
};

class NoShowGrid extends React.Component {
  props: NoShowGridProps;

  constructor() {
    super();
    this.state = {
      data: [],
      columns: [
        {
          Header: 'First Name',
          accessor: 'FirstName',
        },
        {
          Header: 'Last Name',
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
          accessor: 'Phone',
          Cell: row => (
            <div>
              <span className="SendSMS__cell" title="Send a SMS">
                {row.value}
              </span>
            </div>
          ),
        },
        {
          Header: 'Weeks Absent',
          accessor: 'weeksAbsent',
        },
        {
          Header: 'StudentStatus',
          accessor: 'StudentStatus',
          Cell: props => {
            if (props.original.StudentStatus) {
              let studentStatus = getReferenceItemOptions(
                'LstStudentStatusTypes',
                this.props.references
              ).find(item => item.Code === props.original.StudentStatus);
              return studentStatus.label;
            }
          },
        },
      ],
    };
  }
  render() {
    if (this.props.data.length === 0) {
      return (
        <div className="NoShowGrid">
          <h4>No Leads Found</h4>
        </div>
      );
    }

    return (
      <div className="NoShowGrid__container">
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
        <DefaultReactTable
          pageSize={this.props.data.length}
          className="NoShowGrid linked-row"
          data={this.props.data}
          columns={this.state.columns}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              if (column.Header === 'Email') {
                this.props.history.push({
                  pathname: `/app/school-app/${
                    this.props.schoolId
                  }/reports/no-show/send-email`,

                  state: {
                    studentId: rowInfo.original.StudentId,
                    firstName: rowInfo.original.FirstName,
                    lastName: rowInfo.original.LastName,
                    prevPath: location.pathname,
                  },
                });
              } else if (column.Header === 'Phone') {
                this.props.history.push({
                  pathname: `/app/school-app/${
                    this.props.schoolId
                  }/reports/no-show/send-sms`,

                  state: {
                    studentId: rowInfo.original.StudentId,
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

function mapStateToProps(state) {
  return {
    token: state.token,
    references: state.utility.references,
  };
}

export default connect(
  NoShowGrid,
  mapStateToProps
);
