import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { Link, Route } from 'react-router-dom';
import Modal from 'components/Modal';
import EFCContactUserProfile from './EFCContactUserProfile';
import ClientContactSaveFormContainer from 'containers/Client/ClientContactSaveFormContainer';

type InternalClientContactsDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
};

class InternalClientContactsDataGrid extends React.Component {
  props: InternalClientContactsDataGridProps;
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
                    title="View EFC Contact"
                    closeUrl={`/app/clients/detail/${
                      row.original.ClientId
                    }/contacts`}
                  >
                    <EFCContactUserProfile user={row.original} />
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

export default InternalClientContactsDataGrid;
