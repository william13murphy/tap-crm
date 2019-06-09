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
--GenericReportFormContainer--

* Use this form container when you want to submit a form, get back the data, update and display the data in a grid.
* Especially, when we need to fetch and update the data, after making a Successful Post api call.
* Note that, the passed in dispatchActionOnSuccessParams are used to fetch the data, after the initial call is done.

Differences:
1. Renders success & error states as a toast.
2. dispatchActionOnClose/Params -> Renamed to: dispatchActionOnSuccess/Params
3. Displays a small spinner, encapsulated in the form.
*/

type GenericReportFormContainerProps = {
  children: React.DOMElement<any>,
  references?: {},

  formState: {
    payload: {},
    error?: boolean,
    status?: string,
  },

  payloadDisplayName: string,

  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnSuccess: any,
  dispatchActionOnSuccessParams: any,
  initialValues: {},
  noToast?: boolean,
};

class GenericReportFormContainer extends React.Component {
  props: GenericReportFormContainerProps;
  state = {
    timeout: false,
    status: null,
  };
  componentWillUnmount() {
    if (this.props.dispatchFormReset) {
      this.props.dispatchFormReset();
    }
  }
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
    return <PostFailMessage error={this.props.formState.payload} />;
  }
  getChildrenWithProps() {
    if (this.props.initialValues) {
      return React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          dispatchFormPost: this.props.dispatchFormPost,
          initialValues: this.props.initialValues,
        })
      );
    } else {
      return React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          dispatchFormPost: this.props.dispatchFormPost,
        })
      );
    }
  }
  renderSpinner() {
    if (this.props.formState.status === postStatus.POST_START) {
      log(
        'GenericReportFormContainer >>> %cStart...',
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
    if (this.props.formState.status === postStatus.POST_SUCCESS) {
      log(
        'GenericReportFormContainer >>> %cSuccess',
        'color: green',
        this.props
      );
      if (this.state.status !== 'success') {
        this.setState({
          status: 'success',
        });
        this.clearStateTimeout();
        this.showSuccessToast();
        this.props.dispatchFormReset();
        this.dispatchSuccess();
      }
      return null;
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
    if (this.props.formState.status === postStatus.POST_FAIL) {
      log('GenericReportFormContainer >>> %cFail', 'color: red', this.props);
      if (this.state.status !== 'fail') {
        this.setState({
          status: 'fail',
        });
        this.clearStateTimeout();
        this.showFailToast();
        this.props.dispatchFormReset();
        return null;
      }
    }
  }
  render() {
    const childrenWithProps = this.getChildrenWithProps();

    return (
      <ErrorBoundary>
        <div
          className="GenericReportFormContainer"
          style={{ position: 'relative', display: 'inline-block' }}
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

export default GenericReportFormContainer;
