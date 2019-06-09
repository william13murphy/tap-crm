import { getReferenceItemOptions } from 'api/referenceItems';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import { localCurrencySymbol } from 'util/localization/localValues';
import './styles.less';



type PaymentTermDetailsProps = {
  paymentTermData: any,
  routes: any, //Change the name of this
  references: {},
};

class PaymentTermDetails extends React.Component {
  props: PaymentTermDetailsProps;
  constructor(props) {
    super(props);

    this.state = {
      options: {},
      paymentFrequency: null,
    };
  }

  componentWillMount() {
    this.setState({
      options: getReferenceItemOptions(
        'LstPaymentFrequencies',
        this.props.references
      ),
    });
  }

  componentDidMount() {
    this.state.options.map(cV => {
      if (cV.value === this.props.paymentTermData.PaymentFrequencyId) {
        this.setState({
          PaymentFrequency: cV.label,
        });
      }
    });

    if (
      this.props.paymentTermData.PlanEndDate &&
      this.props.paymentTermData.PlanEndDate === '9999-12-31T00:00:00'
    ) {
      this.props.paymentTermData.PlanEndDate = '';
    }
  }

  render() {
    return (
      <div className="pt-card">
        <Link
          to={`${this.props.routes.url}/edit-payment-term`}
          className="EditPaymentTermDetailsButton pt-button pt-intent-primary pt-icon-edit"
        >
          Edit Payment Terms
        </Link>
        <table className="default-table-shaded">
          <tbody>
            <tr>
              <td>Renewal Date</td>
              <td>
                {this.props.paymentTermData.RenewalDate
                  ? moment(this.props.paymentTermData.RenewalDate).format(
                      'MMMM Do, YYYY'
                    )
                  : 'Does not renew'}
              </td>
            </tr>
            <tr>
              <td>Down Payment Amount</td>
              <td>
                {localCurrencySymbol()}
                {this.props.paymentTermData.DownPaymentAmount}
              </td>
            </tr>
            <tr>
              <td>Number of Payments</td>
              <td>{this.props.paymentTermData.NumberOfPayment}</td>
            </tr>
            <tr>
              <td>Payment Frequency</td>
              <td>{this.state.PaymentFrequency}</td>
            </tr>
            <tr>
              <td>Plan Start Date</td>
              <td>
                {this.props.paymentTermData.PlanStartDate &&
                  moment(this.props.paymentTermData.PlanStartDate).format(
                    'MMMM Do, YYYY'
                  )}
              </td>
            </tr>
            <tr>
              <td>Plan End Date</td>
              <td>
                {this.props.paymentTermData.PlanEndDate
                  ? moment(this.props.paymentTermData.PlanEndDate).format(
                      'MMMM Do, YYYY'
                    )
                  : 'None'}
              </td>
            </tr>
            <tr>
              <td>Payment Start Date</td>
              <td>
                {this.props.paymentTermData.PaymentStartDate &&
                  moment(this.props.paymentTermData.PaymentStartDate).format(
                    'MMMM Do, YYYY'
                  )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
  };
};

export default connect(
  PaymentTermDetails,
  mapStateToProps
);
