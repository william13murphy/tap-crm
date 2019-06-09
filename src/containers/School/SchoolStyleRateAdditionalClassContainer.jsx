import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolStyleRateAdditionalClassFetch,
  schoolStyleRateAdditionalClassResetState,
} from 'src/redux/actionCreators/school/styleRateAdditionalClass';

const payloadDisplayName = 'School Rates';

class SchoolStyleRateAdditionalClassContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    dispatchActionOnClose: any,
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
    data: state.school.styleRateAdditionalClass,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolStyleRateAdditionalClassFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolStyleRateAdditionalClassResetState());
    },
  };
};

export default connect(
  SchoolStyleRateAdditionalClassContainer,
  mapStateToProps,
  mapDispatchToProps
);
