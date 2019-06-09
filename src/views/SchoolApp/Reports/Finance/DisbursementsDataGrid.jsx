import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import connect from 'src/redux/connect';
import moment from 'moment';
import './styles.less';

type DisbursementsDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  studentId: string,
  schoolId: string,
  original: {
    StatusTypeId: string,
  },
};

class DisbursementsDataGrid extends React.Component {
  props: DisbursementsDataGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Amount',
          accessor: 'Amount',
        },
        {
          Header: 'Status',
          accessor: 'Status',
        },
      ],
    };
  }
  render() {
    if (
      this.props.data &&
      this.props.data.payload &&
      this.props.data.payload.length === 0
    ) {
      return (
        <div className="InventoryGrid">
          <h4>No Birthday Report Found</h4>
        </div>
      );
    }
    return (
      <div className="InventoryGrid">
        <DynamicHeightReactTable
          pageSize={
            this.props.data && this.props.data.payload
              ? this.props.data.payload.length
              : 0
          }
          className="linked-row"
          data={
            this.props.data &&
            this.props.data.payload &&
            this.props.data.payload
          }
          columns={this.state.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
  };
};

export default connect(DisbursementsDataGrid, mapStateToProps);
