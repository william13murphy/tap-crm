import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  schoolBirthdayFetch,
  schoolBirthdayResetState,
} from 'src/redux/actionCreators/report/schoolBirthday';

const alwaysFetch = false;

const payloadDisplayName = 'Birthday Report';

class SchoolBirthdayContainer extends React.Component {
  props: {
    id: string,
    dispatchFetchParams: {
      schoolId: string,
    },
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={alwaysFetch}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.report.schoolBirthday,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolBirthdayFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolBirthdayResetState());
    },
  };
};
export default connect(
  SchoolBirthdayContainer,
  mapStateToProps,
  mapDispatchToProps
);
