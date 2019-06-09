import React from 'react';
import Module from 'components/Layout/Module';
import Modal from 'components/Modal';
import ConfirmDialog from 'components/ConfirmDialog';
import connect from 'src/redux/connect';
import SubNav from 'components/SubNav';
import { NavLink, Route, Redirect } from 'react-router-dom';
import TabList from 'components/TabList';
import Tab from 'components/Tab';
import Staff from './Staff';
import StaffDetail from './Staff/StaffDetail';
import Programs from './Programs';
import Classes from './Classes';
import Messaging from './Messaging';
import Marketings from './Marketings';
import Settings from './Settings';
import Store from './Store';
import Breadcrumbs from 'components/Breadcrumbs';
import Discounts from './Discounts';
import Skills from './Skills';
import ClassDetailPage from './Classes/ClassDetailPage';
import EditClass from './Classes/EditClass';
import SchoolContactFormContainer from 'containers/School/SchoolContactFormContainer';
import SchoolStaffDeleteContainer from 'containers/School/SchoolStaffDeleteContainer';
import AddSchoolStaffForm from './Staff/AddSchoolStaffForm';

type SchoolDetailPageProps = {
  match: {
    params: {
      schoolId: string,
    },
  },
  appContext: {
    schoolId: string,
  },
};

const SchoolDetailPage = (props: SchoolDetailPageProps) => {
  const schoolId = props.appContext.schoolId;
  const classId = `${props.match.path}/classes/class-detail/:classId`;
  return (
    <Module className="SchoolDetailModule">
      <SubNav>
        <div className="breadcrumbs-placeholder" />
        <TabList>
          <NavLink
            to={`${props.match.url}/staff`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Staff</Tab>
          </NavLink>
          <NavLink
            to={`${props.match.url}/programs`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Programs</Tab>
          </NavLink>
          <NavLink
            to={`${props.match.url}/skills`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Skills</Tab>
          </NavLink>
          <NavLink
            to={`${props.match.url}/discounts`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Discounts</Tab>
          </NavLink>

          <NavLink
            to={`${props.match.url}/classes`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Classes</Tab>
          </NavLink>
          <NavLink
            to={`${props.match.url}/marketings`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Campaigns</Tab>
          </NavLink>
          <NavLink
            to={`${props.match.url}/messaging`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Messaging</Tab>
          </NavLink>
          <NavLink
            to={`${props.match.url}/store`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Store</Tab>
          </NavLink>
          <NavLink
            to={`${props.match.url}/settings`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Settings</Tab>
          </NavLink>
        </TabList>
      </SubNav>

      <Route
        exact
        path={props.match.path}
        render={() => <Redirect to={`${props.match.url}/staff`} />}
      />
      <Route
        exact
        path={`${props.match.path}/staff`}
        render={() => <Staff schoolId={schoolId} />}
      />
      <Route
        path={`/app/school-app/${schoolId}/school-detail/staff/add`}
        render={() => {
          return (
            <Modal
              title="Add School Staff"
              closeUrl={`/app/school-app/${schoolId}/school-detail/staff`}
            >
              <SchoolContactFormContainer
                redirectOnSuccess={`/app/school-app/${schoolId}/school-detail/staff`}
              >
                <AddSchoolStaffForm id={schoolId} />
              </SchoolContactFormContainer>
            </Modal>
          );
        }}
      />
      <Route
        path={`${props.match.path}/staff/detail/:staffId`}
        render={() => <StaffDetail />}
      />
      <Route
        path={`${props.match.path}/staff/delete/:staffId`}
        render={innerProps => {
          return (
            <Modal title="Delete Staff" closeUrl={`${props.match.url}/staff`}>
              <SchoolStaffDeleteContainer
                redirectOnSuccess={props.match.url}
                dispatchActionOnCloseParams={innerProps.match.params.schoolId}
              >
                <ConfirmDialog
                  title="Are you sure you want to delete?"
                  closeUrl={`${props.match.url}/staff`}
                  id={innerProps.match.params.staffId}
                />
              </SchoolStaffDeleteContainer>
            </Modal>
          );
        }}
      />
      <Route
        path={`${props.match.path}/programs`}
        render={() => <Programs schoolId={schoolId} />}
      />
      <Route
        path={`${props.match.path}/discounts`}
        render={() => <Discounts schoolId={schoolId} />}
      />
      <Route
        path={`${props.match.path}/classes`}
        render={() => <Classes schoolId={schoolId} />}
      />
      <Route
        path={`${props.match.path}/classes/class-detail/:classId`}
        render={() => <ClassDetailPage schoolId={schoolId} />}
      />
      <Route
        // exact
        path={`${props.match.path}/classes/class-detail/:classId/edit-class`}
        render={() => <EditClass schoolId={schoolId} />}
      />
      <Route
        path={`${props.match.path}/marketings`}
        render={() => <Marketings schoolId={schoolId} />}
      />
      <Route
        path={`${props.match.path}/messaging`}
        render={() => <Messaging schoolId={schoolId} />}
      />
      <Route
        path={`${props.match.path}/settings`}
        render={() => <Settings schoolId={schoolId} />}
      />
      <Route
        path={`${props.match.path}/skills`}
        render={() => <Skills schoolId={schoolId} />}
      />
      <Route
        path={`${props.match.path}/store`}
        render={() => <Store schoolId={schoolId} />}
      />
    </Module>
  );
};

const mapStateToProps = state => {
  return {
    appContext: state.appContext,
  };
};

export default connect(
  SchoolDetailPage,
  mapStateToProps
);
