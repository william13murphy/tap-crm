import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type StudentsAgeingDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class StudentsAgeingDataGrid extends React.Component {
  props: StudentsAgeingDataGridProps;

  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: '30 Days',
          accessor: 'ThirtyDays',
        },
        {
          Header: '60 Days',
          accessor: 'SixtyDays',
        },
        {
          Header: '90 Days',
          accessor: 'NintyDays',
        },
        {
          Header: '180 Days',
          accessor: 'OneEightyDays',
        },
        {
          Header: '365 Days',
          accessor: 'OneYear',
        },
        {
          Header: 'Above 365 Days',
          accessor: 'OverYear',
        },
      ],
    };
  }

  render() {
    return (
      <DefaultReactTable
        className="StudentsAgeingDataGrid"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}
export default StudentsAgeingDataGrid;
