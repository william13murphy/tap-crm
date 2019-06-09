import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import './styles.less';

type SearchStudentFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  token: {
    payload: {
      UserId: string,
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.Term) {
    errors.Term = 'Please enter a Search Term.';
  }
  return errors;
};

class SearchStudentForm extends React.Component {
  props: SearchStudentFormProps;
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }
  onSubmit = formData => {
    this.props.dispatchFormPost({
      SchoolId: '00000000-0000-0000-0000-000000000000',
      Term: formData.Term,
    });
  };

  render() {
    return (
      <div className="SearchStudentForm">
        <form
          className="Search__student__form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          method="POST"
        >
          <InputBlock>
            <TextField
              className="Search__student__input"
              type="text"
              placeholder="Student search"
              name="Term"
              required={true}
            />
          </InputBlock>
          <SubmitButton
            className="Submit__button"
            intent="pt-button pt-intent-primary"
          >
            Submit
          </SubmitButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    styles: state.school.styles,
  };
};

export default reduxForm({
  form: 'search-all-student', // a unique identifier for this form
  validate,
})(SearchStudentForm, mapStateToProps);
