import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolPosFetch,
  schoolPosResetState,
} from 'src/redux/actionCreators/pos/schoolPos';

const alwaysFetch = false;
const payloadDisplayName = 'POS';

class SchoolPosContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={alwaysFetch}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.pos.schoolPos,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolPosFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolPosResetState());
    },
  };
};

export default connect(
  SchoolPosContainer,
  mapStateToProps,
  mapDispatchToProps
);
