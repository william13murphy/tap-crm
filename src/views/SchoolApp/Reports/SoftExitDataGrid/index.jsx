import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { localCurrencyValue } from 'util/localization/localValues';
import './styles.less';

type SoftExitDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
};

class SoftExitDataGrid extends React.Component {
  props: SoftExitDataGridProps;
  state = {
    data: [],
    columns: [
      {
        Header: 'Full Name',
        accessor: 'FullName',
      },
      {
        Header: 'Date of Birth',
        accessor: 'DOB',
        Cell: rowInfo => (
          <span className="date">
            {moment(rowInfo.value).format('MMMM D, YYYY')}
          </span>
        ),
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
    ],
  };

  render() {
    if (this.props.data.length === 0) {
      return (
        <div className="StudentsUnpaidGrid">
          <h4>No Students Found</h4>
        </div>
      );
    }

    return (
      <div className="SoftExitDataGrid__container">
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
          className="SoftExitDataGrid linked-row"
          data={this.props.data}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default SoftExitDataGrid;
