import React from 'react';
import connect from 'src/redux/connect';

import AllLetterTemplatesContainer from 'containers/School/AllLetterTemplatesContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import SchoolOutboxLetterFormContainer from 'containers/School/SchoolOutboxLetterFormContainer';
import LetterSendListForm from '../LetterSendListForm';

type MessageLetterTemplateProps = {
  schoolId: string,
  history: {},
  match: {
    params: {
      styleId: string,
    },
    path: string,
  },
  templatePlaceholders: [{}],
  allLetterTemplates: {
    payload: [{}],
  },
};

class MessageLetterTemplate extends React.Component {
  props: MessageLetterTemplateProps;

  constructor(props) {
    super(props);
    this.state = {
      selectedLetterTemplateId: '',
    };

    this.handleLetterChange = this.handleLetterChange.bind(this);
  }

  handleLetterChange(selectedLetterTemplateId) {
    this.setState({ selectedLetterTemplateId });
  }

  render() {
    let initialValues =
      this.props.allLetterTemplates.payload &&
      this.props.allLetterTemplates.payload.find(
        item => item.Id === this.state.selectedLetterTemplateId
      );
    return (
      <AllLetterTemplatesContainer dispatchFetchParams={this.props.schoolId}>
        <SchoolAnemicStudentsContainer
          dispatchFetchParams={this.props.schoolId}
        >
          <TemplatePlaceholdersContainer>
            <SchoolOutboxLetterFormContainer
              dispatchActionOnCloseParams={this.props.schoolId}
              redirectOnSuccess={`/app/school-app/${
                this.props.schoolId
              }/school-detail/messaging/outbox/letter/print`}
              initialValues={initialValues}
            >
              <LetterSendListForm
                schoolId={this.props.schoolId}
                templatePlaceholders={this.props.templatePlaceholders}
                templateTypeId="7e5fe161-5044-4a2d-84d8-3c0db24a06b0" //templateTypeId fixed for student
                allLetterTemplates={this.props.allLetterTemplates}
                handleLetterChange={this.handleLetterChange}
                selectedLetterTemplateId={this.state.selectedLetterTemplateId}
                allStudentLists={
                  this.props.location.state &&
                  this.props.location.state.initialValues &&
                  this.props.location.state.initialValues
                }
              />
            </SchoolOutboxLetterFormContainer>
          </TemplatePlaceholdersContainer>
        </SchoolAnemicStudentsContainer>
      </AllLetterTemplatesContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    allLetterTemplates: state.school.allLetterTemplates,
    templatePlaceholders: state.utility.templatePlaceholders,
  };
};

export default connect(
  MessageLetterTemplate,
  mapStateToProps
);
