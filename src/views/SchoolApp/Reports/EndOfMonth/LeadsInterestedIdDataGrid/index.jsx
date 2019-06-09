import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type LeadsInterestedIdDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class LeadsInterestedIdDataGrid extends React.Component {
  props: LeadsInterestedIdDataGridProps;

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
          Header: 'Total Count',
          accessor: 'TotalCount',
        },
      ],
    };
  }

  render() {
    return (
      <DefaultReactTable
        className="LeadsInterestedIdDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default LeadsInterestedIdDataGrid;
