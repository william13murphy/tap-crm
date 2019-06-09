import React from 'react';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { localCurrencyValue } from 'util/localization/localValues';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

type OrderDetailsProps = {
  data: Object,
  OrderId: string,
};

class OrderDetails extends React.Component {
  props: OrderDetailsProps;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Name',
          accessor: 'Name',
        },
        {
          Header: 'Quantity',
          accessor: 'Quantity',
          Cell: props => {
            if (props.original.Quantity) {
              return (
                <div className="CellRight">{props.original.Quantity}</div>
              );
            } else {
              return null;
            }
          },
        },
        {
          Header: 'Price',
          accessor: 'ExtendedPrice',
          Cell: props => {
            if (props.original.TotalPrice) {
              return (
                <div className="CellRight">
                  {`${localCurrencyValue(props.original.ExtendedPrice)}`}
                </div>
              );
            } else {
              return null;
            }
          },
        },
        {
          Header: 'Total',
          accessor: 'TotalPrice',
          Cell: props => {
            if (props.original.TotalPrice) {
              return (
                <div className="CellRight">{localCurrencyValue(props.original.TotalPrice)}</div>
              );
            } else {
              return null;
            }
          },
        },
      ],
    };
  }

  render() {
    if (this.props.data.length === 0) {
      return <NoDataMessage />;
    }
    return (
      <div>
        <DefaultReactTable
          className="linked-row"
          data={this.props.data}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  OrderDetails,
  mapStateToProps
);
