import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { getReferenceItemOptions } from 'api/referenceItems';
import {
  calculateLocalDateTimeFromUTCDateAndTime,
  getTimeZoneLabel,
} from 'src/util/localization/timezone';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import './styles.less';

type OutboxGridProps = {
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

class OutboxGrid extends React.Component {
  props: OutboxGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Type',
          accessor: 'TemplateModeId',
          Cell: props => {
            let items = getReferenceItemOptions(
              'LstOutboxMessageMode',
              this.props.references
            );
            let matchedItem = items.find(item => item.value === props.value);
            return <span>{matchedItem.label}</span>;
          },
          filterMethod: (filter, row) => {
            let items = getReferenceItemOptions(
              'LstOutboxMessageMode',
              this.props.references
            );

            if (filter.value === 'all') {
              return true;
            }

            if (filter.value === 'SMS') {
              return row[filter.id] === items[0].value;
            }
            if (filter.value === 'Email') {
              return row[filter.id] === items[1].value;
            }
            if (filter.value === 'Letter') {
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
              <option value="SMS">SMS</option>
              <option value="Email">Email</option>
              <option value="Letter">Letter</option>
            </select>
          ),
        },
        {
          Header: 'Status',
          accessor: 'MessageStatusId',
          Cell: props => {
            let items = getReferenceItemOptions(
              'LstOutboxMessageStatus',
              this.props.references
            );
            let matchedItem = items.find(item => item.value === props.value);
            return <span>{matchedItem.label}</span>;
          },
          filterMethod: (filter, row) => {
            let items = getReferenceItemOptions(
              'LstOutboxMessageStatus',
              this.props.references
            );

            if (filter.value === 'All') {
              return true;
            }
            if (filter.value === 'Pending') {
              return row[filter.id] === items[0].value;
            }
            if (filter.value === 'Sent') {
              return row[filter.id] === items[1].value;
            }
            if (filter.value === 'Fail') {
              return row[filter.id] === items[2].value;
            }
            return true;
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: '100%' }}
              value={filter ? filter.value : 'All'}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Sent">Sent</option>
              <option value="Fail">Fail</option>
            </select>
          ),
        },
        {
          Header: 'Sent On',
          accessor: 'CreatedOn',
          Cell: rowInfo => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.state.schoolTimeZone,
              rowInfo.original.CreatedOn,
              rowInfo.original.CreatedOn
            );
            return (
              <span className="date">
                {rowInfo.value && localDate.format('MMMM Do YYYY, h:mm a')}
              </span>
            );
          },
        },
        {
          Header: 'Subject',
          accessor: 'Subject',
        },
        {
          Header: 'Message',
          accessor: 'Message',
        },
      ],
    };
  }

  componentWillMount() {
    this.setSchoolTimeZone();
  }

  setSchoolTimeZone() {
    let schoolTimeZone = getTimeZoneLabel(
      this.props.references,
      this.props.schoolProfile.payload.TimeZoneId
    );

    this.setState({
      schoolTimeZone,
    });
  }

  render() {
    if (this.props.data.payload.length === 0) {
      return (
        <div className="OutboxGrid">
          <h4 className='emptyTable'>No Messages Found</h4>
        </div>
      );
    }

    return (
      <div className="OutboxGrid">
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
    schoolProfile: state.school.profile,
    references: state.utility.references,
  };
};

export default connect(
  OutboxGrid,
  mapStateToProps
);
