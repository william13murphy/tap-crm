import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { getReferenceItemOptions } from 'api/referenceItems';
import moment from 'moment';
import connect from 'src/redux/connect';
import { calculateLocalDateTimeFromUTCDateAndTime, getTimeZoneLabel } from 'src/util/localization/timezone';

type ClockHistoryDataGridProps = {
  data: [],
  history: {
    push: any,
  },
  references: {},
  studentId: string,
};

class ClockHistoryDataGrid extends React.Component {
  props: ClockHistoryDataGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Time',
          accessor: 'TimeStampUtc',
          Cell: rowInfo => (
            <span className="date">
              {rowInfo.value &&
                calculateLocalDateTimeFromUTCDateAndTime(
                  this.state.schoolTimeZone
                  rowInfo.value,
                  rowInfo.value
                ).format('MMMM Do, YYYY, h:mm:ss a')}
            </span>
          ),
        },
        {
          Header: 'Clock In/Out',
          accessor: 'ClockInOutTypeId',
          Cell: rowInfo => {
            let items = getReferenceItemOptions(
              'LstClockInOutTypes',
              this.props.references
            );
            let matchedItem = items.find(item => item.value === rowInfo.value);
            return <span>{matchedItem.label}</span>;
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

  render() {
    if (this.props.data.length === 0) {
      return (
        <div className="ClockHistoryDataGrid">
          <h4>No Clock History Found</h4>
        </div>
      );
    }

    return (
      <div className="ClockHistoryDataGrid">
        <DynamicHeightReactTable
          pageSize={this.props.data.length}
          className="linked-row"
          data={this.props.data}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
    schoolProfile: state.school.profile,
  };
};

export default connect(
  ClockHistoryDataGrid,
  mapStateToProps
);
