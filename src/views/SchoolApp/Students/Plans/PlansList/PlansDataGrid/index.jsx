import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import { roles, authorizeRole } from 'util/auth/roles';

import BooleanToYesNo from 'components/BooleanToYesNo';
import PrivateComponent from 'components/Auth/PrivateComponent';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import './styles.less';

type PlansDataGridProps = {
  data: Array<{}>,
  schoolId: string,
  history: {
    push: any,
  },
};

class PlansDataGrid extends React.Component {
  props: PlansDataGridProps;

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
        Header: 'Owner',
        accessor: 'OwnerId',
        Cell: row => {
          const owner = this.props.owners.payload.filter(o => {
            return o.Id === row.value;
          })[0];

          if (owner) {
            return (
              <div>
                {owner.FirstName} {owner.LastName}
              </div>
            );
          } else {
            return null;
          }
        },
        filterMethod: (filter, row) => {
          let matchedItem = this.props.owners.payload.find(
            item => item.Id === row.OwnerId
          );
          if (matchedItem) {
            let obj = {
              ...row,
              Name: matchedItem.FirstName + ' ' + matchedItem.LastName,
            };
            return filterPayloadMethod(filter, obj, 'Name');
          }
        },
        Filter: filter,
      },
      {
        Header: 'Plan Start Date',
        accessor: 'PlanStartDate',
        Cell: row => <span>{moment(row.value).format('MMMM D, YYYY')}</span>,
      },
      {
        Header: 'Plan End Date',
        accessor: 'PlanEndDate',
        Cell: row => {
          if (row.value === '9999-12-31T00:00:00') {
            return <span />;
          } else {
            return <span>{moment(row.value).format('MMMM D, YYYY')}</span>;
          }
        },
      },
      {
        Header: 'Finalized',
        accessor: 'Finalized',
        Cell: row => (
          <BooleanToYesNo
            color
            bool={row.original.Finalized}
            yes="Finalized"
            no="Not Finalized"
          />
        ),
      },
      {
        Header: 'Active',
        accessor: 'TerminiationDate',
        Cell: row => {
          let active = false;
          if (row.original.Finalized && !row.original.TerminiationDate) {
            active = true;
          }
          return (
            <BooleanToYesNo color bool={active} yes="Active" no="Inactive" />
          );
        },
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
        className="linked-row has-action"
        data={this.props.data}
        columns={columns}
        getTdProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            if (column.id !== 'Action') {
              this.props.history.push(
                `${this.props.url}/detail/${rowInfo.original.Id}`
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
    owners: state.student.owners,
    role: state.token.payload.Role,
  };
};

export default connect(
  PlansDataGrid,
  mapStateToProps
);
