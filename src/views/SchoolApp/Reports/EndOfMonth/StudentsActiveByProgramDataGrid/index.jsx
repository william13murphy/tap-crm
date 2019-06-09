import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type StudentsActiveByProgramDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class StudentsActiveByProgramDataGrid extends React.Component {
  props: StudentsActiveByProgramDataGridProps;

  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Style Name',
          accessor: 'StyleName',
        },
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
        className="StudentsActiveByProgramDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default StudentsActiveByProgramDataGrid;
