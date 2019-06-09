import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import moment from 'moment';
import connect from 'src/redux/connect';
import PaymentStatusDisplay from 'src/components/PaymentStatusDisplay';

import './styles.less';

type PaymentsGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  references: {},
  studentId: string,
};

class PaymentsGrid extends React.Component {
  props: PaymentsGridProps;
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Date',
          accessor: 'Date',
          Cell: rowInfo => (
            <span>{moment(rowInfo.value).format('MMMM D, YYYY')}</span>
          ),
        },
        {
          Header: 'Type',
          accessor: 'Type',
        },
        {
          Header: 'Amount',
          accessor: 'Amount',
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
    if (!this.props.data || (this.props.data && this.props.data.length === 0)) {
      return (
        <div className="StudentPaymentsGrid">
          <h4 className='emptyTable'>No Payments Found</h4>
        </div>
      );
    } else {
      return (
        <div className="StudentPaymentsGrid">
          <DefaultReactTable
            pageSize={this.props.data && this.props.data.length}
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
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
  };
};

export default connect(
  PaymentsGrid,
  mapStateToProps
);
