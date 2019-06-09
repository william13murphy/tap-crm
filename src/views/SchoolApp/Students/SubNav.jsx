import PrivateComponent from 'components/Auth/PrivateComponent';
import SubNav from 'components/SubNav';
import Tab from 'components/Tab';
import TabList from 'components/TabList';
import React from 'react';
import { NavLink } from 'react-router-dom';
import connect from 'src/redux/connect';
import { roles } from 'util/auth/roles';

type StudentsSubNavProps = {
  match: { params: { schoolId: string } },
};

const StudentsSubNav = (props: StudentsSubNavProps) => {
  const schoolId = props.match.params.schoolId;
  return (
    <SubNav>
      <div className="breadcrumbs-placeholder" />
      <TabList>
        <NavLink
          to={`/app/school-app/${schoolId}/students/all`}
          className="NavLink"
          activeClassName="selected"
        >
          <Tab>All Students</Tab>
        </NavLink>
        <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
          <NavLink
            to={`/app/school-app/${schoolId}/students/validate`}
            className="NavLink"
            activeClassName="selected"
          >
            <Tab>Unverified</Tab>
          </NavLink>
        </PrivateComponent>
        <NavLink
          className="NavLink"
          activeClassName="selected"
          to={`/app/school-app/${schoolId}/students/plans`}
        >
          <Tab>Payment Plans</Tab>
        </NavLink>
        
        <NavLink
          to={`/app/school-app/${schoolId}/students/grading`}
          className="NavLink"
          activeClassName="selected"
        >
          <Tab>Grading</Tab>
        </NavLink>
        <NavLink
          to={`/app/school-app/${schoolId}/students/smart-list`}
          className="NavLink"
          activeClassName="selected"
        >
          <Tab>Smart List</Tab>
        </NavLink>
        <NavLink
          to={`/app/school-app/${schoolId}/students/leads`}
          className="NavLink"
          activeClassName="selected"
        >
          <Tab>Leads</Tab>
        </NavLink>
      </TabList>
    </SubNav>
  );
};

const mapStateToProps = () => ({});

export default connect(
  StudentsSubNav,
  mapStateToProps
);
