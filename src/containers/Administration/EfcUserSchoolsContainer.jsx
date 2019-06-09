import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserSchoolsFetch,
  efcUserSchoolsResetState,
} from 'src/redux/actionCreators/administration/efcUserSchools';

const payloadDisplayName = 'EFC User Schools';

class EfcUserSchoolsContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.administration.efcUserSchools,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcUserSchoolsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(efcUserSchoolsResetState());
    },
  };
};

export default connect(
  EfcUserSchoolsContainer,
  mapStateToProps,
  mapDispatchToProps
);
