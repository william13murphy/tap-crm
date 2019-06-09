import React from 'react';
import Spinner from 'components/DataLoading/Spinner';
import PostFailMessage from 'components/DataLoading/PostFailMessage';
import PostSuccessMessage from 'components/DataLoading/PostSuccessMessage';
import ErrorBoundary from 'components/ErrorBoundary';
import { Redirect } from 'react-router-dom';
import { postStatus } from 'src/redux/status';
import Toast from 'components/Toast';
import { log } from 'log';

/*

-- GenericStatefulFormContainer --

* Use this form container when holding the form state in redux becomes cumbersome...
* Especially when you have many versions of the same form on the screen.
* For example, in a table with many of the same SingleButtonForms, one for each row.

* Note that you must pass in an endpoint directly as "formPostEndpoint", instead of a redux action.
* Also, the form's formData object much match the endpoint's parameters.

*/

type GenericStatefulFormContainerProps = {
  children: React.DOMElement<any>,

  payloadDisplayName: string,
  formPostEndpoint: Function,

  dispatchActionOnSuccess: any,
  dispatchActionOnSuccessParams: any,

  // dispatchFormPost: any,

  redirectOnSuccess: string, // Redirect on success with no parameters
  redirectOnSuccessWithReturnedId: string, // Use returned id as :id in redirect url

  initialValues: {},
  noToast?: boolean,
};

const initialState = {
  loading: false,
  payload: undefined,
  error: undefined,
  timeout: false,
  status: null,
};

class GenericStatefulFormContainer extends React.Component {
  props: GenericStatefulFormContainerProps;
  state = {
    initialState,
  };
  resetState = () => {
    this.setState(initialState);
  };
  dispatchFormPost = formData => {
    this.setState({ loading: true });

    // Post formData to formPostEndpoint:
    this.props
      .formPostEndpoint(formData)
      .done(payload => {
        this.setState({ loading: false, payload });
      })
      .fail(error => {
        this.setState({ loading: false, error });
      });
  };
  showFailToast() {
    Toast.showError(
      this.props.payloadDisplayName
        ? `There was an error posting ${this.props.payloadDisplayName}`
        : 'Error.'
    );
  }
  showSuccessToast() {
    Toast.showSuccess(
      this.props.payloadDisplayName
        ? `${this.props.payloadDisplayName} has been posted.`
        : 'Success.'
    );
  }
  renderFormError() {
    return <PostFailMessage error={this.state.payload} />;
  }
  getChildrenWithProps() {
    if (this.props.initialValues) {
      return React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          dispatchFormPost: this.dispatchFormPost,
          initialValues: this.props.initialValues,
        })
      );
    } else {
      return React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          dispatchFormPost: this.dispatchFormPost,
        })
      );
    }
  }
  renderSpinner() {
    if (this.state.loading === true) {
      log(
        'GenericStatefulFormContainer >>> %cStart...',
        'color: blue',
        this.props
      );
      return <Spinner small screen message={this.props.payloadDisplayName} />;
    } else {
      return null;
    }
  }
  dispatchSuccess() {
    if (this.props.dispatchActionOnSuccess) {
      if (this.props.dispatchActionOnSuccessParams) {
        this.props.dispatchActionOnSuccess(
          this.props.dispatchActionOnSuccessParams
        );
      } else {
        this.props.dispatchActionOnSuccess();
      }
    }
  }
  renderSuccess() {
    if (this.state.loading === false && this.state.payload) {
      log(
        'GenericStatefulFormContainer >>> %cSuccess',
        'color: green',
        this.props
      );

      if (this.state.status !== 'success') {
        this.setState({
          status: 'success',
        });
        this.clearStateTimeout();
        this.showSuccessToast();
        this.resetState();
        this.dispatchSuccess();
      }
      if (this.props.redirectOnSuccessWithReturnedId) {
        return (
          <Redirect
            to={this.props.redirectOnSuccessWithReturnedId.replace(
              ':id',
              this.state.payload
            )}
          />
        );
      } else if (this.props.redirectOnSuccess) {
        return <Redirect to={this.props.redirectOnSuccess} />;
      } else {
        return null;
      }
    }
  }

  clearStateTimeout() {
    if (this.state.timeout === false) {
      this.setState({
        timeout: true,
      });

      // Prevent double-clicking form post:
      setTimeout(() => {
        this.setState({
          timeout: false,
          status: null,
        });
      }, 500);
    }
  }
  renderError() {
    if (this.state.loading === false && this.state.error) {
      log('GenericStatefulFormContainer >>> %cFail', 'color: red', this.props);
      if (this.state.status !== 'fail') {
        this.setState({
          status: 'fail',
        });
        this.clearStateTimeout();
        this.showFailToast();
        this.resetState();
        return null;
      }
    }
  }
  render() {
    const childrenWithProps = this.getChildrenWithProps();

    return (
      <ErrorBoundary>
        <div
          className="GenericStatefulFormContainer"
          style={{ position: 'relative' }}
        >
          {this.renderSpinner()}
          {this.renderError()}
          {this.renderSuccess()}
          {childrenWithProps}
        </div>
      </ErrorBoundary>
    );
  }
}

export default GenericStatefulFormContainer;
