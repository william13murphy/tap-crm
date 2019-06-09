import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { localCurrencyValue } from 'util/localization/localValues';
import './styles.less';

type CartSummaryDataGridProps = {
  data: Array,
};

class CartSummaryDataGrid extends React.Component {
  props: CartSummaryDataGridProps;
  state = {
    columns: [
      {
        Header: 'Item Name',
        accessor: 'name',
        Cell: row => <div className="CartList__name">{row.value}</div>,
        sortable: false,
        filterable: false,
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        Cell: row => <div className="CartList__cell CellRight">{row.value}</div>,
        sortable: false,
        filterable: false,
      },
      {
        Header: 'Price',
        accessor: 'displayPrice',
        Cell: row => {
          const itemPrice = localCurrencyValue(
            row.original.price * row.original.quantity
          );
          return <div className="CartList__cell CellRight">{itemPrice}</div>;
        },
        sortable: false,
        filterable: false,
      },
    ],
    data: [],
    customer: {
      selected: null,
      details: {},
    },
  };

  componentWillMount() {
    let data = this.props.data;
    this.setState({ data });
  }

  componentWillReceiveProps(nextProps) {
    let data = [...this.props.data];
    this.setState({ data });
  }

  render() {
    return (
      <DefaultReactTable
        pageSize={this.props.data.length}
        className="CartSummaryDataGrid"
        data={this.state.data}
        columns={this.state.columns}
      />
    );
  }
}

export default CartSummaryDataGrid;
