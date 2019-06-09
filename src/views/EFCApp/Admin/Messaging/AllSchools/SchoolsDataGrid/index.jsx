import React from 'react';
import connect from 'src/redux/connect';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';

type SchoolsDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
};

class SchoolsDataGrid extends React.Component {
  props: SchoolsDataGridProps;
  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Email',
        accessor: 'Email',
      },
      {
        Header: 'Telephone',
        accessor: 'PrimaryPhone',
      },
    ];
    return (
      <DynamicHeightReactTable
        className="linked-row"
        data={this.props.data.payload}
        columns={columns}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            this.props.history.push(
              `/app/admin/messaging/detail/${rowInfo.original.Id}`
            );
          },
        })}
      />
    );
  }
}

export default connect(SchoolsDataGrid);
