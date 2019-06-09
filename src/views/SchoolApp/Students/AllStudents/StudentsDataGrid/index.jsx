import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import { roles, authorizeRole } from 'util/auth/roles';
import AvatarBlank from 'assets/images/avatar_blank.png';
import { getReferenceItemOptions } from 'api/referenceItems';

import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import PrivateComponent from 'components/Auth/PrivateComponent';
import './styles.less';

type StudentsDataGridProps = {
  schoolId: string,
  data: Array<{}>,
  history: {
    push: any,
  },
  references: Array<{}>,
};

class StudentsDataGrid extends React.PureComponent {
  props: StudentsDataGridProps;

  componentWillMount() {
    if (roles.SUBSET_EFC_STAFF.includes(this.props.role)) {
      this.setState({ deleteEnabled: true });
    } else {
      this.setState({ deleteEnabled: false });
    }
  }

  render() {
    const columns = [
      {
        Header: '',
        accessor: 'PictureBlobUrl',
        Cell: row => {
          const profilePicture = row.original.PictureBlobUrl || AvatarBlank;
          return <img src={profilePicture} width="40" height="40" />;
        },
        sortable: false,
        filterable: false,
        width: 53,
      },
      {
        Header: 'First Name',
        accessor: 'FirstName',
      },
      {
        Header: 'Last Name',
        accessor: 'LastName',
      },
      {
        Header: 'Email',
        accessor: 'Email',
        Cell: row => (
          <div>
            <span className="SendEmail__cell" title="Send an Email">
              {row.value}
            </span>
          </div>
        ),
      },
      {
        Header: 'Program',
        accessor: 'Program',
        Cell: props => {
          if (props.original.ProgramCount > 1) {
            return (
              <div>{props.original.Program} and {props.original.ProgramCount} more</div>
            );
          } else {
            return (
              <div>{props.original.Program || ''}</div>
            );
          }
        },
      },
      {
        Header: 'Rank',
        accessor: 'Rank',
        Cell: props => {
          if (props.original.RankCount > 1) {
            return (
              <div>{props.original.Rank} and {props.original.RankCount} more</div>
            );
          } else {
            return (
              <div>{props.original.Rank || ''}</div>
            );
          }
        },
      },
      {
        Header: 'Status',
        accessor: 'StatusTypeId',
        Cell: props => {
          if (props.original.StatusTypeId) {
            return (
              <ReferenceOutput
                listName="LstStudentStatusTypes"
                id={props.original.StatusTypeId}
                references={this.props.references}
              />
            );
          } else {
            return null;
          }
        },
        filterMethod: (filter, row) => {
          if (filter.value === 'all') {
            return true;
          }
          if (filter.value === 'active') {
            return row[filter.id] === 'f74a4642-46f3-49ac-9802-f5b082e79407';
          }
          if (filter.value === 'inactive') {
            return row[filter.id] === 'e52c8bd7-669e-47f2-9851-06034ef6528c';
          }
          if (filter.value === 'softexit') {
            return row[filter.id] === 'd419da01-c4b0-46e2-b039-fedd336e2dfc';
          }
          return true;
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}
          >
            <option value="all">All Students</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="softexit">Soft Exit</option>
          </select>
        ),
      },
      {
        Header: 'Action',
        accessor: 'Action',
        className: 'Action',
        filterable: false,
        minWidth: 50,
        Cell: row => (
          <div
            className={`Action__cell ${
              !this.state.deleteEnabled ? 'disabled' : ''
            }`}
          >
            <Link
              className="pt-button"
              to={`${this.props.match.url}/delete/${row.original.StudentId}`}
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
    ];

    return (
      <DynamicHeightReactTable
        className="StudentsDataGrid linked-row"
        data={this.props.data}
        columns={columns}
        getTdProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            if (column.Header === 'Email') {
              this.props.history.push({
                pathname: `/app/school-app/${
                  this.props.schoolId
                }/students/all/${rowInfo.original.StudentId}/send-email`,

                state: {
                  studentId: rowInfo.original.StudentId,
                  schoolId: rowInfo.original.SchoolId,
                  firstName: rowInfo.original.FirstName,
                  lastName: rowInfo.original.LastName,
                  prevPath: location.pathname,
                },
              });
            } else if (column.id !== 'Action') {
              this.props.history.push(
                `/app/school-app/${this.props.schoolId}/students/detail/${
                  rowInfo.original.StudentId
                }`
              );
            }
          },
        })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
    role: state.token.payload.Role,
  };
};

export default connect(
  StudentsDataGrid,
  mapStateToProps
);
