import React from 'react';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type AccountSummaryDataGridProps = {
  schoolId: string,
  data: Array<{}>,
  history: {
    push: any,
  },
};

class AccountSummaryDataGrid extends React.Component {
  props: AccountSummaryDataGridProps;

  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'EFT',
          accessor: 'EFT',
        },
        {
          Header: 'Card',
          accessor: 'Card',
        },
        {
          Header: 'Merchant',
          accessor: 'Merchant',
        },
        {
          Header: 'Cash',
          accessor: 'Cash',
        },
        {
          Header: 'Total',
          accessor: 'Total',
        },
      ],
    };
  }
  render() {
    return (
      <DefaultReactTable
        className="AccountSummaryDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  AccountSummaryDataGrid,
  mapStateToProps
);
