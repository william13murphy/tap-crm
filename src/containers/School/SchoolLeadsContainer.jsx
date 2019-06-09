import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolLeadsFetch,
  schoolLeadsResetState,
} from 'src/redux/actionCreators/school/leads';

const payloadDisplayName = 'School Leads';

class SchoolLeadsContainer extends React.Component {
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
    data: state.school.leads,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolLeadsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolLeadsResetState());
    },
  };
};

export default connect(
  SchoolLeadsContainer,
  mapStateToProps,
  mapDispatchToProps
);
