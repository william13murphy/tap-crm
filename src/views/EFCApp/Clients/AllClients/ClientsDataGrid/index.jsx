import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';

type ClientsDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  match: {
    path: string,
    url: string,
  },
};

class ClientsDataGrid extends React.Component {
  props: ClientsDataGridProps;
  state = {
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
        Header: 'Telephone',
        accessor: 'PrimaryPhone',
      },
      {
        Header: 'Action',
        accessor: 'Action',
        className: 'Action',
        filterable: false,
        minWidth: 50,
        Cell: row => (
          <div className="Action__cell">
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
              this.props.history.push(
                `/app/clients/detail/${rowInfo.original.Id}/summary`
              );
            }
          },
        })}
      />
    );
  }
}

export default connect(ClientsDataGrid);
