import PostFailMessage from 'components/DataLoading/PostFailMessage';
import PostSuccessMessage from 'components/DataLoading/PostSuccessMessage';
import Spinner from 'components/DataLoading/Spinner';
import ErrorBoundary from 'components/ErrorBoundary';
import Toast from 'components/Toast';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { postStatus } from 'src/redux/status';

type GenericFormContainerProps = {
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
  dispatchActionOnClose: any, // Dispatches an action on close, but only if the form posted successfully.
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string, // Redirect on success with no parameters
  redirectOnSuccessWithReturnedId: string, // Use returned id as :id in redirect url

  initialValues: {},
  noToast?: boolean,
};

class GenericFormContainer extends React.Component {
  props: GenericFormContainerProps;

  componentWillUnmount() {
    if (this.props.dispatchFormReset) {
      this.props.dispatchFormReset();
    }
    if (this.props.formState.status === postStatus.POST_SUCCESS) {
      if (!this.props.noToast) {
        this.showToast();
      }
      if (this.props.dispatchActionOnClose) {
        if (this.props.dispatchActionOnCloseParams) {
          this.props.dispatchActionOnClose(
            this.props.dispatchActionOnCloseParams
          );
        } else {
          this.props.dispatchActionOnClose();
        }
      }
    }
  }

  showToast() {
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
  renderSuccess() {
    if (this.props.redirectOnSuccessWithReturnedId) {
      return (
        <Redirect
          to={this.props.redirectOnSuccessWithReturnedId.replace(
            ':id',
            this.props.formState.payload
          )}
        />
      );
    } else if (this.props.redirectOnSuccess) {
      return <Redirect to={this.props.redirectOnSuccess} />;
    } else {
      return <PostSuccessMessage message={this.props.payloadDisplayName} />;
    }
  }
  renderSpinner() {
    if (this.props.formState.status === postStatus.POST_START) {
      return <Spinner message={this.props.payloadDisplayName} />;
    } else {
      return null;
    }
  }
  renderError() {
    if (this.props.formState.status === postStatus.POST_FAIL) {
      return <PostFailMessage error={this.props.formState.payload} />;
    } else {
      return null;
    }
  }
  render() {
    const childrenWithProps = this.getChildrenWithProps();

    if (this.props.formState.status === postStatus.POST_SUCCESS) {
      return <div>{this.renderSuccess()}</div>;
    } else {
      return (
        <ErrorBoundary>
          {this.renderSpinner()}
          {this.renderError()}
          {childrenWithProps}
        </ErrorBoundary>
      );
    }
  }
}

export default GenericFormContainer;
