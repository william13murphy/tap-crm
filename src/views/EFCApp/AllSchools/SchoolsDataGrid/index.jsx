import React from 'react';
import connect from 'src/redux/connect';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { appContextSetSchoolId } from 'src/redux/actionCreators/appContext';
import AvatarBlank from 'assets/images/avatar_blank.png';
import { Link } from 'react-router-dom';
import { getReferenceItems } from 'api/referenceItems';

type SchoolsDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  dispatchAppContextSetSchoolId: Function,
};

class SchoolsDataGrid extends React.Component {
  props: SchoolsDataGridProps;
  state = {
    columns: [
      {
        Header: '',
        accessor: 'LogoBlobUrl',
        Cell: row => {
          const profilePicture = row.original.LogoBlobUrl || AvatarBlank;
          return <img src={profilePicture} width="40" height="40" />;
        },
        sortable: false,
        filterable: false,
        width: 53,
      },
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Email',
        accessor: 'Email',
      },
      {
        Header: 'Telephone',
        accessor: 'PrimaryPhone',
      },
      {
        Header: 'Country',
        accessor: 'CountryId',
        Cell: row => {
          const countryTypes = getReferenceItems(
            'LstCountries',
            this.props.references
          );

          let countryName = countryTypes.find(
            element => element.Id === row.original.CountryId
          );
          return <span>{countryName.Description}</span>;
        },
      },
      {
        Header: 'Action',
        accessor: 'Action',
        className: 'Action',
        filterable: false,
        minWidth: 50,
        Cell: row => {
          return (
            <div className="Action__cell">
              <Link className="pt-button" to={`/app/delete/${row.original.Id}`}>
                <i
                  className="Icon IconDelete fa fa-trash"
                  aria-hidden="true"
                  title="Delete"
                />
              </Link>
            </div>
          );
        },
      },
    ],
  };
  render() {
    return (
      <DynamicHeightReactTable
        className="linked-row has-action"
        data={this.props.data.payload}
        columns={this.state.columns}
        getTdProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            if (column.id !== 'Action') {
              this.props.dispatchAppContextSetSchoolId(rowInfo.original.Id);
              this.props.history.push(
                `/app/school-app/${rowInfo.original.Id}/dashboard`
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchAppContextSetSchoolId: id => {
      dispatch(appContextSetSchoolId(id));
    },
  };
};

export default connect(
  SchoolsDataGrid,
  mapStateToProps,
  mapDispatchToProps
);
