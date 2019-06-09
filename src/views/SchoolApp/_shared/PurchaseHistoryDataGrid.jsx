import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import DataCard from 'components/DataCard';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { localCurrencyValue } from 'util/localization/localValues';
import PaymentStatusDisplay from 'components/PaymentStatusDisplay';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

type PurchaseHistoryDataGridProps = {
  studentPurchaseHistoy: any,
  data: {
    payload: [{}],
  },
};

class PurchaseHistoryDataGrid extends React.Component {
  props: PurchaseHistoryDataGridProps;
  constructor(props) {
    super(props);
    this.state = {
      purchaseHistoryData: [],
      columns: [
        {
          Header: 'Name',
          accessor: 'Name',
          Cell: row => {
            let name = row.original.OrderDetails[0].Name;
            if(row.original.OrderDetailsCount > 1) {
              name += ` ...${row.original.OrderDetailsCount -1 } more`;
            }
            return name;
          },
        },
        {
          Header: 'Purchase Date',
          accessor: 'OrderDate',
          Cell: row => {
            return (<div>{moment(row.original.OrderDate).format('MMMM D, YYYY')}</div>);
          },
        },
        {
          Header: 'PaymentStatus',
          accessor: 'PaymentStatus',
          Cell: row => {
            return PaymentStatusDisplay(row.original.PaymentStatus);
          },
        },
        {
          Header: 'Mode Of Payment',
          accessor: 'ModeOfPayment',
        },
        {
          Header: 'Total',
          accessor: 'TotalPrice',
          Cell: props => {
            if (props.original.TotalPrice) {
              return (
                <div className="CellRight">
                  <div>{`${localCurrencyValue(
                    props.original.TotalPrice
                  )}`}</div>
                </div>
              );
            } else {
              return null;
            }
          },
        },
      ],
    };
  }

  componentDidMount() {
    let purchaseHistoryData = [];

    if (this.props.data.payload) {
      this.props.data.payload.map(item => {
        if (Array.isArray(item.Orders)) {
          item.Orders.map(el => {
            purchaseHistoryData.push(el);
          });
        }
      });
    }

    this.setState({ purchaseHistoryData });
  }

  render() {
    if (this.state.purchaseHistoryData.length === 0) {
      return <NoDataMessage errorMessage="No Purchase History Found" />;
    } else {
      const purchaseHistoryData = this.state.purchaseHistoryData.map(history => {
        history.OrderDetailsCount = history.OrderDetails && history.OrderDetails.length || 0;
        return history
      });
      
      return (
        <DefaultReactTable
          className="linked-row"
          data={purchaseHistoryData}
          columns={this.state.columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push({
                pathname: `${this.props.match.url}/${rowInfo.original.Id}`,
                state: { initialValues: rowInfo.original },
              });
            },
          })}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  PurchaseHistoryDataGrid,
  mapStateToProps
);
