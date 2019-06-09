import React from 'react';
import connect from 'src/redux/connect';

import EfcUserEmailTemplatesContainer from 'containers/Administration/EfcUserEmailTemplatesContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import EfcUserEmailOutboxFormContainer from 'containers/Administration/EfcUserEmailOutboxFormContainer';
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
      this.props.efcUserEmailTemplates.payload &&
      this.props.efcUserEmailTemplates.payload.find(
        item => item.Id === this.state.selectedEmailTemplateId
      );
    return (
      <EfcUserEmailTemplatesContainer>
        <SchoolAnemicStudentsContainer
          dispatchFetchParams={this.props.schoolId}
        >
          <TemplatePlaceholdersContainer>
            <EfcUserEmailOutboxFormContainer
              dispatchActionOnCloseParams={this.props.userId}
              redirectOnSuccess={`/app/admin/messaging/detail/${
                this.props.schoolId
              }/outbox`}
              initialValues={initialValues}
            >
              <EmailSendListForm
                schoolId={this.props.schoolId}
                templatePlaceholders={this.props.templatePlaceholders}
                allEmailTemplates={this.props.efcUserEmailTemplates}
                handleEmailChange={this.handleEmailChange}
                selectedEmailTemplateId={this.state.selectedEmailTemplateId}
                allStudentLists={
                  this.props.location.state &&
                  this.props.location.state.initialValues
                }
              />
            </EfcUserEmailOutboxFormContainer>
          </TemplatePlaceholdersContainer>
        </SchoolAnemicStudentsContainer>
      </EfcUserEmailTemplatesContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    efcUserEmailTemplates: state.administration.efcUserEmailTemplates,
    templatePlaceholders: state.utility.templatePlaceholders,
  };
};

export default connect(
  MessageEmailTemplate,
  mapStateToProps
);
