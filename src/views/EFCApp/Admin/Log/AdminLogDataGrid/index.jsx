import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';

type AdminLogDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
};

class AdminLogDataGrid extends React.Component {
  props: AdminLogDataGridProps;
  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Created On',
          accessor: 'CreatedOn',
        },
        {
          Header: 'User',
          accessor: 'UserId',
        },
        {
          Header: 'Event',
          accessor: 'Data',
        },
      ],
    };
  }
  render() {
    return (
      <DynamicHeightReactTable
        data={this.props.data.payload}
        columns={this.state.columns}
      />
    );
  }
}

export default AdminLogDataGrid;
