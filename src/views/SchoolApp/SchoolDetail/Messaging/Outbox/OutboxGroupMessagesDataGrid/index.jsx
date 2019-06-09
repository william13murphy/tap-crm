import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';

import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';

import {
  calculateLocalDateTimeFromUTCDateAndTime,
  getTimeZoneLabel,
} from 'src/util/localization/timezone';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import '../styles.less';

type OutboxGroupMessagesDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  references: any,
  allOutboxGroup: {
    payload: any,
  },
  schoolId: string,
};

class OutboxGroupMessagesDataGrid extends React.Component {
  props: OutboxGroupMessagesDataGridProps;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Subject',
          accessor: 'Subject',
        },
        {
          Header: 'Sent on',
          accessor: 'Name',
          Cell: rowInfo => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.state.schoolTimeZone,
              rowInfo.original.Name,
              rowInfo.original.Name
            );
            return (
              <span className="date">
                {rowInfo.value && localDate.format('MMMM Do YYYY, h:mm a')}
              </span>
            );
          },
        },
        {
          Header: 'Message',
          accessor: 'HtmlData',
          Cell: props => {
            return (
              <div
                dangerouslySetInnerHTML={{ __html: props.original.HtmlData }}
              />
            );
          },
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

  componentDidMount() {
    let outBoxDataGroup = [];

    if (this.props.allOutboxGroup.payload) {
      outBoxDataGroup = this.props.allOutboxGroup.payload.map(item => {
        return item;
      });
    }
    this.setState({ data: outBoxDataGroup });
  }

  render() {
    return (
      <div>
        <DynamicHeightReactTable
          className="linked-row"
          data={this.state.data}
          pageSize={this.state.data.length}
          columns={this.state.columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push({
                pathname: `/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/outbox/${
                  rowInfo.original.Name
                }/detail`,
                state: { students: rowInfo.original.StudentIds },
              });
            },
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schoolProfile: state.school.profile,
    references: state.utility.references,
    allOutboxGroup: state.school.allOutboxGroup,
  };
};

export default connect(
  OutboxGroupMessagesDataGrid,
  mapStateToProps
);
