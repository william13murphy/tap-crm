import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';

import SelectField from 'components/Forms/SelectField';
import HTMLField from 'components/Forms/HTMLField';
import SubmitButton from 'components/Forms/SubmitButton';
import connect from 'src/redux/connect';
import { getReferenceItemOptions } from 'api/referenceItems';
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
    let selectedStudentIds = [];
    let allStudentLists =
      this.props.allStudentLists && this.props.allStudentLists.payload
        ? this.props.allStudentLists.payload
        : [];

    if (allStudentLists && !this.props.location.state.smartList) {
      let studentListId = this.props.match.params.listId;
      let matched = {}; //matched list will be stored here
      let selectedStudents = []; //will store student object with all detail

      matched = allStudentLists.find(item => item.Id === studentListId);
      selectedStudents = matched.Students;
      selectedStudents.map(item => {
        selectedStudentIds.push(item.StudentId);
      });
    } else {
      selectedStudentIds = this.props.location.state.filteredStudents;
    }

    formData.SchoolId = this.props.schoolId;
    formData.StudentIds = selectedStudentIds;
    formData.HtmlData = this.state.newHtmlData || formData.HtmlData;
    delete formData.StudentId;

    log('Submit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };
  componentWillMount() {
    const templateType = this.props.match.params.templateType;
    let templateTypeId = this.props.templateTypeId;

    if (!this.props.templateTypeId) {
      let items = getReferenceItemOptions(
        'LstTemplateTypes',
        this.props.references
      );

      let matched = items.find(
        item => item.label.toLowerCase() === templateType.toLowerCase()
      );
      templateTypeId = matched && matched.value;
    }

    let templatePlaceholders = this.props.templatePlaceholders.payload.filter(
      item => item.TemplateTypeId === templateTypeId
    );

    const placeholders = templatePlaceholders.map(item => item.Name);

    this.setState({
      templateTypeId: templateTypeId,
      placeholders: placeholders, //templateTypeArrays[templateType],
    });
  }

  handleLetterChange(selectedLetterTemplateId) {
    this.props.handleLetterChange(selectedLetterTemplateId);
  }

  componentWillReceiveProps(props) {
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
    this.setState({ newHtmlData });
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
                    this.props.allLetterTemplates.payload
                      .filter(item => !item.WellKnownTypeId)
                      .map(item => {
                        return {
                          label: item.Name,
                          value: item.Id,
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
    templatePlaceholders: state.utility.templatePlaceholders,
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
