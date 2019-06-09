import React from 'react';
import Spinner from 'components/DataLoading/Spinner';
import FetchFailMessage from 'components/DataLoading/FetchFailMessage';
import ErrorBoundary from 'components/ErrorBoundary';
import { fetchStatus } from 'src/redux/status';
import shallowEqualObjects from 'shallow-equal/objects';
import { log } from 'log';

// Similar to GenericFetchContainer, however:
// To be used with ManyFetchReducer.
// Does not track FETCH_START, instead shows a loading state if not FETCH_SUCCESS or FETCH_FAIL
// Only renders its children if the parameter passed in as dispatchFetchParams has been successfully fetched.
// Currently only accepts one parameter!
// TODO: Create a GenericMiltiParamManyFetchContainer, that takes an "id" param from dispatchFetchParams, and uses that for the manyFetch key.

class GenericManyFetchContainer extends React.Component {
  props: {
    alwaysFetch?: boolean,
    className?: any,
    children: any,
    data: {
      status: string,
      payload: Array<{}> | {} | null,
      fetching: boolean,
      error?: boolean,
    },
    dispatchFetch: any,
    dispatchFetchParams?: any,
    dispatchActionOnClose?: any,
    dispatchActionOnCloseParams?: any,
    payloadDisplayName: string,
    options: {
      spinner?: boolean, // False to disable spinner
      spinnerSmall?: boolean,
    },
    noRefreshOnUpdate: boolean, // Prevent refreshing on Update. Fix for Calendar containers (caveat: changing school context will not refresh the calendar)
  };
  componentDidMount() {
    if (this.props.alwaysFetch) {
      if (
        !(
          this.props.data.fetching &&
          this.props.data.fetching[this.props.dispatchFetchParams]
        )
      ) {
        this.dispatchFetchWithParams();
      }
    } else {
      if (
        !(
          this.props.data.payload &&
          this.props.data.payload[this.props.dispatchFetchParams]
        )
      ) {
        this.dispatchFetchWithParams();
      }
    }
  }
  componentDidUpdate(newprops) {
    if (!this.props.noRefreshOnUpdate) {
      const newPropsEqual = shallowEqualObjects(
        newprops.dispatchFetchParams,
        this.props.dispatchFetchParams
      );

      if (newPropsEqual === false) {
        if (
          !(
            this.props.data.fetching &&
            this.props.data.fetching[this.props.dispatchFetchParams]
          )
        ) {
          this.dispatchFetchWithParams();
        }
      }
    }
  }
  componentWillUnmount() {
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
  dispatchFetchWithParams() {
    if (this.props.dispatchFetchParams) {
      this.props.dispatchFetch(this.props.dispatchFetchParams);
    } else {
      this.props.dispatchFetch();
    }
  }
  logPayload() {
    const containerName =
      (this._reactInternalFiber &&
        this._reactInternalFiber._debugOwner &&
        this._reactInternalFiber._debugOwner.stateNode &&
        this._reactInternalFiber._debugOwner.stateNode.constructor &&
        this._reactInternalFiber._debugOwner.stateNode.constructor.name) ||
      'Container';

    const payloadName = this.props.payloadDisplayName || '';

    log(
      '%c' + containerName + ' %cfetched %c' + payloadName + '%c: ',
      'color: green',
      'color: black',
      'color: green',
      'color: black',
      this.props.data.payload || '(no payload)'
    );
  }
  renderSpinner() {
    if (this.props.options && this.props.options.spinner === false) {
      return null;
    } else {
      return (
        <Spinner
          small={
            (this.props.options && this.props.options.spinnerSmall) || false
          }
          message={this.props.payloadDisplayName}
        />
      );
    }
  }
  renderSpinnerIfEnabled() {
    return (
      <div className="GenericManyFetchContainer__Spinner">
        {this.renderSpinner()}
      </div>
    );
  }
  render() {
    if (!this.props.data.status) {
      return this.renderSpinnerIfEnabled();
    }
    if (
      this.props.data.status[this.props.dispatchFetchParams] ===
      fetchStatus.FETCH_START
    ) {
      return this.renderSpinnerIfEnabled();
    }
    if (
      this.props.data.status[this.props.dispatchFetchParams] ===
      fetchStatus.FETCH_SUCCESS
    ) {
      this.logPayload();
      return <ErrorBoundary>{this.props.children}</ErrorBoundary> || null;
    } else if (
      this.props.data.status[this.props.dispatchFetchParams] ===
      fetchStatus.FETCH_FAIL
    ) {
      return (
        <ErrorBoundary>
          <FetchFailMessage
            name={this.props.payloadDisplayName}
            error={this.props.data.payload}
            tryAgainCallback={this.props.dispatchFetch}
          />
        </ErrorBoundary>
      );
    } else {
      // Loading has not yet begun, so return null:
      return null;
    }
  }
}
export default GenericManyFetchContainer;
