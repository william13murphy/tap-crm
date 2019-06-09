import React from 'react';
import Modal from 'components/Modal';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';
import { getReferenceItemOptions } from 'api/referenceItems';
import {
  calculateLocalDateTimeFromUTCDateAndTime,
  getTimeZoneLabel,
} from 'src/util/localization/timezone';

import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import SchoolClassFormContainer from 'containers/School/SchoolClassFormContainer';
import SchoolInstructorsContainer from 'containers/School/SchoolInstructorsContainer';
import EditClassForm from '../EditClassForm';
import moment from 'moment';

import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';

type ProgramClassesDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  references: {},
  schoolId: string,
  timeZone: string,
  match: { params: { id: string } },
};

class ProgramClassesDataGrid extends React.Component {
  props: ProgramClassesDataGridProps;
  constructor() {
    super();
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Start Date',
          accessor: 'StartDate',
          Cell: rowInfo => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.state.schoolTimeZone,
              rowInfo.original.StartDate,
              rowInfo.original.StartTimeUtc
            );
            return (
              <span className="date">
                {rowInfo.value && localDate.format('YYYY-MM-DD')}
              </span>
            );
          },
        },
        {
          Header: 'End Date',
          accessor: 'EndDate',
          Cell: rowInfo => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.state.schoolTimeZone,
              rowInfo.original.EndDate,
              rowInfo.original.EndTimeUtc
            );
            return (
              <span className="date">
                {moment(rowInfo.value).isBefore('9999-12-31T00:00:00')
                  ? localDate.format('YYYY-MM-DD')
                  : ''}
              </span>
            );
          },
        },
        {
          Header: 'Start Time',
          accessor: 'StartTimeUtc',
          Cell: rowInfo => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.state.schoolTimeZone,
              rowInfo.original.StartDate,
              rowInfo.original.StartTimeUtc
            );
            return (
              <span className="date">
                {rowInfo.value && localDate.format('hh:mm a')}
              </span>
            );
          },
          filterMethod: (filter, row) => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.state.schoolTimeZone,
              row.StartDate,
              row.StartTimeUtc
            );
            let matchedItem = this.props.data.find(
              item => item.StartTimeUtc == row.StartTimeUtc
            );
            let obj = {
              ...row,
              StartTimeUtc: localDate.format('hh:mm a'),
            };

            return filterPayloadMethod(filter, obj, 'StartTimeUtc');
          },
          Filter: filter,
        },
        {
          Header: 'End Time',
          accessor: 'EndTimeUtc',
          Cell: rowInfo => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.state.schoolTimeZone,
              rowInfo.original.EndDate,
              rowInfo.original.EndTimeUtc
            );
            return (
              <span className="date">
                {rowInfo.value && localDate.format('hh:mm a')}
              </span>
            );
          },
          filterMethod: (filter, row) => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.state.schoolTimeZone,
              row.EndDate,
              row.EndTimeUtc
            );
            let matchedItem = this.props.data.find(
              item => item.EndTimeUtc == row.EndTimeUtc
            );
            let obj = {
              ...row,
              EndTimeUtc: localDate.format('hh:mm a'),
            };

            return filterPayloadMethod(filter, obj, 'EndTimeUtc');
          },
          Filter: filter,
        },
        {
          Header: 'Name',
          accessor: 'Name',
        },
        {
          Header: 'Maximum Students',
          accessor: 'MaximumStudents',
        },
        {
          Header: 'Frequency Type',
          accessor: 'FrequencyTypeId',
          Cell: rowInfo => {
            let frequencyTypeList = getReferenceItemOptions(
              'LstFrequencyTypes',
              this.props.references
            );

            let matchedFrequency = frequencyTypeList.find(
              item => item.value === rowInfo.value
            );

            return (
              <span className="status">
                {rowInfo.value && matchedFrequency && matchedFrequency.label}
              </span>
            );
          },
          filterMethod: (filter, row) =>
            filterReferenceMethod(
              filter,
              row,
              this.props.references,
              'LstFrequencyTypes',
              'FrequencyTypeId'
            ),
          Filter: filter,
        },
        {
          Header: 'Actions',
          accessor: 'Actions',
          filterable: false,
          sortable: false,
          Cell: row => (
            <div className="Action__cell">
              <Route
                path={`/app/school-app/${
                  this.props.match.params.schoolId
                }/programs/detail/${this.props.match.params.id}/${
                  row.original.Id
                }/edit`}
                render={routerProps => {
                  let initialValues = routerProps.location.state.initialValues;

                  return (
                    <Modal
                      title="Edit Class"
                      closeUrl={`/app/school-app/${
                        this.props.match.params.schoolId
                      }/programs/detail/${this.props.match.params.id}`}
                    >
                      <SchoolInstructorsContainer
                        dispatchFetchParams={this.props.schoolId}
                      >
                        <SchoolStylesContainer
                          dispatchFetchParams={this.props.schoolId}
                        >
                          <SchoolClassFormContainer
                            dispatchActionOnCloseParams={this.props.schoolId}
                            redirectOnSuccess={`/app/school-app/${
                              this.props.match.params.schoolId
                            }/programs/detail/${this.props.match.params.id}`}
                            initialValues={{
                              ...initialValues,
                              StartTimeUtc: calculateLocalDateTimeFromUTCDateAndTime(
                                this.state.schoolTimeZone,
                                initialValues.StartDate,
                                initialValues.StartTimeUtc
                              ).format(),
                              EndTimeUtc: calculateLocalDateTimeFromUTCDateAndTime(
                                this.state.schoolTimeZone,
                                initialValues.EndDate,
                                initialValues.EndTimeUtc
                              ).format(),
                            }}
                          >
                            <EditClassForm
                              schoolId={this.props.schoolId}
                              timeZone={this.state.schoolTimeZone}
                            />
                          </SchoolClassFormContainer>
                        </SchoolStylesContainer>
                      </SchoolInstructorsContainer>
                    </Modal>
                  );
                }}
              />
              <Link
                className="pt-button"
                to={{
                  pathname: `/app/school-app/${
                    this.props.match.params.schoolId
                  }/programs/detail/${this.props.match.params.id}/${
                    row.original.Id
                  }/edit`,
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
            </div>
          ),
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
        <div className="ProgramClassesDataGrid">
          <h4>No Classes Found</h4>
        </div>
      );
    }

    return (
      <DefaultReactTable
        pageSize={this.props.data.length}
        className="ProgramClassesDataGrid linked-row"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    schoolProfile: state.school.profile,
    references: state.utility.references,
    instructors: state.school.instructors,
  };
}

export default connect(
  ProgramClassesDataGrid,
  mapStateToProps
);
