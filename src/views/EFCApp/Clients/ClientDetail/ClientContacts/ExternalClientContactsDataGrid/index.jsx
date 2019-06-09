import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { Link, Route } from 'react-router-dom';
import Modal from 'components/Modal';
import AddExternalClientContact from '../AddExternalClientContactForm';
import ClientContactUserProfile from './ClientContactUserProfile';
import ClientContactSaveFormContainer from 'containers/Client/ClientContactSaveFormContainer';

type ExternalClientContactsDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
};

class ExternalClientContactsDataGrid extends React.Component {
  props: ExternalClientContactsDataGridProps;
  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'First Name',
          accessor: 'User.Profile.FirstName',
        },
        {
          Header: 'Last Name',
          accessor: 'User.Profile.LastName',
        },
        {
          Header: 'Email',
          accessor: 'User.Email',
        },
        {
          Header: 'Action',
          accessor: 'Action',
          className: 'Action',
          filterable: false,
          minWidth: 50,
          Cell: row => (
            <div className="Action__cell">
              <Route
                path={`/app/clients/detail/${
                  row.original.ClientId
                }/contacts/view/${row.original.Id}`}
                render={() => (
                  <Modal
                    title="View Client Contact"
                    closeUrl={`/app/clients/detail/${
                      row.original.ClientId
                    }/contacts`}
                  >
                    <ClientContactUserProfile user={row.original} />
                  </Modal>
                )}
              />
              <Route
                path={`/app/clients/detail/${
                  row.original.ClientId
                }/contacts/edit/${row.original.Id}`}
                render={() => (
                  <Modal
                    title="Edit Client Contact"
                    closeUrl={`/app/clients/detail/${
                      row.original.ClientId
                    }/contacts`}
                  >
                    <ClientContactSaveFormContainer
                      dispatchActionOnClose={this.props.dispatchReferencesFetch}
                      redirectOnSuccess={`/app/clients/detail/${
                        row.original.ClientId
                      }/contacts`}
                    >
                      <AddExternalClientContact initialValues={row.original} />
                    </ClientContactSaveFormContainer>
                  </Modal>
                )}
              />
              <Link
                className="pt-button"
                to={`/app/clients/detail/${
                  row.original.ClientId
                }/contacts/view/${row.original.Id}`}
              >
                <i
                  className="Icon IconView fa fa-eye"
                  aria-hidden="true"
                  title="View"
                />
              </Link>
              &nbsp;
              <Link
                className="pt-button"
                to={`/app/clients/detail/${
                  row.original.ClientId
                }/contacts/edit/${row.original.Id}`}
              >
                <i
                  className="Icon IconEdit fa fa-pencil"
                  aria-hidden="true"
                  title="Edit"
                />
              </Link>
              &nbsp;
              <Link
                className="pt-button"
                to={`/app/clients/detail/${
                  row.original.ClientId
                }/contacts/delete/${row.original.Id}`}
              >
                <i
                  className="Icon IconDelete fa fa-trash"
                  aria-hidden="true"
                  title="Delete"
                />
              </Link>
            </div>
          ),
        },
      ],
    };
  }
  render() {
    return (
      <DefaultReactTable
        className="linked-row has-action"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}

export default ExternalClientContactsDataGrid;
