import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  allSchoolsFetch,
  allSchoolsResetState,
} from 'src/redux/actionCreators/school/allSchools';

const payloadDisplayName = 'Schools';

class AllSchoolsContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={false}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.allSchools,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(allSchoolsFetch());
    },
    dispatchResetState: () => {
      dispatch(allSchoolsResetState());
    },
  };
};

export default connect(
  AllSchoolsContainer,
  mapStateToProps,
  mapDispatchToProps
);
