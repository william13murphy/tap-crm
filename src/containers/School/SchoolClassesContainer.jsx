import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolClassesFetch,
  schoolClassesResetState,
} from 'src/redux/actionCreators/school/classes';

const payloadDisplayName = 'Classes';

class SchoolClassesContainer extends React.Component {
  props: {
    dispatchFetchParams: string,
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
    data: state.school.classes,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(schoolClassesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolClassesResetState());
    },
  };
};

export default connect(
  SchoolClassesContainer,
  mapStateToProps,
  mapDispatchToProps
);
