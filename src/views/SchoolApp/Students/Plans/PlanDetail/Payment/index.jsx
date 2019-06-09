import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Modal from 'components/Modal';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import PageFooter from 'components/Layout/PageFooter';
import BackButton from 'components/Buttons/BackButton';
import SubmitButton from 'components/Forms/SubmitButton';
import SingleButtonForm from 'components/Forms/SingleButtonForm';

import StudentPlanPaymentAccountContainer from 'containers/Student/StudentPlanPaymentAccountContainer';
import StudentPlanOwnerContainer from 'containers/Student/StudentPlanOwnerContainer';
import StudentPlanContainer from 'containers/Student/StudentPlanContainer';
import StudentOwnersContainer from 'containers/Student/StudentOwnersContainer';
import StudentOwnerFormContainer from 'containers/Student/StudentOwnerFormContainer';

import calculatePageBodyHeight from '../calculatePageBodyHeight';
import PaymentOwner from './PaymentOwner';
import PaymentTerms from './PaymentTerms';
import PaymentAccount from './PaymentAccount';
import AddExistingOwnerForm from './AddExistingOwnerForm';
import './styles.less';

type PaymentPageProps = {
  match: { params: { schoolId: string, planId: string, id: string } },
  plan: {
    payload: {
      DownPaymentAmount: any,
    },
  },
  owners: any,
  owner: {
    payload: {
      FirstName: any,
    },
  },
  planPaymentAccounts: {
    payload: any,
  },
};

class PaymentPage extends React.Component {
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
    let isDisabled = true;
    if (this.props.owner.payload && this.props.plan.payload) {
      if (
        this.props.owner.payload.OwnerId !==
          '00000000-0000-0000-0000-000000000000' &&
        this.props.plan.payload.DownPaymentAmount != null &&
        this.props.planPaymentAccounts.payload
      ) {
        isDisabled = false;
      }
    }

    const readOnly =
      this.props.planDetail.payload.TerminiationDate ||
      this.props.planDetail.payload.Finalized
        ? true
        : false;
    return (
      <Page className="PlanDetailPaymentPage">
        <PageBody height={this.state ? this.state.pageBodyHeight : null}>
          <StudentPlanContainer
            dispatchFetchParams={this.props.match.params.planId}
          >
            <PaymentTerms
              planDetail={this.props.planDetail.payload}
              routes={this.props.match}
              readOnly={readOnly}
            />
          </StudentPlanContainer>

          <StudentPlanPaymentAccountContainer
            dispatchFetchParams={this.props.match.params.planId}
          >
            <PaymentAccount routes={this.props.match} readOnly={readOnly} />
          </StudentPlanPaymentAccountContainer>
          <StudentPlanOwnerContainer
            dispatchFetchParams={this.props.match.params.planId}
          >
            <PaymentOwner routes={this.props.match} readOnly={readOnly} />
          </StudentPlanOwnerContainer>

          <Route
            exact
            path={`${this.props.match.path}/enroll-owner`}
            render={() => (
              <Modal title="Add Account Owner" closeUrl={this.props.match.url}>
                <StudentOwnersContainer
                  dispatchFetchParams={this.props.match.params.schoolId}
                >
                  <StudentOwnerFormContainer
                    dispatchActionOnCloseParams={this.props.match.params.planId}
                    redirectOnSuccess={this.props.match.url}
                  >
                    <AddExistingOwnerForm
                      planId={this.props.match.params.planId}
                      schoolId={this.props.match.params.schoolId}
                      owners={this.props.owners}
                    />
                  </StudentOwnerFormContainer>
                </StudentOwnersContainer>
              </Modal>
            )}
          />
        </PageBody>

        <PageFooter>
          <Link
            className={`pt-button pt-intent-primary`}
            to={this.props.backUrl}
          >
            Previous
          </Link>
          <Link
            className={`pt-button pt-intent-primary ${
              isDisabled ? 'disabled' : ''
            }`}
            to={this.props.nextUrl}
          >
            Next
          </Link>
        </PageFooter>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    plan: state.student.plan,
    owners: state.student.owners,
    owner: state.student.owner,
    planPaymentAccounts: state.student.planPaymentAccounts,
    planDetail: state.student.planDetail,
  };
};

export default connect(
  PaymentPage,
  mapStateToProps
);
