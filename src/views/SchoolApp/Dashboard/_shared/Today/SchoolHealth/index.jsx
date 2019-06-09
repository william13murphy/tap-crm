import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import './styles.less';
import Statistic from 'components/Statistic';
import { fetchStat } from 'src/redux/actionCreators/report/healthStats';

type SchoolHealthProps = {
  studentsBirthday: {
    payload: [{}],
  },
  schoolHealth: {
    payload: [{}],
  },
};

class SchoolHealth extends React.PureComponent {
  componentDidMount() {
    const id = this.props.schoolId;

    this.props.fetchStat({ id, statType: 'leads' });
    this.props.fetchStat({ id, statType: 'unpaids' });
  }

  render() {
    return (
      <div className="SchoolHealth">
        <Statistic
          backgroundColor="#30395c"
          statistic={this.props.schoolHealth.payload.openLeads}
          label="leads generated"
          statisticColor="#F2F2F2"
          onClick={() =>
            this.props.history.push(
              `/app/school-app/${this.props.schoolId}/students/leads`
            )
          }
        />
        <Statistic
          backgroundColor="#DA3920"
          statistic={this.props.schoolHealth.payload.unpaids}
          statisticColor="#F2F2F2"
          label="Unpaid Students"
          onClick={() =>
            this.props.history.push(
              `/app/school-app/${this.props.schoolId}/reports/students-unpaid`
            )
          }
        />
        <Statistic
          statistic={this.props.schoolHealth.payload.upcomingGradings}
          backgroundColor="#1c88a3"
          statisticColor="#F2F2F2"
          label="Pending Grading"
          onClick={() =>
            this.props.history.push(
              `/app/school-app/${this.props.schoolId}/students/grading`
            )
          }
        />
        <Statistic
          backgroundColor="#17A45F"
          statistic={this.props.schoolHealth.payload.birthDays}
          statisticColor="#F2F2F2"
          label="Upcoming Birthdays"
          onClick={() =>
            this.props.history.push(`${this.props.match.url}/birthdays`)
          }
        />
        <Statistic
          backgroundColor="#AAABAF"
          statistic={this.props.schoolHealth.payload.softexits}
          statisticColor="#F2F2F2"
          label="Probable Soft Exits"
          onClick={() =>
            this.props.history.push(
              `/app/school-app/${this.props.schoolId}/reports/soft-exit`
            )
          }
        />
        <Statistic
          backgroundColor="#17A45F"
          statistic={this.props.schoolHealth.payload.renewals}
          statisticColor="#F2F2F2"
          label="Upcoming Renewals"
          onClick={() =>
            this.props.history.push(
              `/app/school-app/${this.props.schoolId}/reports/renewal`
            )
          }
        />
        <Statistic
          backgroundColor="#f78d1c"
          statistic={this.props.schoolHealth.payload.flaggedMessages}
          statisticColor="#F2F2F2"
          label="Flagged Notes"
          onClick={() =>
            this.props.history.push(
              `/app/school-app/${this.props.schoolId}/dashboard/flagged-notes`
            )
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    studentsBirthday: state.report.studentsBirthday,
    schoolHealth: state.report.schoolHealth,
    stats: state.report.healthStats,
    schoolId: state.appContext.schoolId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStat: (id, statType) => {
      dispatch(fetchStat({ id, statType }));
    },
  };
};

export default connect(
  SchoolHealth,
  mapStateToProps,
  mapDispatchToProps
);
