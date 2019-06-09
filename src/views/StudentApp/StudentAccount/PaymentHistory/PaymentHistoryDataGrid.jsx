import React from 'react';
import connect from 'src/redux/connect';
import DataCard from 'components/DataCard';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import moment from 'moment';
import { localCurrencyValue } from 'util/localization/localValues';
import PaymentStatusDisplay from 'components/PaymentStatusDisplay';

type PaymentHistoryCardProps = {
  token: {
    payload: { StudentId: string },
  },
  studentPaymentHistory: {
    payload: [{}],
  },
};

class PaymentHistoryDataGrid extends React.Component {
  props: PaymentHistoryCardProps;
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Date',
          accessor: 'Date',
          Cell: props => (
            <span className="date">
              {props.value && moment(props.value).format('YYYY-MM-DD')}
            </span>
          ),
        },
        {
          Header: 'Type',
          accessor: 'Type',
        },
        {
          Header: 'Amount',
          accessor: 'Amount',
          Cell: row => {
            return (
              <div className="FoodPrice">
                <span>{localCurrencyValue(row.value)}</span>
              </div>
            );
          },
        },
        {
          Header: 'Status',
          accessor: 'Status',
          Cell: row => {
            return PaymentStatusDisplay(row.original.PaymentStatus);
          },
        },
      ],
    };
  }

  render() {
    if (!this.props.data || this.props.data.length == 0) {
      return (
        <div className="AdditionalClassRatesDisplayGrid">
          <h4>No Payment Found</h4>
        </div>
      );
    } else {
      return (
        <DefaultReactTable
          className="linked-row"
          data={this.props.data}
          columns={this.state.columns}
          defaultSorted={[
            {
              id: 'Date',
              asc: true,
            },
          ]}
        />
      );
    }
  }
}

export default PaymentHistoryDataGrid;
