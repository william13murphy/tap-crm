import React from 'react';
import connect from 'src/redux/connect';
import { Route, Redirect } from 'react-router-dom';
import { appContextSetSchoolIdState } from 'src/redux/actionCreators/appContext';
import { getSchoolIdFromPath } from 'util/router';

type AppContextContainerProps = {
  appContext: {
    schoolId: string,
  },
  // allSchools is required for many-school roles (CLADMIN, EFC Roles)
  allSchools?: {
    payload: Array<{
      Id: string,
    }>,
  },
  // token is required for single school roles (SCHADMIN, INSTRUCT)
  token?: {
    payload: {
      SchoolId: string,
    },
  },
  children: any,
  dispatchAppContextSetSchoolIdState: Function,
  manySchools: boolean, // True if wrapped in <AllSchoolsContainer> (for EFC & CLADMIN Roles)
  location: {
    pathname: string,
  },
};

class AppContextContainer extends React.Component {
  props: AppContextContainerProps;
  componentWillMount() {
    if (this.props.manySchools) {
      // By default, set the default SchoolId to the first item in allSchools.payload:
      let defaultSelectedSchool = this.props.allSchools.payload[0].Id;

      // Check the route for a SchoolId. If one exists, use that instead. This fixes page refresh:
      const currentPath = this.props.location.pathname;
      const inSchoolApp =
        this.props.location.pathname.indexOf('/school-app/') != -1;
      if (inSchoolApp) {
        const schoolIdFromPath = getSchoolIdFromPath(currentPath);
        defaultSelectedSchool = schoolIdFromPath;
      }

      // Set appContext.schoolId if it's not set already:
      if (!this.props.appContext.schoolId) {
        this.props.dispatchAppContextSetSchoolIdState(defaultSelectedSchool);
      }
    } else {
      // Get SchoolId from token
      this.props.dispatchAppContextSetSchoolIdState(
        this.props.token.payload.SchoolId
      );
    }
  }
  getAppContextStatus() {
    if (this.props.appContext) {
      if (this.props.appContext.schoolId) {
        return true;
      }
    } else {
      return false;
    }
  }
  render() {
    if (this.props.appContext) {
      if (this.getAppContextStatus()) {
        return (
          <div className="AppContextContainer">
            <Route
              exact={true}
              path="/app"
              render={() => (
                <Redirect
                  to={`/app/school-app/${this.props.appContext.schoolId}`}
                />
              )}
            />
            {this.props.children}
          </div>
        );
      } else {
        return null;
      }
    } else {
      return <div>Error: No appContext found</div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    appContext: state.appContext,
    allSchools: state.school.allSchools,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchAppContextSetSchoolIdState: id => {
      dispatch(appContextSetSchoolIdState(id));
    },
  };
};

export default connect(
  AppContextContainer,
  mapStateToProps,
  mapDispatchToProps
);
