import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentListDetailFetch,
  studentListDetailResetState,
} from 'src/redux/actionCreators/school/studentListDetail';

const payloadDisplayName = 'School Detail';

class SchoolStudentListDetailContainer extends React.Component {
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
    data: state.school.studentListDetail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentListDetailFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentListDetailResetState());
    },
  };
};

export default connect(
  SchoolStudentListDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
