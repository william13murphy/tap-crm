import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type LeadsByMarketingTypeDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class LeadsByMarketingTypeDataGrid extends React.Component {
  props: LeadsByMarketingTypeDataGridProps;

  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Marketing Type',
          accessor: 'MarketingTypeDesc',
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
        className="LeadsByMarketingTypeDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default LeadsByMarketingTypeDataGrid;
