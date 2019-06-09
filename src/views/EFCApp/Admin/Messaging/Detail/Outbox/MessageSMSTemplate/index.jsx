import React from 'react';
import connect from 'src/redux/connect';

import EfcUserSMSTemplatesContainer from 'containers/Administration/EfcUserSMSTemplatesContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import EfcUserSMSOutboxFormContainer from 'containers/Administration/EfcUserSMSOutboxFormContainer';
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
      <EfcUserSMSTemplatesContainer>
        <SchoolAnemicStudentsContainer
          dispatchFetchParams={this.props.schoolId}
        >
          <TemplatePlaceholdersContainer>
            <EfcUserSMSOutboxFormContainer
              dispatchActionOnCloseParams={this.props.userId}
              redirectOnSuccess={`/app/admin/messaging/detail/${
                this.props.schoolId
              }/outbox`}
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
                  this.props.location.state.initialValues
                }
              />
            </EfcUserSMSOutboxFormContainer>
          </TemplatePlaceholdersContainer>
        </SchoolAnemicStudentsContainer>
      </EfcUserSMSTemplatesContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    allSMSTemplates: state.administration.efcUserSMSTemplates,
    templatePlaceholders: state.utility.templatePlaceholders,
  };
};

export default connect(
  MessageSMSTemplate,
  mapStateToProps
);
