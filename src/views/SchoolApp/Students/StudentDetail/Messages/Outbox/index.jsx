import React from 'react';
import connect from 'src/redux/connect';

import Modal from 'components/Modal';
import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import ConfirmDialog from 'components/ConfirmDialog';

import StudentOutboxContainer from 'containers/Student/StudentOutboxContainer';

import OutboxGrid from './OutboxGrid';

type OutboxProps = {
  token: {
    payload: {
      StudentId: any,
      SchoolId: string,
    },
  },

  studentId: any,
  schoolId: string,
  studentPurchaseHistory: any,
};

class Outbox extends React.Component {
  props: OutboxProps;
  render() {
    return (
      <Page className="OutboxPage">
        <PageHeader>
          <PageTitle>Outbox</PageTitle>
        </PageHeader>
        <PageBody>
          <StudentOutboxContainer
            dispatchFetchParams={this.props.match.params.studentId}
          >
            <OutboxGrid
              data={this.props.outbox}
              studentId={this.props.match.params.studentId}
              schoolId={this.props.match.params.schoolId}
            />
          </StudentOutboxContainer>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    outbox: state.student.outbox,
  };
};

export default connect(
  Outbox,
  mapStateToProps
);
