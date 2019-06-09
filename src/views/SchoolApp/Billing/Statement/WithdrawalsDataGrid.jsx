import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import AccountingCell from 'components/Grid/AccountingCell';

type WithdrawalsDataGridProps = {
  schoolId: string,
  data: Array<{}>,
  history: {
    push: any,
  },
};

class WithdrawalsDataGrid extends React.Component {
  props: WithdrawalsDataGridProps;
  constructor() {
    super();
    this.state = {
      columns: [
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
        className="WithdrawalsDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  WithdrawalsDataGrid,
  mapStateToProps
);
