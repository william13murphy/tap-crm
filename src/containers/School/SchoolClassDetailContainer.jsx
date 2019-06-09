import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolClassDetailFetch,
  schoolClassDetailResetState,
} from 'src/redux/actionCreators/school/classDetail';

const payloadDisplayName = 'Class Detail';

class SchoolClassDetailContainer extends React.Component {
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
    data: state.school.classDetail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(schoolClassDetailFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolClassDetailResetState());
    },
  };
};

export default connect(
  SchoolClassDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
