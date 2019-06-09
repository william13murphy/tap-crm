import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type LeadsStatusDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class LeadsStatusDataGrid extends React.Component {
  props: LeadsStatusDataGridProps;

  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Lead Status',
          accessor: 'LeadStatusDesc',
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
        className="LeadsStatusDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default LeadsStatusDataGrid;
