import React from 'react';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';

import Modal from 'components/Modal';
import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import ConfirmDialog from 'components/ConfirmDialog';

import StudentMessagesContainer from 'containers/Student/StudentMessagesContainer';
import StudentMessageFormContainer from 'containers/Student/StudentMessageFormContainer';
import StudentMessageDeleteContainer from 'containers/Student/StudentMessageDeleteContainer';

import MessagesGrid from './MessagesGrid';
import AddStudentMessageForm from '../AddStudentMessageForm';

type DirectMessagesProps = {
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

class DirectMessages extends React.Component {
  props: DirectMessagesProps;
  render() {
    return (
      <Page className="DirectMessagesPage">
        <PageHeader>
          <PageTitle inline>Direct Messages</PageTitle>
          <Link to={`${this.props.match.url}/add`}>
            <button className="pt-button pt-intent-primary pt-icon-new-text-box">
              &nbsp;Add New Message
            </button>
          </Link>
        </PageHeader>
        <PageBody>
          <StudentMessagesContainer
            dispatchFetchParams={this.props.match.params.studentId}
          >
            <MessagesGrid
              data={this.props.messages}
              studentId={this.props.match.params.studentId}
              schoolId={this.props.match.params.schoolId}
            />
          </StudentMessagesContainer>
        </PageBody>
        <Route
          path={`${this.props.match.path}/add`}
          render={innerProps => {
            return (
              <Modal
                title="Add Student Message"
                closeUrl={`${this.props.match.url}`}
              >
                <StudentMessageFormContainer
                  dispatchActionOnCloseParams={
                    innerProps.match.params.studentId
                  }
                  redirectOnSuccess={`${this.props.match.url}`}
                >
                  <AddStudentMessageForm
                    studentId={innerProps.match.params.studentId}
                  />
                </StudentMessageFormContainer>
              </Modal>
            );
          }}
        />
        <Route
          path={`${this.props.match.path}/:messageId/edit`}
          render={innerProps => {
            return (
              <Modal
                title="Edit Student Message"
                closeUrl={`${this.props.match.url}`}
              >
                <StudentMessageFormContainer
                  update={true}
                  initialValues={innerProps.location.state.initialValues}
                  dispatchActionOnCloseParams={
                    innerProps.match.params.studentId
                  }
                  redirectOnSuccess={`${this.props.match.url}`}
                >
                  <AddStudentMessageForm
                    studentId={innerProps.match.params.studentId}
                  />
                </StudentMessageFormContainer>
              </Modal>
            );
          }}
        />
        <Route
          path={`${this.props.match.path}/:messageId/delete`}
          render={innerProps => (
            <Modal
              title="Delete Student Message"
              closeUrl={`${this.props.match.url}`}
            >
              <StudentMessageDeleteContainer
                dispatchActionOnCloseParams={innerProps.match.params.studentId}
                redirectOnSuccess={`${this.props.match.url}`}
              >
                <ConfirmDialog
                  title="Are you sure you want to delete?"
                  closeUrl={`${this.props.match.url}`}
                  id={innerProps.match.params.messageId}
                />
              </StudentMessageDeleteContainer>
            </Modal>
          )}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.student.messages,
  };
};

export default connect(
  DirectMessages,
  mapStateToProps
);
