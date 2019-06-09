import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';

import SelectField from 'components/Forms/SelectField';
import ImageField from 'components/Forms/ImageField';
import ColorField from 'components/Forms/ColorField';
import { imageToBase64String, base64StringToFields } from 'util/base64';
import { log } from 'log';

type AddSkillFormProps = {
  studentId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  token: {
    payload: {
      UserId: string,
    },
  },
  schoolId: string,
};

const validate = values => {
  const errors = {};

  if (!values.Name) {
    errors.Name = 'Please enter a Name.';
  }
  if (!values.Color) {
    errors.Color = 'Please select a color';
  }
  return errors;
};

class AddSkillForm extends React.Component {
  props: AddSkillFormProps;

  onSubmit = formData => {
    formData['ControlTypeId'] = 'c3689c23-601e-49d8-9f4a-ba71034bc499';
    formData['CreatedOn'] = '2018-11-06T16:43:04.943Z';
    formData['ChangedOn'] = '2018-11-06T16:43:04.943Z';
    formData['SchoolId'] = this.props.schoolId;

    log('AddSkillForm onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Name*" name="Name" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Description"
            name="Description"
            textarea={true}
            required={false}
          />
        </InputBlock>
        <InputBlock>
          <ColorField
            label="Select Color"
            name="Color"
            id="School.Programs.Ranks.AddSkill.SelectColor"
            help={true}
          />
        </InputBlock>
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'add-school-inventory', // a unique identifier for this form
  validate,
})(AddSkillForm);
