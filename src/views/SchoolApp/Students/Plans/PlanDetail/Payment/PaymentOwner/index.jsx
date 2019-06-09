import React from 'react';
import { Route, Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';

import StudentOwnerFormContainer from 'containers/Student/StudentOwnerFormContainer';
import StateProvinceMasterContainer from 'containers/Utility/StateProvinceMasterContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import StudentPlanStudentFormContainer from 'containers/Student/StudentPlanStudentFormContainer';

import PaymentOwnerDetail from './PaymentOwnerDetail';
import AddStudentOwner from './AddStudentOwner';
import ReadOnlyScreen from '../../ReadOnlyScreen';
import './styles.less';

type OwnerDetailsProps = {
  owner: {
    payload: {
      schoolId: any,
    },
  },
  schoolProfile: { payload: [] },
  references: Array<{}>,
  routes: any,
  planDetail: payload,
};

const PaymentOwner = (props: OwnerDetailsProps) => {
  const ownerInitialValues = props.owner.payload;

  return (
    <div className="PaymentOwner">
      <ReadOnlyScreen readOnly={props.readOnly} />

      {props.owner.payload.FirstName !== 'Default' ? (
        <PaymentOwnerDetail owner={props.owner.payload} routes={props.match} />
      ) : (
        <div className="pt-card">
          <Link
            to={`${props.match.url}/add-account-owner`}
            className="AddAccountOwnerButton pt-button pt-intent-primary pt-icon-new-person"
          >
            Add New Account Owner
          </Link>
          <Link
            to={`${props.routes.url}/enroll-owner`}
            className="EnrollAccountOwnerButton pt-button pt-intent-primary pt-icon-edit"
          >
            Add Existing Account Owner
          </Link>
        </div>
      )}
      <Route
        exact
        path={`${props.match.path}/add-account-owner`}
        render={() => (
          <SchoolAnemicStudentsContainer
            dispatchFetchParams={props.owner.payload.SchoolId}
          >
            <StateProvinceMasterContainer>
              <AddStudentOwner
                planId={props.match.params.planId}
                schoolId={props.owner.payload.SchoolId}
                countryId={ownerInitialValues.CountryId}
                schoolProfile={props.schoolProfile}
                students={props.anemicStudents}
              />
            </StateProvinceMasterContainer>
          </SchoolAnemicStudentsContainer>
        )}
      />
      <Route
        exact
        path={`${props.match.path}/edit-account-owner`}
        render={() => (
          <SchoolAnemicStudentsContainer
            dispatchFetchParams={props.owner.payload.SchoolId}
          >
            <StateProvinceMasterContainer>
              <AddStudentOwner
                update
                initialValues={{
                  ...props.owner.payload,
                  planId: props.match.params.planId,
                  schoolId: props.owner.payload.SchoolId,
                  countryId: ownerInitialValues.CountryId,
                  schoolProfile: props.schoolProfile,
                  students: props.anemicStudents,
                }}
                students={props.anemicStudents}
              />
            </StateProvinceMasterContainer>
          </SchoolAnemicStudentsContainer>
        )}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    owner: state.student.owner,
    references: state.utility.references,
    schoolProfile: state.school.profile,
    planDetail: state.student.planDetail,
    anemicStudents: state.school.anemicStudents,
  };
};

export default connect(
  PaymentOwner,
  mapStateToProps
);
