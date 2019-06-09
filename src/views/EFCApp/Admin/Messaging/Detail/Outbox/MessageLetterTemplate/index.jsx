import React from 'react';
import connect from 'src/redux/connect';

import EfcUserLetterTemplatesContainer from 'containers/Administration/EfcUserLetterTemplatesContainer';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import EfcUserLetterOutboxFormContainer from 'containers/Administration/EfcUserLetterOutboxFormContainer';
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
      <EfcUserLetterTemplatesContainer>
        <SchoolAnemicStudentsContainer
          dispatchFetchParams={this.props.schoolId}
        >
          <TemplatePlaceholdersContainer>
            <EfcUserLetterOutboxFormContainer
              dispatchActionOnCloseParams={this.props.userId}
              redirectOnSuccess={`/app/admin/messaging/detail/${
                this.props.schoolId
              }/outbox/letter/print`}
              initialValues={initialValues}
            >
              <LetterSendListForm
                schoolId={this.props.schoolId}
                templatePlaceholders={this.props.templatePlaceholders}
                //templateTypeId="7e5fe161-5044-4a2d-84d8-3c0db24a06b0" //templateTypeId fixed for student
                allLetterTemplates={this.props.allLetterTemplates}
                handleLetterChange={this.handleLetterChange}
                selectedLetterTemplateId={this.state.selectedLetterTemplateId}
                allStudentLists={
                  this.props.location.state &&
                  this.props.location.state.initialValues
                }
              />
            </EfcUserLetterOutboxFormContainer>
          </TemplatePlaceholdersContainer>
        </SchoolAnemicStudentsContainer>
      </EfcUserLetterTemplatesContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    allLetterTemplates: state.administration.efcUserLetterTemplates,
    templatePlaceholders: state.utility.templatePlaceholders,
  };
};

export default connect(
  MessageLetterTemplate,
  mapStateToProps
);
