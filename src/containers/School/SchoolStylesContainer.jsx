import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolStylesFetch,
  schoolStylesResetState,
} from 'src/redux/actionCreators/school/styles';

const payloadDisplayName = 'School Styles';

class SchoolStylesContainer extends React.Component {
  props: {
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
    data: state.school.styles,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolStylesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolStylesResetState());
    },
  };
};

export default connect(
  SchoolStylesContainer,
  mapStateToProps,
  mapDispatchToProps
);
