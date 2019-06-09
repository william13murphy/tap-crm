import React from 'react';
import connect from 'src/redux/connect';

import Module from 'components/Layout/Module';
import TabList from 'components/TabList';
import Tab from 'components/Tab';

import InstructorProgramsPage from './InstructorPrograms';
import InstructorProgramDetail from './InstructorPrograms/ProgramDetail';

// import StudentProgramsPage from './StudentPrograms';

import PrivateRoute from 'components/Auth/PrivateRoute';
import { roles } from 'util/auth/roles';
import './styles.less';

type ProgramsModuleProps = {
  match: {
    path: string,
  },
};

const ProgramsModule = (props: ProgramsModuleProps) => {
  return (
    <Module className="ProgramsModule">
      <PrivateRoute
        exact
        path={props.match.path}
        component={InstructorProgramsPage}
        allow={roles.INSTRUCT}
      />
      {/*<PrivateRoute
          path="/app/programs"
          component={StudentProgramsPage}
          allow={roles.STUDENT}
        />*/}

      <PrivateRoute
        path={`${props.match.path}/detail/:id`}
        component={InstructorProgramDetail}
        allow={roles.INSTRUCT}
      />
    </Module>
  );
};
const mapStateToProps = () => ({});

export default connect(
  ProgramsModule,
  mapStateToProps
);
