import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentPlansFetch,
  studentPlansResetState,
} from 'src/redux/actionCreators/student/plans';

const payloadDisplayName = 'Student Plans';

class StudentPlansContainer extends React.Component {
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
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.student.plans,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentPlansFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentPlansResetState());
    },
  };
};

export default connect(
  StudentPlansContainer,
  mapStateToProps,
  mapDispatchToProps
);
