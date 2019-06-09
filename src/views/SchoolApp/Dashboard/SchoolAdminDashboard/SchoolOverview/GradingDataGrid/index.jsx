import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import PercentBar from 'components/PercentBar';
import CheckBar from 'components/CheckBar';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import Check from 'components/Check';

import moment from 'moment';
import _ from 'lodash';

import styleVariables from 'styles/_variables';
import './styles.less';

type GradingDataGridProps = {
  data: [],
  history: {
    push: any,
  },
};

class GradingDataGrid extends React.Component {
  props: GradingDataGridProps;
  constructor() {
    super();
    this.state = {
      data: [],
      defaultHeaderSortValue: true,
      columns: [
        {
          Header: 'Student Name',
          accessor: 'Name',
        },
        {
          Header: 'Program',
          accessor: 'StyleName',
        },
        {
          Header: 'Date Promoted',
          accessor: 'Date',
        },
        {
          Header: 'Current Grade/Rank',
          accessor: 'RankName',
        },
        {
          Header: 'Progress',
          accessor: 'PercentageCompleted',
          Cell: row => (
            <PercentBar
              percent={parseInt(row.original.PercentageCompleted)}
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
                  (row.original.ClassesAttended /
                    row.original.ClassesRequired) *
                    100
                ) || 0
              }
              label={`${row.original.ClassesAttended}/${
                row.original.ClassesRequired
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
          Header: 'Skill',
          accessor: 'SkillsAttained',
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
    };
  }

  componentWillMount() {
    if (this.props.data) {
      let data = this.props.data.map(item => {
        return {
          ...item,
          ...item.Progressions[0],
          GradingEligibility: 'YES',
          Name: item.FirstName + ' ' + item.LastName,
          Date:
            item.Progressions[0].ProgressionDate &&
            moment(item.Progressions[0].ProgressionDate).format('YYYY-MM-DD'),
        };
      });
      this.setState({
        data,
      });
    }
  }

  toggleHeaderSort = () => {
    this.setState({
      defaultHeaderSortValue: !this.state.defaultHeaderSortValue,
    });
  };

  render() {
    return (
      <DefaultReactTable
        className={`GradingDataGrid linked-row ${
          this.state.data.length == 0 ? 'emptyGrid' : ''
        }`}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            this.props.history.push(
              `/app/school-app/${this.props.schoolId}/students/detail/${
                rowInfo.original.StudentId
              }/summary`
            );
          },
        })}
        pageSize={this.state.data.length}
        data={this.state.data}
        columns={this.state.columns}
        onSortedChange={this.toggleHeaderSort}
        sorted={[
          {
            id: 'PercentageCompleted',
            desc: this.state.defaultHeaderSortValue,
          },
        ]}
      />
    );
  }
}

export default GradingDataGrid;
