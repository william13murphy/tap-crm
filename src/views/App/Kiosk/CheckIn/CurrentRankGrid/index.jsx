import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';

import Check from 'components/Check';
import CheckBar from 'components/CheckBar';
import PercentBar from 'components/PercentBar';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import PageTitle from 'components/Layout/PageTitle';

import _ from 'lodash';

import styleVariables from 'styles/_variables';
import './styles.less';

type CurrentRankGridProps = {
  data: {
    payload: Array<{}>,
    SchoolStyleId: string,
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
    const avatarBlank =
      this.props.profilePicture ===
      '/assets/images/avatar_blank_c658dd805aa86951296e93f7a66ac367.png'
        ? true
        : false;
    return (
      <div className="CurrentRankGrid">
        <PageTitle>Grading Summary</PageTitle>
        <div className="CurrentRankGrid__details">
          <img
            className={`ProfileCard__picture ${avatarBlank && 'default'}`}
            src={this.props.profilePicture}
          />
          <DefaultReactTable
            noFilter
            className="current-rank"
            data={this.props.data}
            columns={this.state.columns}
            onSortedChange={this.toggleHeaderSort}
            sorted={[
              {
                id: 'PercentageCompleted',
                desc: this.state.defaultHeaderSortValue,
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  CurrentRankGrid,
  mapStateToProps
);
