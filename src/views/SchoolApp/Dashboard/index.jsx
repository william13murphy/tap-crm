import React from 'react';
import PrivateRoute from 'components/Auth/PrivateRoute';
import { roles } from 'util/auth/roles';
import SchoolAdminDashboard from './SchoolAdminDashboard';
import InstructorDashboard from './InstructorDashboard';

const DashboardModule = () => {
  return (
    <div className="DashboardModuleWrapper">
      <PrivateRoute
        path="/app/school-app/:schoolId/dashboard"
        component={SchoolAdminDashboard}
        allow={roles.LEVEL_SCHUSER}
      />
      <PrivateRoute
        path="/app/school-app/:schoolId/dashboard"
        component={InstructorDashboard}
        allow={roles.INSTRUCT}
      />
    </div>
  );
};

export default DashboardModule;
