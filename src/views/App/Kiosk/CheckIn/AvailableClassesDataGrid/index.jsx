import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import connect from 'src/redux/connect';
import moment from 'moment';
import Modal from 'components/Modal';
import { calculateLocalDateTimeFromUTCDateAndTime } from 'src/util/localization/timezone';

type AvailableClassesDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  studentId: string,
  schoolId: string,
  original: {
    StatusTypeId: string,
  },

  dispatchFormPost: Function,
};

class AvailableClassesDataGrid extends React.Component {
  props: AvailableClassesDataGridProps;
  constructor(props) {
    super(props);
    this.state = {
      attending: {},
      message: '',
      columns: [
        {
          Header: 'Program',
          accessor: 'Detail',
          Cell: row => {
            return row.value;
          },
        },
        {
          Header: 'Date',
          accessor: 'Date',
          Cell: row => {
            return moment(row.value).format('dddd, MMMM Do, YYYY');
          },
        },
        {
          Header: 'Start Time',
          accessor: 'StartTimeUtc',
          Cell: row => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.props.timeZone,
              row.original.Date,
              row.original.StartTimeUtc
            );
            return localDate.format('hh:mm a');
          },
        },
        {
          Header: 'End Time',
          accessor: 'EndTimeUtc',
          Cell: row => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.props.timeZone,
              row.original.Date,
              row.original.EndTimeUtc
            );
            return localDate.format('hh:mm a');
          },
        },
        {
          Header: 'Action',
          Cell: row => {
            return (
              <button
                className={`pt-button ${
                  row.original.Attending
                    ? 'pt-intent-success'
                    : 'pt-intent-primary'
                }`}
                id={row.original.StudentClassId}
                data-name={row.original.Detail}
                onClick={() => this.onClickAttending(row.original)}
                disabled={row.original.Attending}
              >
                {row.original.Attending ? 'Checked In' : 'Attend'}
              </button>
            );
          },
        },
      ],
    };
  }

  onClickAttending = (item, excludeClass) => {
    let popupString = ` You are attending ${item.Detail} at ${moment().format(
      'hh:mm A'
    )}`;

    let { attending } = this.state;
    attending[item.ClassScheduleId] = true;

    this.setState({
      message: popupString,
      attending,
    });

    let checkinClass = {
      message: popupString,
      attending,
      showCheckinMessage: false,
    };

    var data = {
      SchoolId: this.props.data.SchoolId,
      StudentId: this.props.data.StudentId,
      Classes: [item.ClassScheduleId],
      checkinClass: excludeClass ? {} : checkinClass,
    };

    this.props.dispatchFormPost(data);
  };

  closeModal = e => {
    this.setState({
      message: false,
    });
    this.checkout();
  };

  checkout = () => {
    this.props.dispatchAuthenticateReset();
    this.props.dispatchCheckinReset();
    this.props.history.push('/kiosk/authenticate');
  };

  render() {
    return (
      <div className="ClassTable">
        <DefaultReactTable
          data={this.props.data.Classes}
          columns={this.state.columns}
        />
        {this.state.message && (
          <Modal title="Status" handleCloseClick={this.closeModal}>
            <h1>{this.state.message}</h1>
          </Modal>
        )}
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
  AvailableClassesDataGrid,
  mapStateToProps
);
