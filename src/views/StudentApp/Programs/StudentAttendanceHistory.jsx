import React from 'react';
import DataCard from 'components/DataCard';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import tempAttendanceData from './tempAttendanceData';
import moment from 'moment';
import connect from 'react-redux';

class StudentAttendanceHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Program',
          accessor: 'StyleName',
        },
        {
          Header: 'Date',
          accessor: 'ClassDate',
          Cell: props => (
            <span className="date">
              {props.value && moment(props.value).format('YYYY-MM-DD')}
            </span>
          ),
        },
        {
          Header: 'Class',
          accessor: 'SchoolClassName',
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <DataCard title="Attendance History">
          <DefaultReactTable
            className="linked-row"
            pageSize={this.props.data.length}
            data={this.props.data}
            columns={this.state.columns}
          />
        </DataCard>
      </div>
    );
  }
}

export default StudentAttendanceHistory;
