import React from 'react';
import Spinner from 'components/DataLoading/Spinner';
import PostFailMessage from 'components/DataLoading/PostFailMessage';
import PostSuccessMessage from 'components/DataLoading/PostSuccessMessage';
import ErrorBoundary from 'components/ErrorBoundary';
import { Redirect } from 'react-router-dom';

type GenericCalendarFormContainerProps = {
  children: React.DOMElement<any>,
  references?: {},

  formState: {
    payload: {},
    error?: boolean,
    status?: string,
  },

  statusPostStart: string, // POST_START action
  statusPostSuccess: string, // POST_SUCCESS action
  statusPostFail: string, // POST_FAIL action

  payloadDisplayName: string,

  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any, // Dispatches an action on close, but only if the form posted successfully.
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string, // Redirect on success with no parameters
  redirectOnSuccessWithReturnedId: string, // Use returned id as :id in redirect url

  initialValues: {},
};

class GenericCalendarFormContainer extends React.Component {
  props: GenericCalendarFormContainerProps;
  componentWillUnmount() {
    if (this.props.dispatchFormReset) {
      this.props.dispatchFormReset();
    }
    if (this.props.formState.status === this.props.statusPostSuccess) {
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
    if (this.props.formState.status === this.props.statusPostStart) {
      return <Spinner />;
    } else {
      return null;
    }
  }
  renderError() {
    if (this.props.formState.status === this.props.statusPostFail) {
      return <PostFailMessage error={this.props.formState.payload} />;
    } else {
      return null;
    }
  }
  render() {
    const childrenWithProps = this.getChildrenWithProps();

    if (this.props.formState.status === this.props.statusPostSuccess) {
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

export default GenericCalendarFormContainer;
