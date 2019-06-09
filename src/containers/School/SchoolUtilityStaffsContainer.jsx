import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolUtilityStaffsFetch,
  schoolUtilityStaffsResetState,
} from 'src/redux/actionCreators/school/utilityStaffs';

const payloadDisplayName = 'School Staffs';

class SchoolUtilityStaffsContainer extends React.Component {
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
    data: state.school.utilityStaffs,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolUtilityStaffsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolUtilityStaffsResetState());
    },
  };
};

export default connect(
  SchoolUtilityStaffsContainer,
  mapStateToProps,
  mapDispatchToProps
);
