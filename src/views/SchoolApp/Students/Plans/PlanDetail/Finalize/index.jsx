import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Modal from 'components/Modal';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import PageFooter from 'components/Layout/PageFooter';
import SingleButtonForm from 'components/Forms/SingleButtonForm';
import BackButton from 'components/Buttons/BackButton';

import StudentPlanPaymentsContainer from 'containers/Student/StudentPlanPaymentsContainer';
import StudentPlanSummaryPdfContainer from 'containers/Student/StudentPlanSummaryPdfContainer';
import StudentEmailPlanSummaryStatefulFormContainer from 'containers/Student/StudentEmailPlanSummaryStatefulFormContainer';
import StudentPlanPaymentAuthorizationDocumentContainer from 'containers/Student/StudentPlanPaymentAuthorizationDocumentContainer';

import PaymentAuthorizationDocument from './PaymentAuthorizationDocument';
import PlanSummaryPdfDisplay from './PlanSummaryPdfDisplay';
import PlanAuthorizationDisplay from './PlanAuthorizationDisplay';
import PaymentScheduleDataGrid from './PaymentScheduleDataGrid';
import PaymentsDataGrid from './PaymentsDataGrid';
import calculatePageBodyHeight from '../calculatePageBodyHeight';
import './styles.less';

type FinalizePageProps = {
  match: { params: { schoolId: string, planId: string, id: string } },
  planSummaryPdf: {
    payload: any,
  },
  planDetail: {
    payload: any,
  },
};

class FinalizePage extends React.Component {
  constructor() {
    super();
    this.setPageBodyHeight = this.setPageBodyHeight.bind(this);
    this._isMounted = false;

    this.state = {
      pageBodyHeight: 500, // default height
    };
  }
  setPageBodyHeight = () => {
    this.setState({
      pageBodyHeight: calculatePageBodyHeight(),
    });
  };

  componentDidMount() {
    this._isMounted = true;
    setTimeout(() => {
      if (this._isMounted) {
        this.setPageBodyHeight();
      }
    }, 0);
    window.addEventListener('resize', this.setPageBodyHeight);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.setPageBodyHeight);
  }
  render() {
    return (
      <Page className="PlanDetailFinalizePage">
        <PageBody height={this.state ? this.state.pageBodyHeight : null}>
          <div className="PaymentAuthorizationSection">
            {this.props.planDetail.payload.Finalized &&
            this.props.planDetail.payload.AgreementBlobUrl ? (
              <div className="PaymentAuthorizationSection__links">
                <a
                  className="PaymentAuthorizationSignedLink pt-button pt-intent-success"
                  href={this.props.planDetail.payload.AgreementBlobUrl}
                >
                  <span className="pt-icon pt-icon-tick-circle pt-intent-success" />
                  <span className="PaymentAuthorizationSignedText">
                    Signed Authorization
                  </span>
                </a>
                <div className="Summary__action__item">
                  <StudentEmailPlanSummaryStatefulFormContainer
                    dispatchActionOnSuccessParams={
                      this.props.match.params.planId
                    }
                  >
                    <SingleButtonForm
                      title="&nbsp;Email Plan Summary"
                      className="pt-icon-envelope"
                      formData={this.props.match.params.planId}
                      disabled={true}
                    />
                  </StudentEmailPlanSummaryStatefulFormContainer>
                </div>
                <div className="Summary__action__item">
                  {this.props.planSummaryPdf.payload ? null : (
                    <PlanSummaryPdfDisplay disabled={true} />
                  )}
                  <StudentPlanSummaryPdfContainer
                    dispatchFetchParams={this.props.match.params.planId}
                    dispatchActionOnCloseParams={this.props.match.params.planId}
                  >
                    {this.props.planSummaryPdf.payload ? (
                      <PlanSummaryPdfDisplay disabled={false} />
                    ) : (
                      <PlanSummaryPdfDisplay disabled={true} />
                    )}
                  </StudentPlanSummaryPdfContainer>
                </div>
              </div>
            ) : (
              <Link
                className="PaymentAuthorizationLink"
                to={`${
                  this.props.match.url
                }/view-payment-authorization-document`}
              >
                <button className="PaymentAuthorizationButton pt-button pt-intent-warning pt-icon-clipboard">
                  Sign Payment Authorization
                </button>
              </Link>
            )}
          </div>
          <div>
            <Route
              exact
              path={`${
                this.props.match.url
              }/view-payment-authorization-document`}
              render={() => (
                <Modal
                  className="PaymentAuthorizationModal"
                  title="Plan Payment Authorization Document"
                  closeUrl={this.props.match.url}
                >
                  <StudentPlanPaymentAuthorizationDocumentContainer
                    dispatchFetchParams={this.props.match.params.planId}
                    dispatchActionOnCloseParams={this.props.match.params.planId}
                  >
                    <PaymentAuthorizationDocument
                      paymentAuthorizationDocument={
                        this.props.paymentAuthorizationDocument
                      }
                      planId={this.props.match.params.planId}
                      schoolId={this.props.match.params.schoolId}
                    />
                  </StudentPlanPaymentAuthorizationDocumentContainer>
                </Modal>
              )}
            />
            <div className="Summary__actions">

            </div>
            {this.props.planDetail.payload.Finalized ? (
              <StudentPlanPaymentsContainer
                dispatchFetchParams={this.props.match.params.planId}
              >
                <PaymentsDataGrid
                  finalized={this.props.planDetail.payload.Finalized}
                  planId={this.props.match.params.planId}
                  data={this.props.planPayments.payload}
                />
              </StudentPlanPaymentsContainer>
            ) : (
              <PaymentScheduleDataGrid
                data={this.props.planDetail.payload.PaymentSchedules}
              />
            )}
          </div>
        </PageBody>
        {
          this.props.planDetail.payload.Finalized ? null :
          <PageFooter>
            <Link
              className={`pt-button pt-intent-primary`}
              to={this.props.backUrl}
            >
              Previous
            </Link>
            <div />
          </PageFooter>
        }
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    planDetail: state.student.planDetail,
    planPayments: state.student.planPayments,
    paymentAuthorizationDocument: state.student.paymentAuthorizationDocument,
    planSummaryPdf: state.student.planSummaryPdf,
  };
};

export default connect(
  FinalizePage,
  mapStateToProps
);
