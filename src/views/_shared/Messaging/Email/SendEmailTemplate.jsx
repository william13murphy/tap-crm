import React from 'react';
import connect from 'src/redux/connect';

import Modal from 'components/Modal';
import AllEmailTemplatesContainer from 'containers/School/AllEmailTemplatesContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import SchoolOutboxEmailFormContainer from 'containers/School/SchoolOutboxEmailFormContainer';
import SendEmailForm from './SendEmailForm';

type MessageEmailTemplateProps = {
  schoolId: string,
  history: {},
  match: {
    params: {
      styleId: string,
    },
    path: string,
  },
  templatePlaceholders: [{}],
  allEmailTemplates: {
    payload: [{}],
  },
};

class MessageEmailTemplate extends React.Component {
  props: MessageEmailTemplateProps;

  constructor(props) {
    super(props);
    this.state = {
      selectedEmailTemplateId: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange(selectedEmailTemplateId) {
    this.setState({ selectedEmailTemplateId });
  }

  render() {
    const {
      studentId,
      schoolId,
      firstName,
      lastName,
      prevPath,
    } = this.props.location.state;
    let initialValues =
      this.props.allEmailTemplates.payload &&
      this.props.allEmailTemplates.payload.find(
        item => item.Id === this.state.selectedEmailTemplateId
      );

    const updatedSchoolId = this.props.match.params.schoolId;

    return (
      <Modal title="Send Email" closeUrl={prevPath}>
        <AllEmailTemplatesContainer
          dispatchFetchParams={schoolId || updatedSchoolId}
        >
          <SchoolAnemicStudentsContainer
            dispatchFetchParams={schoolId || updatedSchoolId}
          >
            <TemplatePlaceholdersContainer>
              <SchoolOutboxEmailFormContainer
                dispatchActionOnCloseParams={this.props.userId}
                redirectOnSuccess={prevPath}
              >
                <SendEmailForm
                  schoolId={schoolId || updatedSchoolId}
                  studentId={studentId}
                  studentName={firstName + ' ' + lastName}
                  templatePlaceholders={this.props.templatePlaceholders}
                  allEmailTemplates={this.props.allEmailTemplates}
                  handleEmailChange={this.handleEmailChange}
                  selectedEmailTemplateId={this.state.selectedEmailTemplateId}
                  initialValues={initialValues}
                />
              </SchoolOutboxEmailFormContainer>
            </TemplatePlaceholdersContainer>
          </SchoolAnemicStudentsContainer>
        </AllEmailTemplatesContainer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    allEmailTemplates: state.school.allEmailTemplates,
    templatePlaceholders: state.utility.templatePlaceholders,
  };
};

export default connect(
  MessageEmailTemplate,
  mapStateToProps
);
