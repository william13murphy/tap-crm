import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './styles.less';

const paginationOptions = {
  showPagination: false,
};

const filterOptions = {
  filterable: true,
  defaultFilterMethod: (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id])
          .toLowerCase()
          .includes(filter.value.toLowerCase())
      : true;
  },
};

type DefaultReactTableProps = {
  data: Array<{}>,
  history?: {}, // required to make a row or cell linkable by pushing to history onClick
};

class DefaultReactTable extends React.Component {
  props: DefaultReactTableProps;
  render() {
    const noFilter = this.props.noFilter ? null : filterOptions;
    return (
      <div>
        <div className="TotalRecordsCount">
          Total Number of Unfiltered records: {this.props.data.length}
        </div>
        <ReactTable
          {...paginationOptions}
          {...noFilter}
          defaultPageSize={this.props.data.length}
          minRows={0}
          {...this.props}
        />
      </div>
    );
  }
}

export default DefaultReactTable;
