import React from 'react';
import { Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import Modal from 'components/Modal';
import { clientDetailFetch } from 'src/redux/actionCreators/client/detail';

import ClientProfileInfo from './ClientProfileInfo';
import ClientSchools from '../ClientSchools';
import AddressCards from '../ClientAddresses/AddressCards';
import NoteCards from '../ClientNotes/NoteCards';

import ClientContactsContainer from '../ClientContacts/Container';
import ClientContactsSummary from './ClientContactsSummary';

import ClientFormContainer from 'containers/Client/ClientFormContainer';
import AddClientForm from '../../AddClientForm';
import ClientSchoolsCard from '../ClientSchools/ClientSchoolsCard';
import DataCard from 'components/DataCard';

import './styles.less';

type ClientSummaryProps = {
  clientDetail: {
    payload: {
      Notes: Array<{}>,
      Id: string,
    },
  },
  title: string,
  dispatchClientDetailFetch: any,
  clientSchools: {},
};

const ClientSummary = (props: ClientSummaryProps) => {
  return (
    <Page className="ClientSummaryPage" title="Summary">
      <Route
        path="/app/clients/detail/:id/summary/edit"
        render={() => {
          const CLOSE_URL = `/app/clients/detail/${
            props.clientDetail.payload.Id
          }/summary`;
          return (
            <Modal title="Edit Client Profile" closeUrl={CLOSE_URL}>
              <ClientFormContainer
                dispatchActionOnClose={props.dispatchClientDetailFetch}
                dispatchActionOnCloseParams={props.clientDetail.payload.Id}
                redirectOnSuccess={CLOSE_URL}
                update={true}
              >
                <AddClientForm initialValues={props.clientDetail.payload} />
              </ClientFormContainer>
            </Modal>
          );
        }}
      />

      <PageHeader>
        <PageTitle>{props.title}</PageTitle>
      </PageHeader>
      <PageBody>
        <div className="one-third-two-third">
          <div className="ClientProfileInfoWrapper one-third">
            <h2 className="SummaryCard__title">Client Profile</h2>
            <DataCard
              editLink={`/app/clients/detail/${
                props.clientDetail.payload.Id
              }/summary/edit`}
            >
              <ClientProfileInfo clientDetail={props.clientDetail} />
            </DataCard>
            <div className="AddressesSummary">
              <AddressCards preferredOnly={true} />
            </div>
          </div>
          <div className="ClientQuickFacts two-third">
            <div className="two-column">
              <div>
                <div className="SummaryCard ClientContactsSummary">
                  <h2 className="SummaryCard__title">Contacts</h2>
                  <ClientContactsContainer>
                    <ClientContactsSummary />
                  </ClientContactsContainer>
                </div>
                <div className="SummaryCard SchoolsSummary">
                  <h2 className="SummaryCard__title">Schools</h2>
                  <ClientSchoolsCard clientSchools={props.clientSchools} />
                </div>
              </div>
              <div>
                <div className="SummaryCard NotesSummary">
                  <h2 className="SummaryCard__title">Recent Notes</h2>
                  <NoteCards
                    cards={props.clientDetail.payload.Notes}
                    cardLimit={5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    clientDetail: state.client.detail,
    clientSchools: state.client.schools,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchClientDetailFetch: id => {
      dispatch(clientDetailFetch(id));
    },
  };
};

export default connect(
  ClientSummary,
  mapStateToProps,
  mapDispatchToProps
);
