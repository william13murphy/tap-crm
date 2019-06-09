import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import Modal from 'components/Modal';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import {
  appContextGetSchoolId,
  appContextSetSchoolId,
} from 'src/redux/actionCreators/appContext';
import connect from 'src/redux/connect';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

type ClientSchoolsDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  dispatchAppContextSetSchoolId: any,
};

class ClientSchoolsDataGrid extends React.Component {
  props: ClientSchoolsDataGridProps;
  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Name',
          accessor: 'Name',
        },
        {
          Header: 'Email',
          accessor: 'Email',
        },
        {
          Header: 'PrimaryPhone',
          accessor: 'PrimaryPhone',
        },
        {
          Header: 'TimeZoneId',
          accessor: 'TimeZoneId',
          Cell: rowInfo => {
            return (
              <ReferenceOutput id={rowInfo.value} listName="LstTimeZones" />
            );
          },
        },
        {
          Header: 'Country',
          accessor: 'CountryId',
          Cell: rowInfo => {
            return (
              <ReferenceOutput id={rowInfo.value} listName="LstCountries" />
            );
          },
        },
      ],
    };
  }
  render() {
    if (!this.props.data || this.props.data.length == 0) {
      return <NoDataMessage />;
    }
    return (
      <DefaultReactTable
        className="linked-row has-action"
        data={this.props.data}
        columns={this.state.columns}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            this.props.dispatchAppContextSetSchoolId(rowInfo.original.Id);
            this.props.history.push(
              `/app/school-app/${rowInfo.original.Id}/dashboard`
            );
          },
        })}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    dispatchAppContextGetSchoolId: defaultId => {
      dispatch(appContextGetSchoolId(defaultId));
    },
    dispatchAppContextSetSchoolId: id => {
      dispatch(appContextSetSchoolId(id));
    },
  };
};

export default connect(
  ClientSchoolsDataGrid,
  mapStateToProps,
  mapDispatchToProps
);
