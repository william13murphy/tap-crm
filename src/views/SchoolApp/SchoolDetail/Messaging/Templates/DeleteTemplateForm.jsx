import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type DeleteTemplateFormProps = {
  dispatchFormPost: any,
  schoolId: string,
  id: string,
};

class DeleteTemplateForm extends React.Component {
  props: DeleteTemplateFormProps;
  onSubmit = formData => {
    delete formData.confirmEmail;
    formData.Description = formData.Subject;
    formData.SchoolId = this.props.schoolId;

    log('Submit formData: ', formData);
    this.props.dispatchFormPost(formData);
  };

  componentDidMount() {
    this.props.dispatchFormPost(this.props.id);
  }

  render() {
    return <div />;
  }
}

export default DeleteTemplateForm;
