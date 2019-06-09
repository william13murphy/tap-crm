import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Checkbox from 'components/Checkbox';
import CheckBar from 'components/CheckBar';
import Check from 'components/Check';
import PercentBar from 'components/PercentBar';
import SingleButtonForm from 'components/Forms/SingleButtonForm';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import StudentBulkPromotionStatefulFormContainer from 'containers/Student/StudentBulkPromotionStatefulFormContainer';
import StudentBulkDemotionStatefulFormContainer from 'containers/Student/StudentBulkDemotionStatefulFormContainer';

import AvatarBlank from 'assets/images/avatar_blank.png';
import styleVariables from 'styles/_variables';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import _ from 'lodash';

import './styles.less';

type StudentsDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  schoolId: string,
  styleRanks: {
    payload: [],
  },
  dispatchFormPost: Function,
  hideActions: Boolean,
};

class StudentsDataGrid extends React.Component {
  props: StudentsDataGridProps;

  state = {
    columns: [
      {
        Header: row => {
          return (
            <span className="checkbox">
              <Checkbox
                checked={this.state.headerEnabled}
                onClick={this.handleHeaderEnabledChange}
              />
            </span>
          );
        },
        accessor: 'isEnabled',
        Cell: row => {
          if (
            row.original.Progressions[0].ProgressionId !== null &&
            row.original.Progressions[0].EnrollmentDate !== null
          ) {
            return (
              <div>
                <span className="checkbox">
                  <Checkbox
                    checked={row.original.isEnabled}
                    onClick={() => {
                      this.handleEnabledChange(row);
                    }}
                  />
                </span>
              </div>
            );
          }
        },
        sortable: false, // use table default
        filterable: false,
        maxWidth: 100,
      },
      {
        Header: '',
        accessor: 'StudentPicture',
        Cell: row => {
          const profilePicture = row.original.StudentPicture || AvatarBlank;
          return <img src={profilePicture} width="40" height="40" />;
        },
        sortable: false,
        filterable: false,
        width: 53,
      },
      {
        Header: 'First Name',
        accessor: 'FirstName',
      },
      {
        Header: 'Last Name',
        accessor: 'LastName',
      },
      {
        Header: 'Program',
        accessor: 'StyleName',
        Cell: row => {
          return row.original.Progressions[0].StyleName;
        },
      },
      {
        Header: 'Rank',
        accessor: 'Rank',
        Cell: row => {
          return row.original.Progressions[0].RankName;
        },
      },
      {
        Header: 'Progress',
        accessor: 'Progressions[0].PercentageCompleted',
        Cell: row => (
          <PercentBar
            percent={parseInt(row.original.Progressions[0].PercentageCompleted)}
            rainbow
          />
        ),
        filterMethod: (filter, row) => {
          let item = {
            ...row,
            PercentageCompleted: Math.min(
              100,
              parseInt(row.PercentageCompleted)
            ).toString(),
          };

          return filterPayloadMethod(filter, item, 'PercentageCompleted');
        },
        Filter: filter,
      },
      {
        Header: 'Classes',
        accessor: 'ClassesAttended',
        Cell: row => (
          <PercentBar
            percent={
              parseInt(
                (row.original.Progressions[0].ClassesAttended /
                  row.original.Progressions[0].ClassesRequired) *
                  100
              ) || 0
            }
            label={`${row.original.Progressions[0].ClassesAttended}/${
              row.original.Progressions[0].ClassesRequired
            }`}
            backgroundColor={styleVariables.blue3}
            center
          />
        ),
      },
      {
        Header: 'Weeks',
        accessor: 'WeeksAttended',
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
      },
      {
        Header: 'Skills',
        accessor: 'SkillsAttained',
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
      },
      {
        Header: 'Action',
        accessor: 'Actions',
        Cell: row => (
          <div className="Action__cell">
            <Link
              className="pt-button"
              to={`/app/school-app/${this.props.schoolId}/students/detail/${
                row.original.StudentId
              }/summary`}
            >
              <i
                className="Icon IconView fa fa-eye"
                aria-hidden="true"
                title="View"
              />
            </Link>
          </div>
        ),
      },
    ],
    data: [],
    headerEnabled: false,
    defaultHeaderSortValue: true,
  };

  handleEnabledChange = row => {
    let newData = [...this.state.data];
    newData[row.index] = {
      ...newData[row.index],
      isEnabled: !newData[row.index].isEnabled,
    };
    this.setState({
      data: newData,
    });
  };

  handleHeaderEnabledChange = () => {
    let eligibleStudentsData = this.state.data.filter(
      element => element.Progressions[0].ProgressionId
    );

    let data = this.state.data.map(item => {
      return {
        ...item,
        isEnabled: !this.state.headerEnabled,
      };
    });

    this.setState({ data, headerEnabled: !this.state.headerEnabled });
  };

  componentDidMount() {
    if (this.props.data) {
      let data = this.props.data.map(item => {
        return {
          ...item,
          isEnabled: false,
        };
      });

      this.setState({ data });
    }
  }

  renderForm() {
    let eligibleStudentsData = this.state.data.filter(
      element => element.Progressions[0].ProgressionId
    );

    let filteredData = eligibleStudentsData.filter(item => item.isEnabled);

    let formData = filteredData.map(item => {
      return {
        Id: item.Progressions[0].ProgressionId,
        StudentId: item.StudentId,
        SchoolStyleId: item.Progressions[0].SchoolStyleId,
        StyleRankId: item.Progressions[0].StyleRankId,
        EnrollmentDate: item.Progressions[0].EnrollmentDate,
        ProgressionDate: moment
          .utc()
          .startOf('day')
          .format(),
      };
    });

    return (
      <StudentBulkPromotionStatefulFormContainer
        dispatchActionOnSuccessParams={{
          schoolId: this.props.schoolId,
          styleId: this.props.styleId,
        }}
      >
        <SingleButtonForm title="Promote" formData={formData} />
      </StudentBulkPromotionStatefulFormContainer>
    );
  }

  toggleHeaderSort = () => {
    this.setState({
      defaultHeaderSortValue: !this.state.defaultHeaderSortValue,
    });
  };

  render() {
    let { columns } = this.state;
    if (this.props.hideActions) {
      columns = columns.filter(d => d.Header !== 'Action');
    }

    return (
      <div className="EnrolledStudentsDataGrid">
        <div className="EnrolledStudentsDataGrid__actions">
          {this.renderForm()}
        </div>
        <DynamicHeightReactTable
          pageSize={this.state.data.length}
          data={this.state.data}
          columns={columns}
          verticalBuffer={140}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              if (column.id !== 'isEnabled') {
                this.props.history.push(
                  `/app/school-app/${this.props.schoolId}/students/detail/${
                    rowInfo.original.StudentId
                  }/grading/${this.props.styleId}`
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
      </div>
    );
  }
}

export default StudentsDataGrid;
