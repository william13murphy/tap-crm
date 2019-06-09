import React from 'react';
import DataCard from 'components/DataCard';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import NoDataMessage from 'components/DataLoading/NoDataMessage';
import PaymentStatusDisplay from 'components/PaymentStatusDisplay';

import connect from 'src/redux/connect';
import moment from 'moment';

import { localCurrencyValue } from 'util/localization/localValues';

type StorePurchaseHistoryDataGridProps = {
  studentPurchaseHistoy: any,
  data: {
    payload: [{}],
  },
};

class StorePurchaseHistoryDataGrid extends React.Component {
  props: StorePurchaseHistoryDataGridProps;
  constructor(props) {
    super(props);
    this.state = {
      studentPurchaseHistoryData: [],
      columns: [
        {
          Header: 'Mode Of Payment',
          accessor: 'ModeOfPayment',
        },
        {
          Header: 'PaymentStatus',
          accessor: 'PaymentStatus',
          Cell: row => {
            return PaymentStatusDisplay(row.original.PaymentStatus);
          },
        },
        {
          Header: 'Total',
          accessor: 'TotalPrice',
          Cell: props => {
            if (props.original.TotalPrice) {
              return (
                <div>
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
    let studentPurchaseHistoryData = [];

    if (this.props.data.payload) {
      this.props.data.payload.map(item => {
        if (Array.isArray(item.Orders)) {
          item.Orders.map(el => {
            studentPurchaseHistoryData.push(el);
          });
        }
      });
    }

    this.setState({ studentPurchaseHistoryData });
  }

  render() {
    return this.state.studentPurchaseHistoryData.length === 0 ? (
      <NoDataMessage errorMessage="No Store Purchase History found." />
    ) : (
      <div>
        <DefaultReactTable
          className="linked-row"
          data={this.state.studentPurchaseHistoryData}
          columns={this.state.columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push(
                `/app/account/store-purchase-history/${rowInfo.original.Id}`
              );
            },
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    studentPurchaseHistoy: state.pos.studentPurchaseHistoy,
  };
};

export default connect(
  StorePurchaseHistoryDataGrid,
  mapStateToProps
);
