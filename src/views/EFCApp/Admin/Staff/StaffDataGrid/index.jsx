import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import AvatarBlank from 'assets/images/avatar_blank.png';

type StaffDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
};

class StaffDataGrid extends React.Component {
  props: StaffDataGridProps;
  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: '',
          accessor: 'PictureBlobUrl',
          Cell: row => {
            const profilePicture = row.original.PictureBlobUrl || AvatarBlank;
            return <img src={profilePicture} width="40" height="40" />;
          },
          sortable: false,
          filterable: false,
          width: 53,
        },
        {
          Header: 'First Name',
          accessor: 'FirstName',
        },
        {
          Header: 'Last Name',
          accessor: 'LastName',
        },
        {
          Header: 'Email',
          accessor: 'Email',
        },
      ],
    };
  }
  render() {
    return (
      <DynamicHeightReactTable
        className="linked-row"
        data={this.props.data.payload}
        columns={this.state.columns}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            this.props.history.push(
              `/app/admin/staff/detail/${rowInfo.original.Id}`
            );
          },
        })}
      />
    );
  }
}

export default StaffDataGrid;
