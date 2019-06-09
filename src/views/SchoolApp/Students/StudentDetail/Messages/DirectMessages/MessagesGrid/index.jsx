import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { Link } from 'react-router-dom';
import { getReferenceItemOptions } from 'api/referenceItems';
import moment from 'moment';
import connect from 'src/redux/connect';

import './styles.less';

type MessagesGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  schoolId: string,
  studentId: string,
};

class MessagesGrid extends React.Component {
  props: MessagesGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Created On',
          accessor: 'CreatedOn',
          Cell: props => (
            <span className="date">
              {props.value && moment(props.value).format('YYYY-MM-DD')}
            </span>
          ),
        },
        {
          Header: 'Detail',
          accessor: 'Detail',
        },
        {
          Header: 'Type',
          accessor: 'MessageTypeId',
          Cell: props => {
            let items = getReferenceItemOptions(
              'LstMessageTypes',
              this.props.references
            );
            let matchedItem = items.find(item => item.value === props.value);
            return <span>{matchedItem.label}</span>;
          },
          filterMethod: (filter, row) => {
            let items = getReferenceItemOptions(
              'LstMessageTypes',
              this.props.references
            );

            if (filter.value === 'all') {
              return true;
            }

            if (filter.value === 'Alert') {
              return row[filter.id] === items[0].value;
            }
            if (filter.value === 'Accolade') {
              return row[filter.id] === items[1].value;
            }
            if (filter.value === 'Event') {
              return row[filter.id] === items[2].value;
            }
            return true;
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: '100%' }}
              value={filter ? filter.value : 'all'}
            >
              <option value="all">All</option>
              <option value="Alert">Alert</option>
              <option value="Accolade">Accolade</option>
              <option value="Event">Event</option>
            </select>
          ),
        },
        {
          Header: 'Actions',
          accessor: 'Actions',
          Cell: row => (
            <div className="Action__cell">
              <Link
                className="pt-button"
                to={{
                  pathname: `${this.props.match.url}/${row.original.Id}/edit`,
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
                to={`${this.props.match.url}/${row.original.Id}/delete`}
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
    if (this.props.data.payload.length === 0) {
      return (
        <div className="MessagesGrid">
          <h4 className="emptyTable">No Messages Found</h4>
        </div>
      );
    }

    return (
      <div className="MessagesGrid">
        <DynamicHeightReactTable
          pageSize={this.props.data.payload.length}
          className="linked-row"
          data={this.props.data.payload}
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
  MessagesGrid,
  mapStateToProps
);
