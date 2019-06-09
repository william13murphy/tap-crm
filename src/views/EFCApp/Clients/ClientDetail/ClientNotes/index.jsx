import React from 'react';
import { Link, Route } from 'react-router-dom';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import Modal from 'components/Modal';
import ClientNoteFormContainer from 'containers/Client/ClientNoteFormContainer';
import AddClientNoteForm from './AddClientNoteForm';
import NoteCards from './NoteCards';
import './styles.less';

type ClientNotesProps = {
  clientDetail: {
    payload: {
      Id: string,
      Notes: Array<{
        Note: {},
      }>,
    },
  },
  title: string,
};

class ClientNotes extends React.Component {
  props: ClientNotesProps;
  renderNoteCards() {
    if (this.props.clientDetail.payload.Notes) {
      return (
        <NoteCards
          clientId={this.props.clientDetail.payload.Id}
          cards={this.props.clientDetail.payload.Notes}
          editable={true}
        />
      );
    } else {
      return <div>No notes found.</div>;
    }
  }
  render() {
    return (
      <Page className="ClientNotesPage" title="Notes">
        <Route
          path="/app/clients/detail/:id/notes/add"
          render={() => {
            const CLOSE_URL = `/app/clients/detail/${
              this.props.clientDetail.payload.Id
            }/notes`;
            return (
              <Modal title="Add Client Note" closeUrl={CLOSE_URL}>
                <ClientNoteFormContainer
                  dispatchActionOnCloseParams={
                    this.props.clientDetail.payload.Id
                  }
                  redirectOnSuccess={CLOSE_URL}
                >
                  <AddClientNoteForm
                    clientId={this.props.clientDetail.payload.Id}
                  />
                </ClientNoteFormContainer>
              </Modal>
            );
          }}
        />
        <PageHeader>
          <PageTitle inline>{this.props.title}</PageTitle>
          <Link
            to={
              '/app/clients/detail/' +
              this.props.clientDetail.payload.Id +
              '/notes/add'
            }
            className="pt-button pt-intent-primary"
          >
            <i className="fa fa-comment" />
            &nbsp;Add New Note
          </Link>
        </PageHeader>
        <PageBody>{this.renderNoteCards()}</PageBody>
      </Page>
    );
  }
}

export default ClientNotes;
