import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { Link, Route } from 'react-router-dom';
import Modal from 'components/Modal';
import SchoolContactFormContainer from 'containers/School/SchoolContactFormContainer';
import SchoolContactDeleteContainer from 'containers/School/SchoolContactDeleteContainer';
import AddSchoolContactForm from '../AddSchoolContactForm';
import SchoolContactUserProfile from './SchoolContactUserProfile';
import ConfirmDialog from 'components/ConfirmDialog';
import ReadOnlyMessage from 'components/DataLoading/ReadOnlyMessage';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

type SchoolContactsDataGridProps = {
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

class SchoolContactsDataGrid extends React.Component {
  props: SchoolContactsDataGridProps;
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
                path={`${this.props.match.path}/view/${row.original.Id}`}
                render={() => (
                  <Modal
                    title="View School Contact"
                    closeUrl={this.props.match.url}
                  >
                    <SchoolContactUserProfile user={row.original} />
                  </Modal>
                )}
              />
              <Route
                path={`${this.props.match.path}/edit/${row.original.Id}`}
                render={() => {
                  return (
                    <Modal
                      title="Edit School Contact"
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
                      title="Delete School Contact"
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
                to={`${this.props.match.url}/edit/${row.original.Id}`}
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
      schoolFilteredContacts: [],
    };
  }
  componentDidMount() {
    if (this.props.data) {
      const schoolContacts = this.props.data.filter(
        item =>
          item.ContactTypeId === '6e088e9f-c7b3-437e-bf91-4b780ef8f49b' &&
          item.Preffered
      );

      this.setState({
        schoolFilteredContacts: schoolContacts,
      });
    }
  }

  render() {
    if (this.state.schoolFilteredContacts.length > 0) {
      return (
        <DefaultReactTable
          className="linked-row has-action"
          data={this.state.schoolFilteredContacts}
          columns={this.state.columns}
        />
      );
    } else {
      return <NoDataMessage errorMessage="No School Contacts Found" />;
    }
  }
}

export default SchoolContactsDataGrid;
