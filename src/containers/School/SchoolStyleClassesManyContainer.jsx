import React from 'react';
import connect from 'src/redux/connect';
import GenericManyFetchContainer from '../GenericManyFetchContainer';
import {
  schoolStyleClassesManyFetch,
  schoolStyleClassesManyResetState,
} from 'src/redux/actionCreators/school/styleClassesMany';

const payloadDisplayName = 'Program Classes';

class SchoolStyleClassesManyContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string, // schoolStyleId
    dispatchActionOnClose: any,
    options?: {},
  };
  render() {
    return (
      <GenericManyFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.styleClassesMany,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: schoolStyleId => {
      dispatch(schoolStyleClassesManyFetch(schoolStyleId));
    },
    dispatchResetState: () => {
      dispatch(schoolStyleClassesManyResetState());
    },
  };
};

export default connect(
  SchoolStyleClassesManyContainer,
  mapStateToProps,
  mapDispatchToProps
);
