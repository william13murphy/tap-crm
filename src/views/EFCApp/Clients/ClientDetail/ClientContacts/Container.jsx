import React from 'react';
import connect from 'src/redux/connect';
import {
  getExternalContactsFromContactsList,
  getInternalContactsFromContactsList,
} from 'api/referenceItems';

type ClientContactsContainerProps = {
  children: React.Element<any>,
  clientDetail: {
    payload: {
      Id: string,
      Contacts: Array<{
        User: {},
      }>,
    },
  },
  references: Array<{}>,
};

class ClientContactsContainer extends React.Component {
  props: ClientContactsContainerProps;
  getExternalContacts() {
    if (this.props.clientDetail.payload.Contacts) {
      return getExternalContactsFromContactsList(
        this.props.references,
        this.props.clientDetail.payload.Contacts
      );
    } else {
      return null;
    }
  }
  getInternalContacts() {
    if (this.props.clientDetail.payload.Contacts) {
      return getInternalContactsFromContactsList(
        this.props.references,
        this.props.clientDetail.payload.Contacts
      );
    } else {
      return null;
    }
  }
  render() {
    const clientContactsProps = {
      id: this.props.clientDetail.payload.Id,
      internalContacts: this.getInternalContacts(),
      externalContacts: this.getExternalContacts(),
    };
    return (
      <div>
        {React.cloneElement(this.props.children, { ...clientContactsProps })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    references: state.utility.references,
    clientDetail: state.client.detail,
  };
}

export default connect(
  ClientContactsContainer,
  mapStateToProps
);
