import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolProfileFetch,
  schoolProfileResetState,
} from 'src/redux/actionCreators/school/profile';

const payloadDisplayName = 'School Profile';

class SchoolProfileContainer extends React.Component {
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
    data: state.school.profile,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolProfileFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolProfileResetState());
    },
  };
};

export default connect(
  SchoolProfileContainer,
  mapStateToProps,
  mapDispatchToProps
);
