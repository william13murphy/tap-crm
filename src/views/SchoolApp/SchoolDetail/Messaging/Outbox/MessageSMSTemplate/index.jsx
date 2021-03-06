import React from 'react';
import connect from 'src/redux/connect';

import AllSMSTemplatesContainer from 'containers/School/AllSMSTemplatesContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import SchoolOutboxSMSFormContainer from 'containers/School/SchoolOutboxSMSFormContainer';
import SMSSendListForm from '../SMSSendListForm';

type MessageSMSTemplateProps = {
  schoolId: string,
  history: {},
  match: {
    params: {
      styleId: string,
    },
    path: string,
  },
  templatePlaceholders: [{}],
  allSMSTemplates: {
    payload: [{}],
  },
};

class MessageSMSTemplate extends React.Component {
  props: MessageSMSTemplateProps;

  constructor(props) {
    super(props);
    this.state = {
      selectedSmsTemplateId: '',
    };

    this.handleSmsChange = this.handleSmsChange.bind(this);
  }

  handleSmsChange(selectedSmsTemplateId) {
    this.setState({ selectedSmsTemplateId });
  }

  render() {
    let initialValues =
      this.props.allSMSTemplates.payload &&
      this.props.allSMSTemplates.payload.find(
        item => item.Id === this.state.selectedSmsTemplateId
      );
    return (
      <AllSMSTemplatesContainer dispatchFetchParams={this.props.schoolId}>
        <SchoolAnemicStudentsContainer
          dispatchFetchParams={this.props.schoolId}
        >
          <TemplatePlaceholdersContainer>
            <SchoolOutboxSMSFormContainer
              dispatchActionOnCloseParams={this.props.schoolId}
              redirectOnSuccess={`/app/school-app/${
                this.props.schoolId
              }/school-detail/messaging/outbox`}
              initialValues={initialValues}
            >
              <SMSSendListForm
                schoolId={this.props.schoolId}
                templatePlaceholders={this.props.templatePlaceholders}
                allSMSTemplates={this.props.allSMSTemplates}
                handleSmsChange={this.handleSmsChange}
                selectedSmsTemplateId={this.state.selectedSmsTemplateId}
                allStudentLists={
                  this.props.location.state &&
                  this.props.location.state.initialValues &&
                  this.props.location.state.initialValues
                }
              />
            </SchoolOutboxSMSFormContainer>
          </TemplatePlaceholdersContainer>
        </SchoolAnemicStudentsContainer>
      </AllSMSTemplatesContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    allSMSTemplates: state.school.allSMSTemplates,
    templatePlaceholders: state.utility.templatePlaceholders,
  };
};

export default connect(MessageSMSTemplate, mapStateToProps);
