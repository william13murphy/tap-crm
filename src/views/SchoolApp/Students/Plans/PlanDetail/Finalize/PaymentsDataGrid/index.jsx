import React from 'react';
import moment from 'moment';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import StudentPlanPaymentSettleFormContainer from 'containers/Student/StudentPlanPaymentSettleFormContainer';
import StudentPlanPaymentSuspendFormContainer from 'containers/Student/StudentPlanPaymentSuspendFormContainer';
import StudentPlanPaymentUpdateStatusFormContainer from 'containers/Student/StudentPlanPaymentUpdateStatusFormContainer';
import SingleButtonForm from 'components/Forms/SingleButtonForm';
import './styles.less';

import PaymentStatusDisplay from 'src/components/PaymentStatusDisplay';

import { localCurrencyValue } from 'util/localization/localValues';

const paymentStatuses = {
  Completed: 'Completed',
  Failed: 'Failed',
  Processing: 'Processing',
  Refunded: 'Refunded',
  Retry: 'Retry',
  Restored: 'Restored',
  Scheduled: 'Scheduled',
  Settled: 'Settled',
  Suspended: 'Suspended',
};

const updatePaymentStatuses = {
  Restore: 'Restore',
  Refund: 'Refund',
  Retry: 'Retry',
};

type PaymentsDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  schoolId: string,
};

class PaymentsDataGrid extends React.Component {
  props: PaymentsDataGridProps;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Due Date',
          accessor: 'DueDate',
          Cell: props => (
            <span className="date">
              {props.value && moment(props.value).format('MMMM D, YYYY')}
            </span>
          ),
        },
        {
          Header: 'Collected Date',
          accessor: 'CollectDate',
          Cell: props => (
            <span className="date">
              {props.value && moment(props.value).format('MMMM D, YYYY')}
            </span>
          ),
        },
        {
          Header: 'Payment Amount',
          accessor: 'Amount',
          Cell: props => <span className="amount">{localCurrencyValue(props.value)}</span>,
        },
        {
          Header: 'Status',
          accessor: 'Status',
          Cell: row => {
            return PaymentStatusDisplay(row.original.Status);
          },
        },
        {
          Header: 'Actions',
          accessor: 'Actions',
          width: props.finalized ? undefined : 0,
          Cell: row => {
            if (props.finalized) {
              console.log('ROW=' + row.original.ScheduleID, row);
              return (
                <div className="Action__cell">
                  {row.original.Status &&
                    (row.original.Status === paymentStatuses.Completed ||
                      row.original.Status === paymentStatuses.Settled) && (
                      <StudentPlanPaymentUpdateStatusFormContainer
                        dispatchActionOnSuccessParams={this.props.planId}
                      >
                        <SingleButtonForm
                          title="Refund"
                          className="pt-icon pt-icon-upload pt-intent-danger"
                          formData={{
                            planId: this.props.planId,
                            paymentId: row.original.ScheduleID,
                            status: updatePaymentStatuses.Refund,
                          }}
                        />
                      </StudentPlanPaymentUpdateStatusFormContainer>
                    )}
                  {row.original.Status &&
                    row.original.Status === paymentStatuses.Failed && (
                      <StudentPlanPaymentUpdateStatusFormContainer
                        dispatchActionOnSuccessParams={this.props.planId}
                      >
                        <SingleButtonForm
                          title="Retry"
                          className="pt-icon pt-icon-repeat pt-intent-primary"
                          formData={{
                            planId: this.props.planId,
                            paymentId: row.original.ScheduleID,
                            status: updatePaymentStatuses.Retry,
                          }}
                        />
                      </StudentPlanPaymentUpdateStatusFormContainer>
                    )}

                  {row.original.Status &&
                    row.original.Status === paymentStatuses.Suspended && (
                      <StudentPlanPaymentUpdateStatusFormContainer
                        dispatchActionOnSuccessParams={this.props.planId}
                      >
                        <SingleButtonForm
                          title="Restore"
                          className="pt-icon pt-icon-automatic-updates pt-intent-primary"
                          formData={{
                            planId: this.props.planId,
                            paymentId: row.original.ScheduleID,
                            status: updatePaymentStatuses.Restore,
                          }}
                        />
                      </StudentPlanPaymentUpdateStatusFormContainer>
                    )}
                  {row.original.Status &&
                  row.original.Status === paymentStatuses.Scheduled ? (
                    <div className="flex">
                      <StudentPlanPaymentSuspendFormContainer
                        dispatchActionOnSuccessParams={this.props.planId}
                      >
                        <SingleButtonForm
                          title="Suspend"
                          className="pt-icon pt-icon-pause pt-intent-warning"
                          formData={{
                            planId: this.props.planId,
                            paymentId: row.original.ScheduleID,
                          }}
                        />
                      </StudentPlanPaymentSuspendFormContainer>

                      <StudentPlanPaymentSettleFormContainer
                        dispatchActionOnSuccessParams={this.props.planId}
                      >
                        <SingleButtonForm
                          title="Settle"
                          className="pt-icon pt-icon-tick pt-intent-success"
                          formData={{
                            planId: this.props.planId,
                            paymentId: row.original.ScheduleID,
                          }}
                        />
                      </StudentPlanPaymentSettleFormContainer>
                    </div>
                  ) : null}
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

  render() {
    return (
      <div className="PaymentsDataGrid">
        <DefaultReactTable
          data={this.props.data}
          pageSize={this.props.data.length}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default PaymentsDataGrid;
