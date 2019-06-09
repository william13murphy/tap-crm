import { getStudentDetail } from 'api';
import StudentPlanContainer from 'containers/Student/StudentPlanContainer';
import StudentPlanOwnerContainer from 'containers/Student/StudentPlanOwnerContainer';
import StudentPlanPaymentAccountContainer from 'containers/Student/StudentPlanPaymentAccountContainer';
import moment from 'moment';
import React from 'react';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import connect from 'src/redux/connect';
import { userFullName } from 'util/user';
import PaymentAccount from './Payment/PaymentAccount';
import PaymentOwner from './Payment/PaymentOwner';
import PaymentTerms from './Payment/PaymentTerms';
import './styles.less';

class PlanDetailSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userLoaded: false,
    };
  }

  componentDidMount() {
    getStudentDetail(this.props.studentId).done(resp => {
      console.log('USER DATA', resp);
      this.setState({
        user: resp,
        userLoaded: true,
      });
    });
  }

  renderStudentInfo = () => {
    if (this.state.userLoaded) {
      const user = this.state.user.User;

      return (
        <div>
          <h4>Student Info</h4>
          <table className="default-table-shaded" style={{ width: '92%' }}>
            <tbody>
              <tr>
                <td>Full Name</td>
                <td>{userFullName(user)}</td>
              </tr>
              <tr>
                <td>Preferred Name</td>
                <td>{user.Profile.PrefferedName || user.Profile.FirstName}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>{moment().diff(user.Profile.Dob, 'years')}</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>{moment(user.Profile.Dob).format('MMMM D, YYYY')}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>
                  <ReferenceOutput
                    listName="LstGenders"
                    id={user.Profile.GenderId}
                  />
                </td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td title="Send a SMS">{user.PhoneNumber}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td title="Send an Email">{user.Email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };

  render() {
    const schoolId = this.props.match.params.schoolId;
    const planId = this.props.planId;
    return (
      <div className="PlanDetailSummary">
        <div style={{ padding: '10px' }}>
          <button
            style={{ width: '100%' }}
            className="EditAccountOwnerButton pt-button pt-intent-primary pt-icon-edit"
            onClick={() =>
              this.props.history.push(
                `/app/school-app/${schoolId}/students/plans/detail/${planId}/students`
              )
            }
          >
            Edit Info
          </button>
        </div>
        {this.renderStudentInfo()}
        <h4>Payment Terms</h4>
        <StudentPlanContainer dispatchFetchParams={this.props.planId}>
          <PaymentTerms
            planDetail={this.props.planDetail.payload}
            routes={this.props.match}
            readOnly={true}
          />
        </StudentPlanContainer>

        <h4>Payment Account</h4>
        <StudentPlanPaymentAccountContainer
          dispatchFetchParams={this.props.planId}
        >
          <PaymentAccount routes={this.props.match} readOnly={true} />
        </StudentPlanPaymentAccountContainer>

        <h4>Account Ower</h4>
        <StudentPlanOwnerContainer dispatchFetchParams={this.props.planId}>
          <PaymentOwner routes={this.props.match} readOnly={true} />
        </StudentPlanOwnerContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    plan: state.student.plan,
    owners: state.student.owners,
    owner: state.student.owner,
    planPaymentAccounts: state.student.planPaymentAccounts,
    planDetail: state.student.planDetail,
  };
};

export default connect(
  PlanDetailSummary,
  mapStateToProps
);
