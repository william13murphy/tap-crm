import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';

import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';

import './styles.less';

type ContactsGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  references: {
    payload: Array<{}>,
  },
  studentId: string,
};

class ContactsGrid extends React.Component {
  props: ContactsGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'First Name',
          accessor: 'FirstName',
        },
        {
          Header: 'Last Name',
          accessor: 'LastName',
        },
        {
          Header: 'Relationship',
          accessor: 'RelationshipTypeId',
          Cell: row => (
            <ReferenceOutput
              listName="LstRelationshipTypes"
              references={props.references.payload}
              id={row.original.RelationshipTypeId}
            />
          ),
        },
        {
          Header: 'Phone Number',
          accessor: 'PhoneNumber',
        },
        {
          Header: 'Email',
          accessor: 'Email',
        },
        {
          Header: 'Primary Contact',
          accessor: 'IsPrimary',
        },
        {
          Header: 'Billing Contact',
          accessor: 'IsBilling',
        },
        {
          Header: 'Actions',
          accessor: 'Actions',
          Cell: row => (
            <div className="Action__cell">
              <Link
                className="pt-button"
                to={`/app/school-app/${this.props.schoolId}/students/detail/${
                  this.props.studentId
                }/contacts/${row.original.ContactId}/view`}
              >
                <i
                  className="Icon IconView fa fa-eye"
                  aria-hidden="true"
                  title="View"
                />
              </Link>
              &nbsp;&nbsp;
              <Link
                className="pt-button"
                to={{
                  pathname: `/app/school-app/${
                    this.props.schoolId
                  }/students/detail/${this.props.studentId}/contacts/${
                    row.original.Id
                  }/edit`,
                  state: { initialValues: row.original },
                }}
              >
                <i
                  className="Icon IconEdit fa fa-pencil"
                  aria-hidden="true"
                  title="Edit"
                />
              </Link>
              &nbsp;&nbsp;
              <Link
                className="pt-button"
                to={`/app/school-app/${this.props.schoolId}/students/detail/${
                  this.props.studentId
                }/contacts/${row.original.Id}/delete`}
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
    if (this.props.data.length === 0) {
      return (
        <div className="StudentContactsGrid">
          <h4 className='emptyTable'>No Contacts Found</h4>
        </div>
      );
    }
    return (
      <div className="StudentContactsGrid">
        <DefaultReactTable
          pageSize={this.props.data.length}
          className="linked-row"
          data={this.props.data}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
  };
};

export default connect(
  ContactsGrid,
  mapStateToProps
);
