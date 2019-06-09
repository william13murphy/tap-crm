import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { Link, Route } from 'react-router-dom';
import Modal from 'components/Modal';
import SchoolContactFormContainer from 'containers/School/SchoolContactFormContainer';
import SchoolContactDeleteContainer from 'containers/School/SchoolContactDeleteContainer';
import AddSchoolContactForm from '../AddSchoolContactForm';
import EfcContactUserProfile from './EfcContactUserProfile';
import ConfirmDialog from 'components/ConfirmDialog';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

type EfcContactDataGridProps = {
  data: {},
  history: {
    push: any,
  },
  dispatchSchoolContactsFetch: any,
  match: {
    path: string,
    url: string,
  },
};

class EfcContactDataGrid extends React.Component {
  props: EfcContactDataGridProps;
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
          Header: 'Title',
          accessor: 'User.Profile.Title',
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
                path={`${this.props.match.path}/view/${row.original.Id}`}
                render={() => (
                  <Modal
                    title="View EFC Contact"
                    closeUrl={this.props.match.url}
                  >
                    <EfcContactUserProfile user={row.original} />
                  </Modal>
                )}
              />
              <Route
                path={`${this.props.match.path}/edit/${row.original.Id}`}
                render={() => {
                  return (
                    <Modal
                      title="Edit EFC Contact"
                      closeUrl={this.props.match.url}
                    >
                      <SchoolContactFormContainer
                        dispatchActionOnClose={
                          this.props.dispatchSchoolContactsFetch
                        }
                        dispatchActionOnCloseParams={row.original.SchoolId}
                        redirectOnSuccess={this.props.match.url}
                      >
                        <AddSchoolContactForm
                          initialValues={row.original}
                          schoolId={row.original.SchoolId}
                        />
                      </SchoolContactFormContainer>
                    </Modal>
                  );
                }}
              />
              <Route
                path={`${this.props.match.path}/delete/${row.original.Id}`}
                render={() => {
                  return (
                    <Modal
                      title="Delete EFC Contact"
                      closeUrl={this.props.match.url}
                    >
                      <SchoolContactDeleteContainer
                        dispatchActionOnCloseParams={row.original.SchoolId}
                        redirectOnSuccess={this.props.match.url}
                      >
                        <ConfirmDialog
                          title="Are you sure you want to delete?"
                          closeUrl={this.props.match.url}
                          id={row.original.Id}
                        />
                      </SchoolContactDeleteContainer>
                    </Modal>
                  );
                }}
              />
              <Link
                className="pt-button"
                to={`${this.props.match.url}/view/${row.original.Id}`}
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
                to={`${this.props.match.url}/delete/${row.original.Id}`}
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

      efcFilteredContacts: [],
    };
  }

  componentDidMount() {
    if (this.props.data) {
      const efcContacts = this.props.data.filter(
        item => item.ContactTypeId === 'c115673a-37b9-45ef-969a-8df016cff788'
      );

      this.setState({
        efcFilteredContacts: efcContacts,
      });
    }
  }
  render() {
    if (this.state.efcFilteredContacts.length > 0) {
      return (
        <DefaultReactTable
          className="linked-row has-action"
          data={this.state.efcFilteredContacts}
          columns={this.state.columns}
        />
      );
    } else {
      return <NoDataMessage errorMessage="No EFC Contacts Found" />;
    }
  }
}

export default EfcContactDataGrid;
