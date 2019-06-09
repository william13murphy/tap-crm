import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import { roles, authorizeRole } from 'util/auth/roles';
import { filterPayloadMethod, filter } from 'util/tableFilter';
import { localDateFormat } from 'util/localization/localValues';
import { calculateLocalDateTimeFromUTCDateAndTime } from 'src/util/localization/timezone';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import './styles.less';

type ProgramsGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  schoolId: string,
  match: {
    path: string,
    url: string,
  },
};

class ProgramsGrid extends React.PureComponent {
  props: ProgramsGridProps;

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
        Header: 'Program Name',
        accessor: 'Name',
      },
      {
        Header: 'Description',
        accessor: 'Description',
      },
      {
        Header: 'Is Active',
        accessor: 'Public',
        Cell: row => {
          if (row.value) return 'Yes';
          return 'No';
        },
      },
      {
        Header: 'CreatedOn',
        accessor: 'CreatedOn',
        Cell: rowInfo => {
          return moment(rowInfo.value).format(localDateFormat());
        },
        filterMethod: (filter, row) => {
          let obj = {
            ...row,
            CreatedOn: row._original.CreatedOn,
          };
          return filterPayloadMethod(filter, obj, 'CreatedOn');
        },
        Filter: filter,
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
      <div>
        <DynamicHeightReactTable
          pageSize={this.props.data.payload}
          className="linked-row has-action"
          data={this.props.data}
          columns={columns}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              if (column.id !== 'Action') {
                this.props.history.push(
                  `/app/school-app/${
                    this.props.schoolId
                  }/school-detail/programs/detail/${rowInfo.original.Id}`
                );
              }
            },
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    role: state.token.payload.Role,
  };
};

export default connect(
  ProgramsGrid,
  mapStateToProps
);
