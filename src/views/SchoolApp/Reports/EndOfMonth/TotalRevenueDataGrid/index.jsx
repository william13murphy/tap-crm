import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type TotalRevenueDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class TotalRevenueDataGrid extends React.Component {
  props: TotalRevenueDataGridProps;

  constructor() {
    super();
    this.state = {
      columns: [
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
        className="TotalRevenueDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default TotalRevenueDataGrid;
