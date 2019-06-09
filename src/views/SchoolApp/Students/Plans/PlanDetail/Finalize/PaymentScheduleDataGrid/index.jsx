import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';

import { localCurrencyValue } from 'util/localization/localValues';

import moment from 'moment';

type PaymentScheduleDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  schoolId: string,
};

class PaymentScheduleDataGrid extends React.Component {
  props: PaymentScheduleDataGridProps;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Payment Date',
          accessor: 'PaymentDate',
          Cell: props => (
            <span className="date">
              {props.value && moment(props.value).format('MMMM D, YYYY')}
            </span>
          ),
        },
        {
          Header: 'Payment Amount',
          accessor: 'PaymentAmount',
          Cell: props => <span>{localCurrencyValue(props.value)}</span>,
        },
        {
          Header: 'Collected Date',
          accessor: 'CollectedDate',
          Cell: props => (
            <span className="date">
              {props.value && moment(props.value).format('MMMM D, YYYY')}
            </span>
          ),
        },
        {
          Header: 'Payment Status',
          accessor: 'PaymentStatus',
        },
      ],
    };
  }

  render() {
    return (
      <div className="PaymentScheduleDataGrid">
        <DefaultReactTable
          className="linked-row"
          data={this.props.data}
          pageSize={this.props.data.length}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default PaymentScheduleDataGrid;
