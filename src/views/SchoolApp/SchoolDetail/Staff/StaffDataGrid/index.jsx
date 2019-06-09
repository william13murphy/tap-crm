import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import tempClaims from 'src/redux/data/tempClaims.js';
import { roles, authorizeRole } from 'util/auth/roles';
import AvatarBlank from 'assets/images/avatar_blank.png';

import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import './styles.less';

type StaffDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
};

class StaffDataGrid extends React.Component {
  props: StaffDataGridProps;
  state = {
    data: [],
    columns: [
      {
        Header: 'Name',
        accessor: 'User.Profile',
        Cell: row => {
          return (
            <div className="Staff">
              <img className="Staff__image" src={row.value.Picture} />
              <div className="Staff__name">
                <span>{row.value.Name}</span>
              </div>
            </div>
          );
        },
        filterMethod: (filter, row) => {
          let obj = {
            ...row,
            Name:
              row['User.Profile'].FirstName +
              ' ' +
              row['User.Profile'].LastName,
          };

          return filterPayloadMethod(filter, obj, 'Name');
        },
        Filter: filter,
      },
      {
        Header: 'Role',
        accessor: 'User.Claims[0].ClaimValue',
        Cell: rowInfo => {
          let matched = tempClaims.find(item => item.m_Item1 === rowInfo.value);
          if (matched) {
            return matched.m_Item2;
          }
        },
      },
      {
        Header: 'Email',
        accessor: 'User.Email',
      },
      {
        Header: 'Telephone',
        accessor: 'User.PhoneNumber',
      },
      // {
      //   Header: 'Action',
      //   accessor: 'Action',
      //   className: 'Action',
      //   filterable: false,
      //   minWidth: 50,
      //   Cell: row => (
      //     <div className="Action__cell">
      //       <Link
      //         className="pt-button"
      //         to={`${this.props.match.url}/delete/${row.original.Id}`}
      //       >
      //         <i
      //           className="Icon IconDelete fa fa-trash"
      //           aria-hidden="true"
      //           title="Delete"
      //         />
      //       </Link>
      //     </div>
      //   ),
      // },
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
    ],
  };

  componentWillMount() {
    const externalContactTypeId = '6e088e9f-c7b3-437e-bf91-4b780ef8f49b'; // External contact (School Contact)
    let payload = this.props.data.payload
      .filter(item => {
        return item.ContactTypeId === externalContactTypeId;
      })
      .map(item => {
        item.User.Profile.Name =
          item.User.Profile.FirstName + ' ' + item.User.Profile.LastName;

        item.User.Profile.Picture =
          item.User.Profile.PictureBlobUrl || AvatarBlank;
        return item;
      });
    this.setState({
      data: {
        payload,
      },
    });

    if (roles.SUBSET_EFC_STAFF.includes(this.props.role)) {
      this.setState({ deleteEnabled: true });
    } else {
      this.setState({ deleteEnabled: false });
    }
  }

  render() {
    if (this.state.data.payload.length > 0) {
      return (
        <div className="StaffContainer">
          <DynamicHeightReactTable
            className="linked-row has-action"
            data={this.state.data.payload}
            columns={this.state.columns}
            getTdProps={(state, rowInfo, column, instance) => ({
              onClick: () => {
                if (column.id !== 'Action') {
                  this.props.history.push(
                    `/app/school-app/${
                      rowInfo.original.SchoolId
                    }/school-detail/staff/detail/${rowInfo.original.Id}`
                  );
                }
              },
            })}
          />
        </div>
      );
    } else {
      return <div>No staff found.</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
    role: state.token.payload.Role,
  };
};

export default connect(
  StaffDataGrid,
  mapStateToProps
);
