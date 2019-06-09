import React from 'react';
import Page from 'components/Layout/Page';
import { Link, Route, NavLink, Redirect } from 'react-router-dom';
import connect from 'src/redux/connect';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import StyleDetailContainer from 'containers/School/StyleDetailContainer';
import Modal from 'components/Modal';
import BackButton from 'components/Buttons/BackButton';
import ProgramInfo from './ProgramInfo';
import ProgramRankDetail from './ProgramRanks';
import TabList from 'components/TabList';
import Tab from 'components/Tab';
import TabRoutes from 'components/TabRoutes';
import ProgramRates from './ProgramRates';
import SchoolStyleRatesContainer from 'containers/School/SchoolStyleRatesContainer';
import AddSchoolStyleForm from '../AddSchoolStyleForm';
import SchoolStyleFormContainer from 'containers/School/SchoolStyleFormContainer';
import SchoolStyleRanksContainer from 'containers/School/SchoolStyleRanksContainer';
import './styles.less';
import DataCard from 'components/DataCard';
import ProgramStudents from 'views/SchoolApp/_shared/ProgramStudents';

type ProgramDetailPageProps = {
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
  styleDetail: {
    payload: [{}],
  },
};

const ProgramDetailPage = (props: ProgramDetailPageProps) => {
  return (
    <Page className="ProgramDetailPage" title="Program Detail">
      <Route
        path={
          '/app/school-app/:schoolId/school-detail/programs/detail/:styleId'
        }
        exact
        render={routerProps => (
          <Redirect
            to={`/app/school-app/${
              routerProps.match.params.schoolId
            }/school-detail/programs/detail/${
              routerProps.match.params.styleId
            }/program`}
          />
        )}
      />
      <PageHeader>
        <PageTitle inline>
          {props.schoolStyles &&
            props.schoolStyles.payload &&
            props.schoolStyles.payload.map((style, i) => {
              if (style.Id === props.match.params.styleId) {
                return <span key={i}>{style.Name}</span>;
              }
            })}
        </PageTitle>
        <Link
          to={`/app/school-app/${
            props.match.params.schoolId
          }/school-detail/programs`}
        >
          <BackButton>All Programs</BackButton>
        </Link>
      </PageHeader>
      <PageBody>
        <div className="SchoolSettingsTabs inner-tabs">
          <div className="JustifyRight">
            <div>&nbsp;</div>
            <TabList>
              <NavLink
                to={`/app/school-app/${
                  props.match.params.schoolId
                }/school-detail/programs/detail/${
                  props.match.params.styleId
                }/program`}
                className="NavLink"
                activeClassName="selected"
              >
                <Tab>Info</Tab>
              </NavLink>
              <NavLink
                to={`/app/school-app/${
                  props.match.params.schoolId
                }/school-detail/programs/detail/${
                  props.match.params.styleId
                }/rates`}
                className="NavLink"
                activeClassName="selected"
              >
                <Tab>Rates</Tab>
              </NavLink>
              <NavLink
                to={`/app/school-app/${
                  props.match.params.schoolId
                }/school-detail/programs/detail/${
                  props.match.params.styleId
                }/rank`}
                className="NavLink"
                activeClassName="selected"
              >
                <Tab>Ranks</Tab>
              </NavLink>
              <NavLink
                to={`/app/school-app/${
                  props.match.params.schoolId
                }/school-detail/programs/detail/${
                  props.match.params.styleId
                }/students`}
                className="NavLink"
                activeClassName="selected"
              >
                <Tab>Students</Tab>
              </NavLink>
            </TabList>
          </div>
          <TabRoutes card>
            <Route
              path={
                '/app/school-app/:schoolId/school-detail/programs/detail/:styleId/program'
              }
              render={routerProps => (
                <StyleDetailContainer
                  dispatchFetchParams={routerProps.match.params.styleId}
                >
                  <ProgramInfo styleDetail={props.styleDetail} />
                </StyleDetailContainer>
              )}
            />
            <Route
              path={
                '/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rates'
              }
              render={routerProps => (
                <SchoolStyleRatesContainer
                  dispatchFetchParams={routerProps.match.params.styleId}
                >
                  <ProgramRates />
                </SchoolStyleRatesContainer>
              )}
            />
            <Route
              path={
                '/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rank'
              }
              render={() => <ProgramRankDetail />}
            />
            <Route
              path={`/app/school-app/${
                props.match.params.schoolId
              }/school-detail/programs/detail/${
                props.match.params.styleId
              }/program/edit`}
              render={() => {
                const CLOSE_URL = `/app/school-app/${
                  props.schoolId
                }/school-detail/programs/detail/${
                  props.match.params.styleId
                }/program`;
                return (
                  <Modal title="Edit School Program" closeUrl={CLOSE_URL}>
                    <SchoolStyleFormContainer
                      dispatchActionOnCloseParams={props.schoolId}
                      redirectOnSuccess={CLOSE_URL}
                      initialValues={props.styleDetail.payload}
                    >
                      <AddSchoolStyleForm id={props.schoolId} />
                    </SchoolStyleFormContainer>
                  </Modal>
                );
              }}
            />
            <Route
              path={
                '/app/school-app/:schoolId/school-detail/programs/detail/:styleId/students'
              }
              render={() => {
                return (
                  // <SchoolStyleRanksContainer
                  //   dispatchFetchParams={props.match.params.styleId}
                  // >
                  <div>
                    <h3 className="text-align-center">Enrolled Student</h3>
                    <ProgramStudents
                      styleRanks={props.styleRanks}
                      schoolId={props.match.params.schoolId}
                      styleId={props.match.params.styleId}
                    />
                  </div>
                  // </SchoolStyleRanksContainer>
                );
              }}
            />
          </TabRoutes>
        </div>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    schoolStyles: state.school.styles,
    styleRanks: state.school.styleRanks,
    styleDetail: state.school.styleDetail,
  };
};

export default connect(
  ProgramDetailPage,
  mapStateToProps
);
