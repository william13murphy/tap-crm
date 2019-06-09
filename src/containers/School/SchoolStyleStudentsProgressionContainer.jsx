import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolStyleStudentsProgressionFetch,
  schoolStyleStudentsProgressionResetState,
} from 'src/redux/actionCreators/school/styleStudentsProgression';

const payloadDisplayName = 'School Students Progression';

class SchoolStyleStudentsProgressionContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    schoolId: any,
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
    data: state.school.styleStudentsProgression,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: params => {
      dispatch(schoolStyleStudentsProgressionFetch(params));
    },
    dispatchResetState: () => {
      dispatch(schoolStyleStudentsProgressionResetState());
    },
  };
};

export default connect(
  SchoolStyleStudentsProgressionContainer,
  mapStateToProps,
  mapDispatchToProps
);
