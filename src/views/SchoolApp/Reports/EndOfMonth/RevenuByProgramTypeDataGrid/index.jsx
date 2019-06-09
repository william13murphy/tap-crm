import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type RevenuByProgramTypeDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class RevenuByProgramTypeDataGrid extends React.Component {
  props: RevenuByProgramTypeDataGridProps;

  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Style Name',
          accessor: 'StyleName',
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
        className="RevenuByProgramTypeDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default RevenuByProgramTypeDataGrid;
