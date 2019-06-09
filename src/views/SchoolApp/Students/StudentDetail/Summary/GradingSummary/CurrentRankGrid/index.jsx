import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

import Modal from 'components/Modal';
import connect from 'src/redux/connect';
import Page from 'components/Layout/Page';
import PercentBar from 'components/PercentBar';
import Check from 'components/Check';
import CheckBar from 'components/CheckBar';

import StudentRankRequirementsByStyleContainer from 'containers/Student/StudentRankRequirementsByStyleContainer';
import RankRequirementsDataGrid from 'views/SchoolApp/Students/StudentDetail/Grading/RankRequirementsDataGrid';
import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';

import moment from 'moment';
import _ from 'lodash';

import styleVariables from 'styles/_variables';
import './styles.less';

type CurrentRankGridProps = {
  data: {
    payload: Array<{}>,
    SchoolStyleId: string,
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
};

class CurrentRankGrid extends React.Component {
  props: CurrentRankGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Program',
          accessor: 'StyleName',
        },
        {
          Header: 'Rank',
          accessor: 'RankName',
        },
        {
          Header: 'Promotion Date',
          accessor: 'EnrollmentDate',
          Cell: row => (
            <span className="date">
              {row.value && moment(row.value).format('YYYY-MM-DD')}
            </span>
          ),
        },
        {
          Header: 'Progress',
          accessor: 'PercentageCompleted',
          Cell: row => (
            <PercentBar
              percent={parseInt(row.original.PercentageCompleted) || 0}
              rainbow
            />
          ),
        },
        {
          Header: 'Classes',
          accessor: 'Classes',
          Cell: row => (
            <PercentBar
              percent={
                parseInt(
                  (row.original.ClassesAttended /
                    row.original.ClassesRequired) *
                    100
                ) || 0
              }
              label={`${row.original.ClassesAttended || 0}/${
                row.original.ClassesRequired
              }`}
              backgroundColor={styleVariables.blue3}
              center
            />
          ),
        },
        {
          Header: 'Weeks',
          accessor: 'WeeksRequired',
          Cell: row => (
            <PercentBar
              percent={
                parseInt(
                  (row.original.WeeksAttended / row.original.WeeksRequired) *
                    100
                ) || 0
              }
              label={`${row.original.WeeksAttended || 0}/${
                row.original.WeeksRequired
              }`}
              backgroundColor={styleVariables.forest2}
              center
            />
          ),
        },
        {
          Header: 'Skills',
          accessor: 'Skills',
          Cell: row => {
            let skillsToBeAttained = _.differenceWith(
              row.original.SkillsRequiredDetailList,
              row.original.SkillsAttainedDetailList,
              _.isEqual
            );

            return (
              <div className="Skills__cell">
                {row.original.SkillsAttainedDetailList.map((element, i) => (
                  <CheckBar
                    key={i}
                    checkedColor={element.Value}
                    title={element.Key}
                    checked={1}
                    unchecked={0}
                  />
                ))}
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
      <Page className="CurrentRankGrid" title="Progressions">
        <DefaultReactTable
          noFilter
          pageSize={this.props.data.length}
          className="linked-row"
          data={this.props.data}
          columns={this.state.columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              if (rowInfo.original.SkillsRequiredDetailList.length > 0) {
                this.props.history.push({
                  pathname: `${this.props.match.url}/rank-requirements/${
                    rowInfo.original.SchoolStyleId
                  }`,
                  state: {
                    initialValues: rowInfo.original,
                    schoolStyleId: rowInfo.original.SchoolStyleId,
                    classId: this.props.classId,
                    schoolId: rowInfo.original.SchoolId,
                    closeUrl: this.props.backUrl,
                  },
                });
              }
            },
          })}
          onSortedChange={this.toggleHeaderSort}
          sorted={[
            {
              id: 'PercentageCompleted',
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
    studentDetail: state.student.detail,
    rankRequirementsByStyle: state.student.rankRequirementsByStyle,
  };
};

export default connect(
  CurrentRankGrid,
  mapStateToProps
);
