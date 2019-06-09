import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  searchFuzzyFetch,
  searchFuzzyResetState,
} from 'src/redux/actionCreators/school/searchFuzzy';

const payloadDisplayName = 'Search';

class SearchFuzzyContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    dispatchActionOnClose: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.searchFuzzy,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: params => {
      dispatch(searchFuzzyFetch(params));
    },
    dispatchResetState: () => {
      dispatch(searchFuzzyResetState());
    },
  };
};

export default connect(
  SearchFuzzyContainer,
  mapStateToProps,
  mapDispatchToProps
);
