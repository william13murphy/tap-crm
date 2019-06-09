import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolFetch,
  schoolResetState,
} from 'src/redux/actionCreators/student/school';

const payloadDisplayName = 'Student School Details';

class StudentSchoolContainer extends React.Component {
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
    data: state.student.school,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(schoolFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolResetState());
    },
  };
};

export default connect(
  StudentSchoolContainer,
  mapStateToProps,
  mapDispatchToProps
);
