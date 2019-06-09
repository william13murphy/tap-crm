import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import AccountingCell from 'components/Grid/AccountingCell';

type PaymentsMadeDataGridProps = {
  schoolId: string,
  data: Array<{}>,
  history: {
    push: any,
  },
};

class PaymentsMadeDataGrid extends React.Component {
  props: PaymentsMadeDataGridProps;

  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Creditor Name',
          accessor: 'CreditorName',
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
        className="PaymentsMadeDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  PaymentsMadeDataGrid,
  mapStateToProps
);
