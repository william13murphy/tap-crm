import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { Link } from 'react-router-dom';
import moment from 'moment';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';

import AvatarBlank from 'assets/images/avatar_blank.png';
import PercentBar from 'components/PercentBar';
import CheckBar from 'components/CheckBar';
import styleVariables from 'styles/_variables';
import SingleButtonForm from 'components/Forms/SingleButtonForm';
import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import StudentAttendanceDeleteStatefulFormContainer from 'containers/Student/StudentAttendanceDeleteStatefulFormContainer';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import './styles.less';

import Check from 'components/Check';

type ClassProgressionDataGridProps = {
  match: {
    url: string,
  },
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  programName: string,
  UserId: string,
  references: {},
  studentId: string,
  schoolId: string,
  schoolStyleId: string,
  dispatchFormPost: string,
  styles: {
    payload: Array<{}>,
  },
  progressions: {
    payload: Array<{}>,
  },
  styleRanks: {
    payload: Array<{}>,
  },
  classId: string,
  classScheduleId: string,
};

class ClassProgressionDataGrid extends React.Component {
  props: ClassProgressionDataGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Picture',
          accessor: 'StudentPicture',
          filterable: false,
          sortable: false,
          width: 62,
          Cell: row => (
            <img
              className="ClassProgressionDataGrid__StudentPicture"
              src={row.original.StudentPicture || AvatarBlank}
            />
          ),
        },
        {
          Header: 'Name',
          accessor: 'Name',
          Cell: row => (
            <span>{row.original.FirstName + ' ' + row.original.LastName}</span>
          ),
          filterMethod: (filter, row) => {
            let matchedItem = this.props.data.find(
              item => item.StudentId == row._original.StudentId
            );
            let obj = {
              ...row,
              Name: matchedItem.FirstName + ' ' + matchedItem.LastName,
            };

            return filterPayloadMethod(filter, obj, 'Name');
          },
          Filter: filter,
        },
        {
          Header: 'Rank',
          accessor: 'Progressions[0].RankName',
        },
        {
          Header: 'Rank Enrollment Date',
          accessor: 'Progressions[0].EnrollmentDate',
          Cell: row => (
            <span className="date">
              {row.value && moment(row.value).format('YYYY-MM-DD')}
            </span>
          ),
        },
        {
          Header: 'Progress',
          accessor: 'Progressions[0].PercentageCompleted',
          Cell: row => (
            <PercentBar
              percent={
                parseInt(row.original.Progressions[0].PercentageCompleted) || 0
              }
              rainbow
            />
          ),
          filterMethod: (filter, row) => {
            let item = {
              ...row,
              PercentageCompleted: Math.min(
                100,
                parseInt(row._original.Progressions[0].PercentageCompleted)
              ).toString(),
            };

            return filterPayloadMethod(filter, item, 'PercentageCompleted');
          },
          Filter: filter,
        },
        {
          Header: 'Classes',
          accessor: 'Classes',
          Cell: row => (
            <PercentBar
              percent={
                parseInt(
                  (row.original.Progressions[0].ClassesAttended /
                    row.original.Progressions[0].ClassesRequired) *
                    100
                ) || 0
              }
              label={`${row.original.Progressions[0].ClassesAttended || 0}/${
                row.original.Progressions[0].ClassesRequired
              }`}
              backgroundColor={styleVariables.blue3}
              center
            />
          ),
          filterMethod: (filter, row) => {
            let percent = row._original.Progressions[0].ClassesAttended;
            let item = {
              ...row,
              Classes: percent,
            };

            return filterPayloadMethod(filter, item, 'Classes');
          },
          Filter: filter,
        },
        {
          Header: 'Weeks',
          accessor: 'Weeks',
          Cell: row => (
            <PercentBar
              percent={
                parseInt(
                  (row.original.Progressions[0].WeeksAttended /
                    row.original.Progressions[0].WeeksRequired) *
                    100
                ) || 0
              }
              label={`${row.original.Progressions[0].WeeksAttended || 0}/${
                row.original.Progressions[0].WeeksRequired
              }`}
              backgroundColor={styleVariables.forest2}
              center
            />
          ),
          filterMethod: (filter, row) => {
            let percent = row._original.Progressions[0].WeeksAttended;
            let item = {
              ...row,
              Weeks: percent,
            };

            return filterPayloadMethod(filter, item, 'Weeks');
          },
          Filter: filter,
        },
        {
          Header: 'Skills',
          accessor: 'Skills',
          Cell: row => {
            let skillsToBeAttained = _.differenceWith(
              row.original.Progressions[0].SkillsRequiredDetailList,
              row.original.Progressions[0].SkillsAttainedDetailList,
              _.isEqual
            );
            return (
              <div className="Skills__cell">
                {row.original.Progressions[0].SkillsAttainedDetailList.map(
                  (element, i) => (
                    <CheckBar
                      key={i}
                      checkedColor={element.Value}
                      title={element.Key}
                      checked={1}
                      unchecked={0}
                    />
                  )
                )}
                {skillsToBeAttained.map((element, index) => {
                  return (
                    <Check
                      key={index}
                      checkedColor={element.Value}
                      title={element.Key}
                    />
                  );
                })}
              </div>
            );
          },
          filterMethod: (filter, row) => {
            let skillsAttained = row._original.Progressions[0].SkillsAttained;
            let item = {
              ...row,
              Skills: skillsAttained,
            };

            return filterPayloadMethod(filter, item, 'Skills');
          },
          Filter: filter,
        },
        {
          Header: 'Actions',
          accessor: 'Actions',
          filterable: false,
          sortable: false,
          width: 220,
          Cell: row => {
            let studentDetail =
              this.props.classScheduleStudents &&
              this.props.classScheduleStudents.payload &&
              this.props.classScheduleStudents.payload.find(
                item => item.StudentId === row.original.StudentId
              );
            return (
              <div className="Action__cell">
                <Link
                  to={{
                    pathname: `${this.props.match.url}/rank-requirements`,
                    state: { initialValues: row.original },
                  }}
                >
                  <button className="pt-button">Skills</button>
                </Link>
                <Link
                  to={{
                    pathname: `/app/school-app/${
                      this.props.schoolId
                    }/students/detail/${row.original.StudentId}/summary`,
                    state: { initialValues: row.original },
                  }}
                >
                  <button
                    className="Icon IconView fa fa-eye pt-button"
                    aria-hidden="true"
                    title="View"
                  />
                </Link>
                <StudentAttendanceDeleteStatefulFormContainer
                  dispatchActionOnSuccessParams={
                    this.props.match.params.classScheduleId
                  }
                >
                  <SingleButtonForm
                    title=" "
                    className="SingleButton Icon IconDelete fa fa-trash"
                    formData={{
                      Id: studentDetail && studentDetail.StudentAttendanceId,
                    }}
                  />
                </StudentAttendanceDeleteStatefulFormContainer>
              </div>
            );
          },
        },
      ],
      data: [],
      defaultHeaderSortValue: true,
    };
  }

  toggleHeaderSort = () => {
    this.setState({
      defaultHeaderSortValue: !this.state.defaultHeaderSortValue,
    });
  };

  render() {
    return (
      <Page className="ClassProgressionDataGrid" title="Progressions">
        <DefaultReactTable
          pageSize={this.props.data.length}
          className="linked-row"
          data={this.props.data}
          columns={this.state.columns}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              if (column.id !== 'Actions') {
                this.props.history.push(
                  `/app/school-app/${
                    this.props.schoolId
                  }/dashboard/school-overview`
                );
              }
            },
          })}
          onSortedChange={this.toggleHeaderSort}
          sorted={[
            {
              id: 'Progressions[0].PercentageCompleted',
              desc: this.state.defaultHeaderSortValue,
            },
          ]}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
    styles: state.school.styles,
    styleRanks: state.school.styleRanks,
    progressions: state.student.progressions,
    UserId: state.token.payload.UserId,
    classScheduleStudents: state.school.classScheduleStudents,
  };
};

export default connect(
  ClassProgressionDataGrid,
  mapStateToProps
);
