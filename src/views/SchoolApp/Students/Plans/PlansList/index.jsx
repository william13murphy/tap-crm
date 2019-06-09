import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import SchoolStudentPlansContainer from 'containers/School/SchoolStudentPlansContainer';
import StudentOwnersContainer from 'containers/Student/StudentOwnersContainer';

import PlansDataGrid from './PlansDataGrid';
import './styles.less';

type PlanPageProps = {
  match: { params: { schoolId: string } },
  plans: {
    payload: {},
  },
  history: {},
};

class PlanPage extends React.Component {
  props: PlanPageProps;
  state = { disablePlan: false };

  componentWillMount() {
    const schoolHasStaff = this.props.contacts.payload.some(
      item => item.ContactTypeId === '6e088e9f-c7b3-437e-bf91-4b780ef8f49b'
    );
    if (!this.props.bank.payload || !schoolHasStaff) {
      this.setState({ disablePlan: true });
    }
  }

  render() {
    const schoolId = this.props.match.params.schoolId;
    return (
      <Page className="PlansPage" title="Plans">
        <PageHeader>
          {this.state.disablePlan && (
            <NoDataMessage
              errorMessage="Please Add School Staff and Bank Info Before Adding A Plan."
              icon="pt-icon-info-sign"
            />
          )}
          <PageTitle inline>Student Payment Plans</PageTitle>
          <Link
            to={`${this.props.match.url}/add`}
            className={`pt-button pt-intent-primary pt-icon-new-person ${
              this.state.disablePlan ? 'disabled' : ''
            }`}
          >
            Add Student Plan
          </Link>
        </PageHeader>
        <PageBody>
          <StudentOwnersContainer dispatchFetchParams={schoolId}>
            <SchoolStudentPlansContainer dispatchFetchParams={schoolId}>
              {this.props.plans.payload &&
              this.props.plans.payload.length > 0 ? (
                <PlansDataGrid
                  data={this.props.plans.payload}
                  schoolId={schoolId}
                  history={this.props.history}
                  url={this.props.match.url}
                />
              ) : (
                <NoDataMessage errorMessage="No Plans Found." />
              )}
            </SchoolStudentPlansContainer>
          </StudentOwnersContainer>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    plans: state.school.studentPlans,
    bank: state.school.bank,
    contacts: state.school.contacts,
  };
};

export default connect(
  PlanPage,
  mapStateToProps
);
