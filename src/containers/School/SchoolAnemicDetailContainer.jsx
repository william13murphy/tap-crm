import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolAnemicDetailFetch,
  schoolAnemicDetailResetState,
} from 'src/redux/actionCreators/school/anemicDetail';

const payloadDisplayName = 'School Detail';

class SchoolAnemicDetailContainer extends React.Component {
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
    data: state.school.anemicDetail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(schoolAnemicDetailFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolAnemicDetailResetState());
    },
  };
};

export default connect(
  SchoolAnemicDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
