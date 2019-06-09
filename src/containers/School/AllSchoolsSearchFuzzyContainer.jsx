import React from 'react';
import connect from 'src/redux/connect';
import GenericReportFormContainer from 'containers/GenericReportFormContainer';
import {
  allSearchFuzzyPost,
  allSearchFuzzyReset,
} from 'src/redux/actionCreators/school/allSearchFuzzy';

const payloadDisplayName = 'Search All';

type AllSchoolsSearchFuzzyContainerProps = {
  children: any,
  data: Array<{}> | {} | null,
  dispatchFetch: any,
  dispatchFetchParams: string,
  dispatchActionOnClose: any,
  options?: {},
};

class AllSchoolsSearchFuzzyContainer extends React.Component {
  props: AllSchoolsSearchFuzzyContainerProps;
  render() {
    return (
      <GenericReportFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.school.allSearchFuzzy,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(allSearchFuzzyPost(data));
    },
    dispatchFormReset: () => {
      dispatch(allSearchFuzzyReset());
    },
  };
};

export default connect(
  AllSchoolsSearchFuzzyContainer,
  mapStateToProps,
  mapDispatchToProps
);
