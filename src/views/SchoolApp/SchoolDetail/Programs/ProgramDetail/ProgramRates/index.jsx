import React from 'react';
import Page from 'components/Layout/Page';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import Modal from 'components/Modal';
import FormWrapper from 'components/Layout/FormWrapper';
import FormChoice from 'components/FormChoice';
import SubscriptionPage from './Subscription';
import AddSubscriptionForm from './Subscription/AddSubscriptionForm';
import AddPunchCardForm from './PunchCard/AddPunchCardForm';
import PunchCardPage from './PunchCard';
import StyleRateFormContainer from 'containers/School/StyleRateFormContainer';
import PunchCardRatesDisplay from './PunchCard/PunchCardRatesDisplay';
import AdditionalClassesForm from './Subscription/AdditionalClassesForm';
import SchoolStyleRateAdditionalClassFormContainer from 'containers/School/SchoolStyleRateAdditionalClassFormContainer';
import SubscriptionRatesDisplay from './Subscription/SubscriptionRatesDisplay';
import './styles.less';

type ProgramRatesPageProps = {
  schoolId: string,
  history: {},
  match: {
    params: {
      styleId: string,
    },
    path: string,
  },
  schoolContacts: {
    payload: {},
  },
  styleRanks: {
    payload: [],
  },
  schoolStyles: [{}],
  styleRates: {
    payload: [{}],
  },
};

const ProgramRates = (props: ProgramRatesPageProps) => {
  return (
    <Page className="ProgramRatesPage" title="Program Detail">
      <Route
        exact
        path="/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rates/subscription/add"
        render={routerProps => {
          return (
            <SubscriptionPage
              schoolId={routerProps.match.params.schoolId}
              styleId={routerProps.match.params.styleId}
            />
          );
        }}
      />
      <Route
        exact
        path="/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rates/punch-card/add"
        render={routerProps => {
          return (
            <PunchCardPage
              schoolId={routerProps.match.params.schoolId}
              styleId={routerProps.match.params.styleId}
            />
          );
        }}
      />
      <Route
        exact
        path="/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rates/:styleRateId/subscription/edit"
        render={routerProps => {
          let initialValues = routerProps.location.state.initialValues;
          return (
            <Modal
              title="Edit Subscription Rate"
              closeUrl={`/app/school-app/${
                routerProps.match.params.schoolId
              }/school-detail/programs/detail/${
                routerProps.match.params.styleId
              }/rates`}
            >
              <StyleRateFormContainer
                dispatchActionOnCloseParams={routerProps.match.params.styleId}
                redirectOnSuccess={`/app/school-app/${
                  routerProps.match.params.schoolId
                }/school-detail/programs/detail/${
                  routerProps.match.params.styleId
                }/rates`}
                initialValues={initialValues}
              >
                <AddSubscriptionForm
                  schoolStyleId={routerProps.match.params.styleId}
                  schoolId={routerProps.match.params.schoolId}
                />
              </StyleRateFormContainer>
            </Modal>
          );
        }}
      />
      <Route
        exact
        path="/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rates/:styleRateId/punch-card/edit"
        render={routerProps => {
          let initialValues = routerProps.location.state.initialValues;
          return (
            <Modal
              title="Edit PunchCard Rate"
              closeUrl={`/app/school-app/${
                routerProps.match.params.schoolId
              }/school-detail/programs/detail/${
                routerProps.match.params.styleId
              }/rates`}
            >
              <StyleRateFormContainer
                dispatchActionOnCloseParams={routerProps.match.params.styleId}
                redirectOnSuccess={`/app/school-app/${
                  routerProps.match.params.schoolId
                }/school-detail/programs/detail/${
                  routerProps.match.params.styleId
                }/rates`}
                initialValues={initialValues}
              >
                <AddPunchCardForm
                  schoolStyleId={routerProps.match.params.styleId}
                  schoolId={routerProps.match.params.schoolId}
                />
              </StyleRateFormContainer>
            </Modal>
          );
        }}
      />
      <Route
        path={
          '/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rates/:styleRateId/additional-classes'
        }
        render={routerProps => {
          return (
            <Modal
              title="Add Additional Classes Cost"
              closeUrl={`/app/school-app/${
                routerProps.match.params.schoolId
              }/school-detail/programs/detail/${
                routerProps.match.params.styleId
              }/rates`}
            >
              <SchoolStyleRateAdditionalClassFormContainer
                dispatchActionOnCloseParams={{
                  styleRateId: routerProps.match.params.styleRateId,
                }}
                redirectOnSuccess={`/app/school-app/${
                  routerProps.match.params.schoolId
                }/school-detail/programs/detail/${
                  routerProps.match.params.styleId
                }/rates`}
              >
                <AdditionalClassesForm
                  SchoolStyleId={routerProps.match.params.styleId}
                  styleRateId={routerProps.match.params.styleRateId}
                />
              </SchoolStyleRateAdditionalClassFormContainer>
            </Modal>
          );
        }}
      />
      <Route
        exact
        path={
          '/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rates'
        }
        render={routerProps => (
          <PageBody>
            <div className="ProgramRatesWrapper">
              <FormWrapper>
                <div>
                  <Link
                    to={`/app/school-app/${
                      routerProps.match.params.schoolId
                    }/school-detail/programs/detail/${
                      routerProps.match.params.styleId
                    }/rates/subscription/add`}
                    className="pt-button pt-intent-primary pt-icon-repeat"
                  >
                    Add New Subscription Rate
                  </Link>
                  &nbsp;&nbsp;
                  <Link
                    to={`/app/school-app/${
                      routerProps.match.params.schoolId
                    }/school-detail/programs/detail/${
                      routerProps.match.params.styleId
                    }/rates/punch-card/add`}
                    className="pt-button pt-intent-primary pt-icon-layers"
                  >
                    Add New Sessions Based Rate
                  </Link>
                  &nbsp;&nbsp;
                </div>
                <SubscriptionRatesDisplay />
                <PunchCardRatesDisplay />
              </FormWrapper>
            </div>
          </PageBody>
        )}
      />
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    schoolStyles: state.school.styles,
    styleDetail: state.school.styleDetail,
    references: state.utility.references,
    styleRates: state.school.styleRates,
  };
};

export default connect(
  ProgramRates,
  mapStateToProps
);
