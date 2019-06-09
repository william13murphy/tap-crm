import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

type ClientContactsSummaryProps = {
  id: string,
  internalContacts: [],
  externalContacts: [],
};

class ClientContactsSummary extends React.Component {
  props: ClientContactsSummaryProps;
  renderInternalContacts() {
    if (this.props.internalContacts) {
      return (
        <div>
          <h3>EFC Contact</h3>
          <ul>
            {this.props.internalContacts.map((cV, i) => {
              return (
                <li
                  className="SummaryCard ContactCard internal pt-card"
                  key={i}
                >
                  <Link to={`/app/admin/staff/detail/${cV.User.Id}`}>
                    {cV.User.Profile.FirstName} {cV.User.Profile.LastName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No EFC Contacts found.</div>;
    }
  }
  renderExternalContacts() {
    if (this.props.externalContacts) {
      return (
        <div>
          <h3>Preferred Client Contact</h3>
          <ul>
            {this.props.externalContacts.map((cV, i) => {
              if (cV.Preffered) {
                return (
                  <li
                    className="SummaryCard ContactCard external pt-card"
                    key={i}
                  >
                    <Link
                      to={`/app/clients/detail/${this.props.id}/contacts/view/${
                        cV.Id
                      }`}
                    >
                      {cV.User.Profile.FirstName} {cV.User.Profile.LastName}
                    </Link>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Client Contacts found.</div>;
    }
  }
  render() {
    return (
      <div className="ClientContactsSummary pt-card pt-elevation-1">
        {this.renderInternalContacts()}
        {this.renderExternalContacts()}
      </div>
    );
  }
}

export default ClientContactsSummary;
