import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type StudentsExitDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class StudentsExitDataGrid extends React.Component {
  props: StudentsExitDataGridProps;

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
          Header: 'Total Count',
          accessor: 'TotalCount',
        },
      ],
    };
  }

  render() {
    return (
      <DefaultReactTable
        className="StudentsExitDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default StudentsExitDataGrid;
