import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import { ownerFetch } from 'src/redux/actionCreators/student/owner';

const payloadDisplayName = 'Plan Account Owner';

class StudentPlanOwnerContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
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
    data: state.student.owner,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(ownerFetch(id));
    },
  };
};

export default connect(
  StudentPlanOwnerContainer,
  mapStateToProps,
  mapDispatchToProps
);
