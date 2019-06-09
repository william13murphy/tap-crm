import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { localCurrencyValue } from 'util/localization/localValues';
import BlankPicture from 'assets/images/blank_picture.png';
import './styles.less';
import { cartUpdate } from 'src/redux/actionCreators/pos/cart';
import connect from 'src/redux/connect';

class AvailableItemsGrid extends React.Component {
  props: {
    active: string,
    updateData: Function,
    data: Array,
    cartData: Array,
  };
  state = {
    columns: [
      {
        Header: '',
        accessor: 'PictureBlobUrl',
        Cell: row => {
          return (
            <img
              src={row.original.properties.PictureBlobUrl || BlankPicture}
              width="40"
              height="40"
            />
          );
        },
        width: 50,
        filterable: false,
        sortable: false,
      },
      {
        Header: 'Item Name',
        accessor: 'name',
        width: '100%',
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: row => {
          return (
            <div className="CellRight">{localCurrencyValue(row.value)}</div>
          )
        },
        width: '100%',
      },
      {
        Header: 'Stock Left',
        accessor: 'stock',
        width: '100%',
        Cell: row => {
          return (
            <div className="CellRight">{row.value}</div>
          )
        },
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        Cell: row => {
          return (
            <div className="Quantity">
              <button
                onClick={() => this.onClickRemove(row)}
                type="button"
                className="pt-button pt-icon-small-minus pt-small"
              />

              <span>{row.value}</span>
              <button
                onClick={() => this.onClickAdd(row)}
                type="button"
                className="pt-button pt-icon-small-plus pt-small"
              />
            </div>
          );
        },
        width: '100%',
      },
    ],
  };

  onClickRemove = row => {
    let { data, cartData } = this.props;
    let item = data[row.index];
    if (item.quantity > 0) {
      item.quantity = --item.quantity;
      item.stock = ++item.stock;

      let matchedItem = cartData.find(element => item.id === element.id);

      let matchedItemIndex = cartData.findIndex(
        element => item.id === element.id
      );

      if (item.quantity === 0) {
        cartData.splice(matchedItemIndex, 1);
      }

      if (item.quantity > 0) {
        matchedItem.quantity = item.quantity;
        cartData[matchedItemIndex] = matchedItem;
      }

      this.props.dispatchCartUpdate(cartData);
    }
  };

  onClickAdd = row => {
    let { data, cartData } = this.props;
    let item = data[row.index];

    if (item.stock > 0) {
      item.quantity = ++item.quantity;
      item.stock = --item.stock;

      let matchedItem = cartData.find(element => item.id === element.id);
      let matchedItemIndex = cartData.findIndex(
        element => item.id === element.id
      );

      if (matchedItem) {
        matchedItem.quantity = item.quantity;
        cartData[matchedItemIndex] = matchedItem;
      }

      if (!matchedItem) {
        cartData.push(item);
      }

      this.props.dispatchCartUpdate(cartData);
    }
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
      <div className="AvailableItemsGrid">
        <DefaultReactTable
          className="linked-row has-action"
          pageSize={this.props.data.length}
          data={this.state.data}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchCartUpdate: data => {
      dispatch(cartUpdate(data));
    },
  };
};

export default connect(
  AvailableItemsGrid,
  mapStateToProps,
  mapDispatchToProps
);
