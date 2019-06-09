import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import AccountingCell from 'components/Grid/AccountingCell';

type CommissionsReceivedDataGridProps = {
  schoolId: string,
  data: Array<{}>,
  history: {
    push: any,
  },
};

class CommissionsReceivedDataGrid extends React.Component {
  props: CommissionsReceivedDataGridProps;

  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Payer Name',
          accessor: 'PayerName',
        },
        {
          Header: 'Date',
          accessor: 'Date',
          Cell: row => (
            <div>{moment(row.original.Date).format('MMMM D, YYYY')}</div>
          ),
        },
        {
          Header: 'Net',
          accessor: 'Net',
          Cell: row => <AccountingCell value={row.original.Amount} />,
        },
      ],
    };
  }
  render() {
    return (
      <DefaultReactTable
        className="CommissionsReceivedDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  CommissionsReceivedDataGrid,
  mapStateToProps
);
