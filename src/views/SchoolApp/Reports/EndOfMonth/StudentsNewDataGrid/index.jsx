import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type StudentsNewDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class StudentsNewDataGrid extends React.Component {
  props: StudentsNewDataGridProps;

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
        className="StudentsNewDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default StudentsNewDataGrid;
