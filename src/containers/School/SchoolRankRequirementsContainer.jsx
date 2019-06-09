import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolRankRequirementsFetch,
  schoolRankRequirementsResetState,
} from 'src/redux/actionCreators/school/rankRequirements';

const payloadDisplayName = 'School Rank Requirements';

class SchoolRankRequirementsContainer extends React.Component {
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
    data: state.school.rankRequirements,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolRankRequirementsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolRankRequirementsResetState());
    },
  };
};

export default connect(
  SchoolRankRequirementsContainer,
  mapStateToProps,
  mapDispatchToProps
);
