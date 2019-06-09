import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentStyleRankFetch,
  studentStyleRankResetState,
} from 'src/redux/actionCreators/student/styleRank';

const payloadDisplayName = 'Student Progressions';

class StudentStyleRankContainer extends React.Component {
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
    data: state.student.styleRank,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentStyleRankFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentStyleRankResetState());
    },
  };
};

export default connect(
  StudentStyleRankContainer,
  mapStateToProps,
  mapDispatchToProps
);
