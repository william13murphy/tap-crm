import React from 'react';
import { Link, Route } from 'react-router-dom';

import Modal from 'components/Modal';

import DataCard from 'components/DataCard';

import SchoolContactFormContainer from 'containers/School/SchoolContactFormContainer';
import AddSchoolContactForm from './AddSchoolContactForm';
import SchoolContactsDataGrid from './SchoolContactsDataGrid';
import EfcContactDataGrid from './EfcContactDataGrid';
import AddEfcContactForm from './AddEfcContactForm';
import connect from 'src/redux/connect';
import { schoolContactsFetch } from 'src/redux/actionCreators/school/contacts';
import { efcUsersFetch } from 'src/redux/actionCreators/administration/efcUsers';

import PrivateComponent from 'components/Auth/PrivateComponent';
import { roles } from 'util/auth/roles';
import './styles.less';
import SchoolContactsContainer from 'containers/School/SchoolContactsContainer';
import EfcUsersContainer from 'containers/Administration/EfcUsersContainer';
import ReadOnlyMessage from 'components/DataLoading/ReadOnlyMessage';

type SchoolContactsProps = {
  schoolId: string,
  schoolContacts: {
    payload: {},
  },
  dispatchSchoolContactsFetch: any,
  match: {
    path: string,
    url: string,
  },
};

const SchoolContacts = (props: SchoolContactsProps) => {
  return (
    <div className="SchoolContacts">
      <Route
        path={`${props.match.path}/add`}
        render={() => {
          return (
            <Modal title="Add School Contact" closeUrl={props.match.url}>
              <SchoolContactFormContainer
                dispatchActionOnClose={props.dispatchSchoolContactsFetch}
                dispatchActionOnCloseParams={props.schoolId}
                redirectOnSuccess={props.match.url}
              >
                <AddSchoolContactForm schoolId={props.schoolId} />
              </SchoolContactFormContainer>
            </Modal>
          );
        }}
      />
      <Route
        path={`${props.match.path}/efc/add`}
        exact
        render={() => {
          return (
            <Modal title="Add EFC Contact" closeUrl={props.match.url}>
              <EfcUsersContainer>
                <SchoolContactFormContainer
                  dispatchActionOnClose={props.dispatchSchoolContactsFetch}
                  dispatchActionOnCloseParams={props.schoolId}
                  redirectOnSuccess={props.match.url}
                >
                  <AddEfcContactForm
                    schoolId={props.schoolId}
                    data={props.efcUsers.payload}
                  />
                </SchoolContactFormContainer>
              </EfcUsersContainer>
            </Modal>
          );
        }}
      />
      <div>
        <div className="AddContactButton">
          <Link to={`${props.match.url}/add`}>
            <button className="pt-button pt-icon-plus">
              Add School Contact
            </button>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
            <Link to={`${props.match.url}/efc/add`}>
              <button className="pt-button pt-icon-plus">
                Add EFC Contact
              </button>
            </Link>
          </PrivateComponent>
        </div>
        <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
          <h3 className="contacts__title">EFC Contacts</h3>
          <SchoolContactsContainer dispatchFetchParams={props.schoolId}>
            <EfcContactDataGrid
              data={props.schoolContacts.payload}
              dispatchSchoolContactsFetch={props.dispatchSchoolContactsFetch}
              schoolId={props.schoolId}
              match={props.match}
            />
          </SchoolContactsContainer>
        </PrivateComponent>
        <h3 className="contacts__title">School Contacts</h3>
        <SchoolContactsContainer dispatchFetchParams={props.schoolId}>
          <SchoolContactsDataGrid
            data={props.schoolContacts.payload}
            dispatchSchoolContactsFetch={props.dispatchSchoolContactsFetch}
            schoolId={props.schoolId}
            match={props.match}
          />
        </SchoolContactsContainer>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
    efcUsers: state.administration.efcUsers,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSchoolContactsFetch: schoolId => {
      dispatch(schoolContactsFetch(schoolId));
    },
  };
};

export default connect(
  SchoolContacts,
  mapStateToProps,
  mapDispatchToProps
);
