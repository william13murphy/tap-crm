import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type StudentsExitProgramDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class StudentsExitProgramDataGrid extends React.Component {
  props: StudentsExitProgramDataGridProps;

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
        className="StudentsExitProgramDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default StudentsExitProgramDataGrid;
