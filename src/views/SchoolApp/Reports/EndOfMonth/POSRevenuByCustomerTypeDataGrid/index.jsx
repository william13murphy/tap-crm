import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type POSRevenuByCustomerTypeDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class POSRevenuByCustomerTypeDataGrid extends React.Component {
  props: POSRevenuByCustomerTypeDataGridProps;

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
        className="POSRevenuByCustomerTypeDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default POSRevenuByCustomerTypeDataGrid;
