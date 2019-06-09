import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolStyleRateAdditionalClassesFetch,
  schoolStyleRateAdditionalClassesManyResetState,
} from 'src/redux/actionCreators/school/styleRateAdditionalClassesMany';

const payloadDisplayName = 'School Additional Class Rates';

class SchoolStyleRateAdditionalClassesManyContainer extends React.Component {
  props: {
    params: {
      styleRateId: string,
      schoolId: string,
    },
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
    data: state.school.styleRateAdditionalClassesMany,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (params: string) => {
      dispatch(schoolStyleRateAdditionalClassesFetch(params));
    },
    dispatchResetState: () => {
      dispatch(schoolStyleRateAdditionalClassesManyResetState());
    },
  };
};

export default connect(
  SchoolStyleRateAdditionalClassesManyContainer,
  mapStateToProps,
  mapDispatchToProps
);
