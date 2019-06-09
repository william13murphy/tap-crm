import React from 'react';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';

import Modal from 'components/Modal';
import SchoolBankFormContainer from 'containers/School/SchoolBankFormContainer';
import AddSchoolBankForm from './AddSchoolBankForm';

import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import DataCard from 'components/DataCard';
import SchoolBankContainer from 'containers/School/SchoolBankContainer';

import NoDataMessage from 'components/DataLoading/NoDataMessage';

import { getReferenceItems } from 'api/referenceItems';

type SchoolBankProps = {
  schoolId: string,

  schoolBank: {
    payload: {},
  },
  token: {
    payload: {
      access_token: string,
    },
  },
  match: {
    path: string,
    url: string,
  },
  references: {},
};

const SchoolBank = (props: SchoolBankProps) => {
  const bankFormInitialValues = props.schoolBank.payload || {
    schoolId: props.schoolId,
  };
  bankFormInitialValues['Token'] = props.token.payload.access_token;

  const currencyTypes = getReferenceItems('LstCurrencyTypes', props.references);
  const countryTypes = getReferenceItems('LstCountries', props.references);

  let currencyType, countryName;

  if (props.schoolBank.payload) {
    currencyTypes.map(element => {
      if (element.Id === props.schoolBank.payload.CurrencyTypeId) {
        currencyType = element.Description;
      }
    });

    countryTypes.map(element => {
      if (element.Id === props.schoolBank.payload.CountryId) {
        countryName = element.Description;
      }
    });
  }

  return (
    <div className="SchoolBank">
      <Route
        path={`${props.match.path}/edit`}
        render={() => (
          <Modal title="Edit School Bank" closeUrl={props.match.url}>
            <SchoolBankFormContainer
              dispatchActionOnCloseParams={props.schoolId}
              redirectOnSuccess={props.match.url}
            >
              <AddSchoolBankForm
                schoolId={props.schoolId}
                initialValues={bankFormInitialValues}
              />
            </SchoolBankFormContainer>
          </Modal>
        )}
      />
      <Route
        path={`${props.match.path}/add`}
        render={() => (
          <Modal title="Add School Bank" closeUrl={props.match.url}>
            <SchoolBankFormContainer
              dispatchActionOnCloseParams={props.schoolId}
              redirectOnSuccess={props.match.url}
            >
              <AddSchoolBankForm schoolId={props.schoolId} />
            </SchoolBankFormContainer>
          </Modal>
        )}
      />
      <Link to={`${props.match.url}/add`}>
        <button className="pt-button pt-icon-plus">Add Bank information</button>
      </Link>
      <SchoolBankContainer dispatchFetchParams={props.schoolId}>
        <DataCard title="Bank" editLink={`${props.match.url}/edit`}>
          {props.schoolBank.payload &&
          props.schoolBank.payload.CurrencyTypeId ? (
            <table className="default-table-plain">
              <tbody>
                <tr>
                  <td className="label">Currency:</td>
                  <td className="value">{currencyType}</td>
                </tr>
                <tr>
                  <td className="label">Country:</td>
                  <td className="value">{countryName}</td>
                </tr>
                <tr>
                  <td className="label">Account Holder:</td>
                  <td className="value">
                    {props.schoolBank.payload.AccountHolder}
                  </td>
                </tr>
                <tr>
                  <td className="label">Account Number:</td>
                  <td className="value">
                    {props.schoolBank.payload.AccountNumber}
                  </td>
                </tr>
                <tr>
                  <td className="label">Routing Number:</td>
                  <td className="value">
                    {props.schoolBank.payload.RoutingNumber}
                  </td>
                </tr>
                <tr>
                  <td className="label">Account Type:</td>
                  <td className="value">
                    <ReferenceOutput
                      listName="LstBankAccountTypes"
                      id={props.schoolBank.payload.AccountTypeId}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">SWIFT:</td>
                  <td className="value">{props.schoolBank.payload.SWIFT}</td>
                </tr>
                <tr>
                  <td className="label">IBAN:</td>
                  <td className="value">{props.schoolBank.payload.IBAN}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <NoDataMessage errorMessage="No bank information found." />
          )}
        </DataCard>
      </SchoolBankContainer>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
    schoolBank: state.school.bank,
    references: state.utility.references,
  };
};

export default connect(
  SchoolBank,
  mapStateToProps
);
