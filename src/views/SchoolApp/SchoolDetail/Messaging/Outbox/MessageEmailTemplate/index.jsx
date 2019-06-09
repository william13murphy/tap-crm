import React from 'react';
import connect from 'src/redux/connect';

import AllEmailTemplatesContainer from 'containers/School/AllEmailTemplatesContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import SchoolOutboxEmailFormContainer from 'containers/School/SchoolOutboxEmailFormContainer';
import EmailSendListForm from '..//EmailSendListForm';

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
    let initialValues =
      this.props.allEmailTemplates.payload &&
      this.props.allEmailTemplates.payload.find(
        item => item.Id === this.state.selectedEmailTemplateId
      );

    return (
      <AllEmailTemplatesContainer dispatchFetchParams={this.props.schoolId}>
        <SchoolAnemicStudentsContainer
          dispatchFetchParams={this.props.schoolId}
        >
          <TemplatePlaceholdersContainer>
            <SchoolOutboxEmailFormContainer
              dispatchActionOnCloseParams={this.props.schoolId}
              redirectOnSuccess={`/app/school-app/${
                this.props.schoolId
              }/school-detail/messaging/outbox`}
              initialValues={initialValues}
            >
              <EmailSendListForm
                schoolId={this.props.schoolId}
                templatePlaceholders={this.props.templatePlaceholders}
                allEmailTemplates={this.props.allEmailTemplates}
                handleEmailChange={this.handleEmailChange}
                selectedEmailTemplateId={this.state.selectedEmailTemplateId}
                allStudentLists={
                  this.props.location.state &&
                  this.props.location.state.initialValues &&
                  this.props.location.state.initialValues
                }
              />
            </SchoolOutboxEmailFormContainer>
          </TemplatePlaceholdersContainer>
        </SchoolAnemicStudentsContainer>
      </AllEmailTemplatesContainer>
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
