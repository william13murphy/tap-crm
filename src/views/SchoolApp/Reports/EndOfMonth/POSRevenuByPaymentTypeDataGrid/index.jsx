import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type POSRevenuByPaymentTypeDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class POSRevenuByPaymentTypeDataGrid extends React.Component {
  props: POSRevenuByPaymentTypeDataGridProps;

  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Description',
          accessor: 'Description',
        },
        {
          Header: 'Month Name',
          accessor: 'MonthName',
        },
        {
          Header: 'Year',
          accessor: 'Year',
        },
        {
          Header: 'Total Revenue',
          accessor: 'TotalRevenue',
        },
      ],
    };
  }

  render() {
    return (
      <DefaultReactTable
        className="POSRevenuByPaymentTypeDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default POSRevenuByPaymentTypeDataGrid;
