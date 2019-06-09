import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentContactDetailFetch,
  studentContactDetailResetState,
} from 'src/redux/actionCreators/student/contactDetail';

const payloadDisplayName = 'Student Contact Detail';

class StudentContactDetailContainer extends React.Component {
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
    data: state.student.contactDetail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentContactDetailFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentContactDetailResetState());
    },
  };
};

export default connect(
  StudentContactDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
