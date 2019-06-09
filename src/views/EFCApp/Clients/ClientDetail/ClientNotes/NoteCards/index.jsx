import React from 'react';
import NoteCard from 'components/NoteCard';

import { Route } from 'react-router-dom';
import Modal from 'components/Modal';
import ClientNoteFormContainer from 'containers/Client/ClientNoteFormContainer';
import AddClientNoteForm from '../AddClientNoteForm';

type NoteCardsProps = {
  cardLimit?: number,
  editable?: boolean,
  clientId: string,
  cards: Array<{
    title: string,
    detail: string,
  }>,
};

class NoteCards extends React.Component {
  props: NoteCardsProps;
  renderNoteCards() {
    if (this.props.cards) {
      return this.props.cards.map((cV, i) => {
        // TODO: Sort cards by date, and trim older cards only.
        if (this.props.cardLimit) {
          if (i >= this.props.cardLimit) {
            return null;
          }
        }
        if (!this.props.editable) {
          return (
            <li className="NoteCard__wrapper" key={i}>
              <NoteCard
                title={cV.Title}
                detail={cV.Detail}
                createdOn={cV.CreatedOn}
                type={cV.NoteTypeId}
              />
            </li>
          );
        } else {
          const EDIT_FORM_PATH = `/app/clients/detail/${
            this.props.clientId
          }/notes/${this.props.cards[i].Id}`;
          const CLOSE_URL = `/app/clients/detail/${this.props.clientId}/notes`;
          return (
            <li className="NoteCard__wrapper" key={i}>
              <Route
                path={EDIT_FORM_PATH}
                render={() => (
                  <Modal title="Edit Client Note" closeUrl={CLOSE_URL}>
                    <ClientNoteFormContainer
                      dispatchActionOnCloseParams={this.props.clientId}
                      redirectOnSuccess={CLOSE_URL}
                    >
                      <AddClientNoteForm
                        initialValues={cV}
                        clientId={this.props.clientId}
                      />
                    </ClientNoteFormContainer>
                  </Modal>
                )}
              />
              <NoteCard
                title={cV.Title}
                detail={cV.Detail}
                createdOn={cV.CreatedOn}
                type={cV.NoteTypeId}
                editLink={EDIT_FORM_PATH}
              />
            </li>
          );
        }
      });
    } else {
      return <li className="pt-card pt-elevation-1">No notes found.</li>;
    }
  }
  render() {
    return (
      <div className="NoteCards__wrapper">
        <ul className="NoteCards">{this.renderNoteCards()}</ul>
      </div>
    );
  }
}

export default NoteCards;
