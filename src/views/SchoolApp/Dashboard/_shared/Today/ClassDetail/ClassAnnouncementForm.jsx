import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import InputBlock from 'components/Forms/InputBlock';
import SubmitButton from 'components/Forms/SubmitButton';
import TextField from 'components/Forms/TextField';
import { log } from 'log';

type ClassAnnouncementFormProps = {
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  classId: string,
};

const validate = values => {
  const errors = {};
  return errors;
};

class ClassAnnouncementForm extends React.Component {
  props: ClassAnnouncementFormProps;
  constructor() {
    super();
    this.state = {
      clockedIn: false,
    };
  }
  onSubmit = formData => {
    log('Submit formData: ', formData);
    // this.props.dispatchFormPost(formData);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Subject*" name="Subject" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Message*"
            name="Message"
            required={true}
            textarea={true}
          />
        </InputBlock>
        <div className="FormButtonsContainer">
          <Link
            to={{
              path: `/app/dashboard/class-detail/${this.props.classId}`,
            }}
          >
            <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
          </Link>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'clock-in-out', // a unique identifier for this form
  validate,
})(ClassAnnouncementForm);
