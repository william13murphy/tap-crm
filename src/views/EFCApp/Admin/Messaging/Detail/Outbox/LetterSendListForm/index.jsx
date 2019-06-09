import React from 'react';
import { reduxForm, change } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';

import SelectField from 'components/Forms/SelectField';
import HTMLField from 'components/Forms/HTMLField';
import SubmitButton from 'components/Forms/SubmitButton';
import connect from 'src/redux/connect';
import FormWrapper from 'components/Layout/FormWrapper';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import { log } from 'log';

type LetterSendListFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolId: any,
  templateTypeId: string,
  templatePlaceholders: {
    payload: [],
  },
  base64data: '',
};

const validate = values => {
  const errors = {};

  if (!values.TemplateId) {
    errors.TemplateId = 'Please Select a Template';
  }
  if (!values.PageSizeId) {
    errors.PageSizeId = 'Please select a Page Size';
  }
  if (!values.HtmlData) {
    errors.HtmlData = 'Please enter a Message';
  }
  return errors;
};

const marginSizes = [
  {
    label: '1"',
    value: 1,
  },
  {
    label: '2"',
    value: 2,
  },
  {
    label: '3"',
    value: 3,
  },
];

class LetterSendListForm extends React.Component {
  props: LetterSendListFormProps;
  constructor(props) {
    super(props);
    this.state = {
      templateTypeId: '',
    };
    this.handleLetterChange = this.handleLetterChange.bind(this);
  }
  onSubmit = formData => {
    formData.SchoolId = this.props.schoolId;
    let studentListId = this.props.match.params.listId;
    let allStudentLists =
      this.props.allStudentLists && this.props.allStudentLists.payload
        ? this.props.allStudentLists.payload
        : [];
    let matched = {}; //matched list will be stored here
    let selectedStudents = []; //will store student object with all detail
    let selectedStudentIds = []; //will store only student ids
    if (allStudentLists) {
      matched = allStudentLists.find(item => item.Id === studentListId);
      selectedStudents = matched.Students;
      selectedStudents.map(item => {
        selectedStudentIds.push(item.StudentId);
      });
    }

    formData.StudentIds = selectedStudentIds;
    formData.HtmlData = this.state.newHtmlData || formData.HtmlData;
    delete formData.StudentId;

    log('Submit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };

  handleLetterChange(selectedLetterTemplateId) {
    this.props.handleLetterChange(selectedLetterTemplateId);
  }

  componentWillReceiveProps(props) {
    if (props.allLetterTemplates.payload && props.selectedLetterTemplateId) {
      let currentTemplate = props.allLetterTemplates.payload.filter(
        item => item.Id === props.selectedLetterTemplateId
      );
      let currentTemplateTypeId = currentTemplate[0]['TemplateTypeId'];
      let tempPlaceholders = props.templatePlaceholders.payload.filter(
        item => item.TemplateTypeId === currentTemplateTypeId
      );
      let placeholders = tempPlaceholders.map(item => item.Name);
      this.setState({
        templateTypeId: currentTemplateTypeId,
        placeholders: placeholders,
      });
    }

    this.props.initialize({
      HtmlData: props.initialValues && props.initialValues.HtmlData,
      MarginBottom: props.initialValues && props.initialValues.MarginBottom,
      MarginTop: props.initialValues && props.initialValues.MarginTop,
      MarginLeft: props.initialValues && props.initialValues.MarginLeft,
      MarginRight: props.initialValues && props.initialValues.MarginRight,
      PageSizeId: props.initialValues && props.initialValues.PageSizeId,
      TemplateId:
        props.selectedLetterTemplateId && props.selectedLetterTemplateId,
    });
  }

  updateFormData = newHtmlData => {
    this.props.dispatch(change('letter-send-form', 'HtmlData', newHtmlData));
  };

  render() {
    return (
      <Page>
        <PageHeader>
          <PageTitle />
        </PageHeader>
        <PageBody center>
          <FormWrapper>
            <form
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              method="POST"
            >
              <InputBlock>
                <SelectField
                  label="Letter Templates*"
                  name="TemplateId"
                  required={true}
                  options={
                    this.props.allLetterTemplates &&
                    this.props.allLetterTemplates.payload &&
                    this.props.allLetterTemplates.payload.map(cV => {
                      return {
                        label: cV.Name,
                        value: cV.Id,
                      };
                    })
                  }
                  onChange={(event, value) => this.handleLetterChange(value)}
                />
              </InputBlock>
              <InputBlock>
                <SelectField
                  label="Page Size*"
                  name="PageSizeId"
                  placeholder=" "
                  required={true}
                  referenceOptions="LstPageSize"
                />
              </InputBlock>
              <InputBlock>
                <SelectField
                  label="Top Margin"
                  name="MarginTop"
                  placeholder="None"
                  options={marginSizes}
                />
                <SelectField
                  label="Bottom Margin"
                  name="MarginBottom"
                  placeholder="None"
                  options={marginSizes}
                />
              </InputBlock>
              <InputBlock>
                <SelectField
                  label="Left Margin"
                  name="MarginLeft"
                  placeholder="None"
                  options={marginSizes}
                />
                <SelectField
                  label="Right Margin"
                  name="MarginRight"
                  placeholder="None"
                  options={marginSizes}
                />
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
          </FormWrapper>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
  };
};

const ConnectedLetterSendForm = connect(
  LetterSendListForm,
  mapStateToProps
);

export default reduxForm({
  form: 'letter-send-form', // a unique identifier for this form
  validate,
})(ConnectedLetterSendForm);
