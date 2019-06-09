import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolStyleRanksFetch,
  schoolStyleRanksResetState,
} from 'src/redux/actionCreators/school/styleRanks';

const payloadDisplayName = 'Program Ranks';

class SchoolStyleRanksContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.school.styleRanks,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolStyleRanksFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolStyleRanksFetch());
    },
  };
};

export default connect(
  SchoolStyleRanksContainer,
  mapStateToProps,
  mapDispatchToProps
);
