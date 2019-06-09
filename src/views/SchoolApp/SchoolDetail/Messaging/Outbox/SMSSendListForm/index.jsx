import React from 'react';
import connect from 'src/redux/connect';
import { reduxForm, change } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import HTMLField from 'components/Forms/HTMLField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type SMSSendListFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: string,
  templateTypeId: string,
  templatePlaceholders: {
    payload: [],
  },
  students: {
    payload: [],
  },
  match: {
    params: {
      templateType: string,
      listId: string,
    },
  },
  allSMSTemplates: [{}],
  handleSmsChange: Function,
  initialize: Function,
  initialValues: {
    Subject: string,
    HtmlData: string,
  },
  selectedSmsTemplateId: string,
  allStudentLists: {
    payload: {},
  },
};

const validate = values => {
  const errors = {};
  if (!values.Name) {
    errors.Name = 'Please enter a Name';
  }
  if (!values.Subject) {
    errors.Subject = 'Please enter a Subject';
  }
  if (!values.HtmlData) {
    errors.HtmlData = 'Please enter a Message';
  }
  return errors;
};

class SMSSendListForm extends React.Component {
  props: SMSSendListFormProps;
  constructor(props) {
    super(props);
    this.state = {
      templateTypeId: '',
    };
    this.handleSmsChange = this.handleSmsChange.bind(this);
  }
  onSubmit = formData => {
    let selectedStudentIds = []; //will store only student ids
    let customeReports =
      this.props.allStudentLists && this.props.allStudentLists.payload
        ? this.props.allStudentLists.payload
        : [];

    if (customeReports && !this.props.location.state.smartList) {
      let studentListId = this.props.match.params.listId;
      let matched = {}; //matched list will be stored here
      let selectedStudents = []; //will store student object with all detail

      matched = customeReports.find(item => item.Id === studentListId);
      selectedStudents = matched.Students;
      selectedStudents.map(item => {
        selectedStudentIds.push(item.StudentId);
      });
    } else {
      selectedStudentIds = this.props.location.state.filteredStudents;
    }
    for (let propName in formData) {
      if (formData[propName] === null || formData[propName] === undefined) {
        delete formData[propName];
      }
    }

    formData.SchoolId = this.props.schoolId;
    formData.StudentIds = selectedStudentIds;
    formData.HtmlData = this.state.newHtmlData || formData.HtmlData;
    delete formData.StudentId;
    delete formData.confirmSMS;

    log('Submit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };

  handleSmsChange(selectedSmsTemplateId) {
    this.props.handleSmsChange(selectedSmsTemplateId);
  }

  componentWillReceiveProps(props) {
    if (props.allSMSTemplates.payload && props.selectedSmsTemplateId) {
      let currentTemplate = props.allSMSTemplates.payload.filter(
        item => item.Id === props.selectedSmsTemplateId
      );
      let currentTemplateTypeId = currentTemplate[0]['TemplateTypeId'];
      let tempPlaceholders = props.templatePlaceholders.payload.filter(
        item => item.TemplateTypeId === currentTemplateTypeId
      );
      let placeholders = tempPlaceholders.map(item => item.Name);
      this.setState({
        placeholders,
      });
    }

    this.props.initialize({
      Subject: props.initialValues && props.initialValues.Subject,
      HtmlData: props.initialValues && props.initialValues.HtmlData,
      TemplateId: props.selectedSmsTemplateId && props.selectedSmsTemplateId,
    });
  }

  updateFormData = newHtmlData => {
    this.props.dispatch(change('email-template', 'HtmlData', newHtmlData));
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SelectField
            label="SMS Templates*"
            name="TemplateId"
            required={true}
            options={
              this.props.allSMSTemplates &&
              this.props.allSMSTemplates.payload &&
              this.props.allSMSTemplates.payload.map(cV => {
                return {
                  label: cV.Name,
                  value: cV.Id,
                };
              })
            }
            onChange={(event, value) => this.handleSmsChange(value)}
          />
        </InputBlock>
        <InputBlock />
        <InputBlock>
          <TextField label="Subject*" name="Subject" required={true} />
        </InputBlock>
        <InputBlock>
          <HTMLField
            label="Message*"
            name="HtmlData"
            placeholders={this.state.placeholders}
            required={true}
            updateFormData={this.updateFormData}
          />
        </InputBlock>
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    templatePlaceholders: state.utility.templatePlaceholders,
    references: state.utility.references,
    students: state.school.anemicStudents,
  };
};

const ConnectedSMSSendForm = connect(
  SMSSendListForm,
  mapStateToProps
);

export default reduxForm({
  form: 'email-template', // a unique identifier for this form
  validate,
})(ConnectedSMSSendForm);
