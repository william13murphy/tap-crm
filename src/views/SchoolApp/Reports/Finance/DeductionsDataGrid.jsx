import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import connect from 'src/redux/connect';
import moment from 'moment';

import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import './styles.less';

type DeductionsDataGridProps = {
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

class DeductionsDataGrid extends React.Component {
  props: DeductionsDataGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Amount',
          accessor: 'Amount',
        },
        {
          Header: 'ApplySalesTax',
          accessor: 'ApplySalesTax',
          Cell: rowInfo => {
            if (rowInfo.value == true) {
              return 'Yes';
            } else {
              return 'No';
            }
          },
          filterMethod: (filter, row) => {
            let obj = {
              ...row,
              ApplySalesTax: row.ApplySalesTax == true ? 'Yes' : 'No',
            };
            return filterPayloadMethod(filter, obj, 'ApplySalesTax');
          },
          Filter: filter,
        },
        {
          Header: 'Description',
          accessor: 'Description',
        },
        {
          Header: 'DateDue',
          accessor: 'DateDue',
          Cell: rowInfo => {
            return moment(rowInfo.value).format('YYYY-MM-DD');
          },
          filterMethod: (filter, row) => {
            let obj = {
              ...row,
              DateDue: moment(row.DateDue).format('YYYY-MM-DD'),
            };

            return filterPayloadMethod(filter, obj, 'DateDue');
          },
          Filter: filter,
        },
        {
          Header: 'SalesTaxRate',
          accessor: 'SalesTaxRate',
        },
        {
          Header: 'SalesTax',
          accessor: 'SalesTax',
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

export default connect(
  DeductionsDataGrid,
  mapStateToProps
);
