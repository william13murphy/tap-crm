import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { localCurrencyValue } from 'util/localization/localValues';
import './styles.less';

type StudentsUnpaidGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
};

class StudentsUnpaidGrid extends React.Component {
  props: StudentsUnpaidGridProps;

  constructor() {
    super();
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Due Date',
          accessor: 'DueDate',
          Cell: rowInfo => (
            <span className="date">
              {moment(rowInfo.value).format('MMMM D, YYYY')}
            </span>
          ),
        },
        {
          Header: 'School Name',
          accessor: 'SchoolName',
        },
        {
          Header: 'Student Name',
          accessor: 'FirstName',
          Cell: row => {
            const fullName =
              row.original.FirstName + ' ' + row.original.LastName;
            return <span>{fullName}</span>;
          },
        },
        {
          Header: 'Account Holder',
          accessor: 'AccountHolderFirstName',
          Cell: row => {
            const fullName =
              row.original.AccountHolderFirstName +
              ' ' +
              row.original.AccountHolderLastName;
            return <span>{fullName}</span>;
          },
        },
        {
          Header: 'Amount Overdue',
          accessor: 'Amount',
          Cell: row => <span>{localCurrencyValue(row.value)}</span>,
        },
        {
          Header: 'Status',
          accessor: 'Status',
        },
        {
          Header: 'Actions',
          accessor: 'PlanId',
          Cell: row => (
            <Link
              to={`/app/school-app/${
                row.original.SchoolId
              }/students/plans/detail/${row.value}`}
              className="pt-button pt-intent-primary"
            >
              View Plan
            </Link>
          ),
        },
      ],
    };
  }
  render() {
    if (this.props.data.length === 0) {
      return (
        <div className="StudentsUnpaidGrid">
          <h4>No Students Found</h4>
        </div>
      );
    }

    return (
      <div className="StudentsUnpaidGrid__container">
        {/* Use this code when the back end fixes the Unpaid students data structure */}
        {/* <Link
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
        </Link> */}
        <DynamicHeightReactTable
          pageSize={this.props.data.length}
          className="StudentsUnpaidGrid linked-row has-action"
          data={this.props.data}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default StudentsUnpaidGrid;
