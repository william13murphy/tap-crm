import React from 'react';
import LoadingPlaceholder from 'components/DataLoading/LoadingPlaceholder';
import Spinner from 'components/DataLoading/Spinner';
import FetchFailMessage from 'components/DataLoading/FetchFailMessage';
import ErrorBoundary from 'components/ErrorBoundary';
import { fetchStatus } from 'src/redux/status';
import shallowEqualObjects from 'shallow-equal/objects';
import { getEnvironmentVariables } from 'util/environment';
import { log } from 'log';
import { fetchStatusColor } from '../redux/status';

class GenericFetchContainer extends React.Component {
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
    loading: {
      // height & width as a placeholder for loading content, for use in <LoadingPlaceholder />
      height: number,
      width: number,
    },
    noRefreshOnUpdate: boolean, // Prevent refreshing on Update. Fix for Calendar containers (caveat: changing school context will not refresh the calendar)
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    if (this.props.alwaysFetch) {
      if (!this.props.data.fetching) {
        this.dispatchFetchWithParams();
      }
    } else {
      if (!this.props.data.payload) {
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
        if (!this.props.data.fetching) {
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
    // Reset this piece of redux state when this component is unmounted.
    if (this.props.dispatchResetState) {
      this.props.dispatchResetState();
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
    const productionEnvironment = getEnvironmentVariables()
      .productionEnvironment;

    if (!productionEnvironment) {
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
  }

  renderFailure = () => (
    <FetchFailMessage
      name={this.props.payloadDisplayName}
      error={this.props.data.payload}
      tryAgainCallback={this.props.dispatchFetch}
      tryAgainCallbackParams={this.props.dispatchFetchParams}
    />
  );

  renderSpinner = () => (
    <Spinner
      small={(this.props.options && this.props.options.spinnerSmall) || false}
      message={this.props.payloadDisplayName}
    />
  );

  renderSpinnerWithPlaceholder = props => (
    <LoadingPlaceholder {...props}>{this.renderSpinner()}</LoadingPlaceholder>
  );

  renderTransition = () => {
    const { data, loading } = this.props;
    const { status } = data;

    if (status === fetchStatus.FETCH_FAIL) {
      return this.renderFailure();
    }

    if (status === fetchStatus.FETCH_SUCCESS) {
      return this.props.children;
    }

    return loading
      ? this.renderSpinnerWithPlaceholder(loading)
      : this.renderSpinner();
  };

  render() {
    const { data } = this.props;

    //const textColor = fetchStatusColor[this.props.data.status]
    //const textClass = this.props.data.status == fetchStatus.FETCH_SUCCESS ? 'fadeOut' : 'blinking';
    //const fetchInfo = <p className={textClass}><span style={{color: textColor, fontSize: '8px'}}>{`${this.props.data.status}`}</span></p>

    return (
      <ErrorBoundary>
        {data.payload ? this.props.children : this.renderTransition()}
      </ErrorBoundary>
    );
  }
}
export default GenericFetchContainer;
