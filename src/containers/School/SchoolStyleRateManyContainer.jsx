import React from 'react';
import connect from 'src/redux/connect';
import GenericManyFetchContainer from '../GenericManyFetchContainer';
import { schoolStyleRateManyFetch } from 'src/redux/actionCreators/school/styleRateMany';

const payloadDisplayName = 'School Style Rates';

class SchoolStyleRateManyContainer extends React.Component {
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
    data: state.school.styleRateMany,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: styleRateId => {
      dispatch(schoolStyleRateManyFetch(styleRateId));
    },
  };
};

export default connect(
  SchoolStyleRateManyContainer,
  mapStateToProps,
  mapDispatchToProps
);
