import React from 'react';
import connect from 'src/redux/connect';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import SchoolLogoBlank from 'assets/images/school_logo_blank.png';

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
          accessor: 'LogoBlobUrl',
          Cell: row => {
            const profilePicture =
              row.original.PictureBlobUrl || SchoolLogoBlank;
            return <img src={profilePicture} width="40" height="40" />;
          },
          sortable: false,
          filterable: false,
          width: 53,
        },
        {
          Header: 'Name',
          accessor: 'Name',
        },
      ],
    };
  }
  render() {
    return (
      <DynamicHeightReactTable
        className="linked-row"
        data={this.props.data}
        columns={this.state.columns}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            this.props.history.push(
              `/app/school-app/${rowInfo.original.Id}/dashboard`
            );
          },
        })}
      />
    );
  }
}

const mapStateToProps = () => ({});

export default connect(
  StaffDataGrid,
  mapStateToProps
);
