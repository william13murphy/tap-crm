import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type StudentsByStatusDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class StudentsByStatusDataGrid extends React.Component {
  props: StudentsByStatusDataGridProps;

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
          Header: 'Total Count',
          accessor: 'TotalCount',
        },
      ],
    };
  }

  render() {
    return (
      <DefaultReactTable
        className="StudentsByStatusDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default StudentsByStatusDataGrid;
