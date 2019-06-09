import React from 'react';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';
import { roles } from 'util/auth/roles';
import { localCurrencySymbol } from 'util/localization/localValues';

import Modal from 'components/Modal';
import DataCard from 'components/DataCard';
import ConfirmDialog from 'components/ConfirmDialog';
import PrivateComponent from 'components/Auth/PrivateComponent';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import SchoolRateFormContainer from 'containers/School/SchoolRateFormContainer';
import RateDeleteContainer from 'containers/School/RateDeleteContainer';
import SchoolRatesContainer from 'containers/School/SchoolRatesContainer';

import AddSchoolRateForm from './AddSchoolRateForm';
import './styles.less';

type SchoolRatesProps = {
  schoolId: string,
  references: Array<{}>,
  schoolRates: {
    payload: {},
  },
  dispatchSchoolDetailFetch: any,
  match: {
    path: string,
    url: string,
  },
};

const SchoolRates = (props: SchoolRatesProps) => {
  return (
    <div className="SchoolRates">
      <Route
        path={`/app/school-app/:schoolId/school-detail/settings/rates/:rateId/delete`}
        render={routerProps => (
          <Modal
            title="Delete School Rate"
            closeUrl={`/app/school-app/${
              props.schoolId
            }/school-detail/settings/rates`}
          >
            <RateDeleteContainer
              dispatchActionOnCloseParams={props.schoolId}
              redirectOnSuccess={`/app/school-app/${
                props.schoolId
              }/school-detail/settings/rates`}
            >
              <ConfirmDialog
                title="Are you sure you want to delete?"
                closeUrl={`/app/school-app/${
                  props.schoolId
                }/school-detail/settings/rates`}
                id={routerProps.match.params.rateId}
              />
            </RateDeleteContainer>
          </Modal>
        )}
      />
      <Route
        path={`${props.match.path}/add`}
        render={() => {
          return (
            <Modal title="Add School Rate" closeUrl={props.match.url}>
              <SchoolRateFormContainer
                dispatchActionOnCloseParams={props.schoolId}
                redirectOnSuccess={props.match.url}
              >
                <AddSchoolRateForm schoolId={props.schoolId} />
              </SchoolRateFormContainer>
            </Modal>
          );
        }}
      />
      <div>
        <NoDataMessage
          errorMessage=" School Rates are calculated programmatically. Add a new rate to
            override the base school rates."
          icon="pt-icon-info-sign"
        />
      </div>
      <div>
        <div className="Fieldset__toolbar">
          <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
            <Link
              to={`${props.match.url}/add`}
              className="pt-button pt-icon-plus"
            >
              Add New Rate
            </Link>
          </PrivateComponent>
          <SchoolRatesContainer dispatchFetchParams={props.schoolId}>
            {props.schoolRates.payload ? (
              props.schoolRates.payload.map((rate, i) => {
                return (
                  <DataCard title="Rate" key={i}>
                    <h4>Type: {rate.Detail}</h4>
                    <h4>
                      Value:
                      {[
                        '7de2e696-f932-4838-94b7-7eb8a3238412', // Card Transaction Fee
                        'f76f9dbc-71bd-4595-8f43-f74c706eb111', //EFT Transaction Fee
                        'e80142a9-515e-464b-9ba9-01811ab1587b', //Software Fee
                      ].includes(rate.RateMasterId)
                        ? ' ' + localCurrencySymbol() + rate.Trans
                        : ' ' + rate.Trans + '%'}
                    </h4>
                    <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
                      <Link
                        to={`/app/school-app/${
                          props.schoolId
                        }/school-detail/settings/rates/${rate.Id}/delete`}
                        className="pt-button"
                      >
                        Delete
                      </Link>
                    </PrivateComponent>
                  </DataCard>
                );
              })
            ) : (
              <div>No rates found.</div>
            )}
          </SchoolRatesContainer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    references: state.utility.references,
    schoolRates: state.school.rates,
  };
};

export default connect(
  SchoolRates,
  mapStateToProps
);
