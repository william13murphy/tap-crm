import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolStyleClassesFetch,
  schoolStyleClassesResetState,
} from 'src/redux/actionCreators/school/styleClasses';

const payloadDisplayName = 'Program Classes';

class SchoolStyleClassesContainer extends React.Component {
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
    data: state.school.styleClasses,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolStyleClassesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolStyleClassesResetState());
    },
  };
};

export default connect(
  SchoolStyleClassesContainer,
  mapStateToProps,
  mapDispatchToProps
);
