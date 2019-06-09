import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import AccountingCell from 'components/Grid/AccountingCell';

type PaymentsReceivedDataGridProps = {
  schoolId: string,
  data: Array<{}>,
  history: {
    push: any,
  },
};

class PaymentsReceivedDataGrid extends React.Component {
  props: PaymentsReceivedDataGridProps;
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
          Header: 'PaymentType',
          accessor: 'PaymentType',
        },
        {
          Header: 'PaymentStatus',
          accessor: 'PaymentStatus',
        },
        {
          Header: 'Amount',
          accessor: 'Amount',
          Cell: row => <AccountingCell value={row.original.Amount} />,
        },
        {
          Header: 'Fees',
          accessor: 'Fees',
          Cell: row => <AccountingCell value={row.original.Fees} />,
        },
        {
          Header: 'Commission',
          accessor: 'Commission',
          Cell: row => <AccountingCell value={row.original.Commission} />,
        },
        {
          Header: 'Tax',
          accessor: 'Tax',
          Cell: row => <AccountingCell value={row.original.Tax} />,
        },
        {
          Header: 'Net',
          accessor: 'Net',
          Cell: row => <AccountingCell value={row.original.Net} />,
        },
      ],
    };
  }
  render() {
    return (
      <DefaultReactTable
        className="PaymentsReceivedDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  PaymentsReceivedDataGrid,
  mapStateToProps
);
