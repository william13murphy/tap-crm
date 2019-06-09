import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  findByNameFetch,
  findByNameResetState,
} from 'src/redux/actionCreators/kiosk/findByName';

const payloadDisplayName = 'kiosk students';

class FindByNameContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
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
    data: state.kiosk.findByName,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (schoolId: String) => {
      dispatch(findByNameFetch(schoolId));
    },
    dispatchResetState: () => {
      dispatch(findByNameResetState());
    },
  };
};

export default connect(
  FindByNameContainer,
  mapStateToProps,
  mapDispatchToProps
);
