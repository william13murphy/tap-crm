import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import { Redirect } from 'react-router-dom';
import { dynamicBackRoute } from 'util/router';

import InputBlock from 'components/Forms/InputBlock';
import EmailField from 'components/Forms/EmailField';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';

type PublicCustomerFormProps = {
  schoolId: string,
  userId: string,
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolProfile: {
    payload: {
      CountryId: string,
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Please enter a Name.';
  }
  if (!values.email) {
    errors.email = 'Please enter an Email Address.';
  }
  return errors;
};

class PublicCustomerForm extends React.Component {
  props: PublicCustomerFormProps;
  state = {
    redirect: false,
  };

  onSubmit = values => {
    this.props.dispatchCustomerUpdate({
      selected: 'PUBLIC',
      details: {
        name: values.name,
        email: values.email,
        id: 'N/A',
        properties: {},
      },
      screen: 'PUBLIC',
    });
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      const posUrl = dynamicBackRoute(this.props.match.url, '/customer-type');
      return <Redirect to={`${posUrl}/select-item`} />;
    }
    return (
      <form
        className="PublicContainer__form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="PublicContainer">
          <div className="PublicContainer__list">
            <div className="PublicContainer__header">Enter details</div>

            <InputBlock>
              <TextField
                className="PublicContainer__name"
                type="text"
                placeholder="Name"
                name="name"
                required={true}
              />
            </InputBlock>
            <InputBlock>
              <EmailField
                className="PublicContainer__email"
                type="text"
                placeholder="Email Address"
                name="email"
                required={true}
              />
            </InputBlock>
          </div>
          <div className="Footer">
            <SubmitButton
              className="Footer__link pt-button pt-intent-primary"
              intent="pt-intent-primary"
            >
              Proceed
            </SubmitButton>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const connectedPublicCustomerForm = connect(
  PublicCustomerForm,
  mapStateToProps
);

export default reduxForm({
  form: 'public-customer', // a unique identifier for this form
  validate,
})(connectedPublicCustomerForm);
