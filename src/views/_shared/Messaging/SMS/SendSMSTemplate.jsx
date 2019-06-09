import React from 'react';
import connect from 'src/redux/connect';

import EfcUserSMSTemplatesContainer from 'containers/Administration/EfcUserSMSTemplatesContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import EfcUserSMSOutboxFormContainer from 'containers/Administration/EfcUserSMSOutboxFormContainer';
import SchoolOutboxSMSFormContainer from 'containers/School/SchoolOutboxSMSFormContainer';
import AllSMSTemplatesContainer from 'containers/School/AllSMSTemplatesContainer';
import SendSMSForm from './SendSMSForm';
import Modal from 'components/Modal';

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
    const {
      studentId,
      schoolId,
      firstName,
      lastName,
      prevPath,
    } = this.props.location.state;
    let initialValues =
      this.props.allSMSTemplates.payload &&
      this.props.allSMSTemplates.payload.find(
        item => item.Id === this.state.selectedSmsTemplateId
      );

    const updatedSchoolId = this.props.match.params.schoolId;

    return (
      <Modal title="Send SMS" closeUrl={prevPath}>
        <AllSMSTemplatesContainer
          dispatchFetchParams={schoolId || updatedSchoolId}
        >
          <SchoolOutboxSMSFormContainer
            dispatchActionOnCloseParams={schoolId || updatedSchoolId}
            redirectOnSuccess={prevPath}
          >
            <SendSMSForm
              schoolId={schoolId || updatedSchoolId}
              studentId={studentId}
              studentName={firstName + ' ' + lastName}
              handleSmsChange={this.handleSmsChange}
              selectedSmsTemplateId={this.state.selectedSmsTemplateId}
              allSMSTemplates={this.props.allSMSTemplates}
              initialValues={initialValues}
            />
          </SchoolOutboxSMSFormContainer>
        </AllSMSTemplatesContainer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    allSMSTemplates: state.school.allSMSTemplates,
    templatePlaceholders: state.utility.templatePlaceholders,
  };
};

export default connect(
  MessageSMSTemplate,
  mapStateToProps
);
