import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  kioskAnemicSchoolDetailFetch,
  kioskAnemicSchoolDetailResetState,
} from 'src/redux/actionCreators/kiosk/anemicSchoolDetail';

const payloadDisplayName = 'School';

class KioskAnemicSchoolDetailContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
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
    data: state.kiosk.anemicSchoolDetail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (schoolId: String) => {
      dispatch(kioskAnemicSchoolDetailFetch(schoolId));
    },
    dispatchResetState: () => {
      dispatch(kioskAnemicSchoolDetailResetState());
    },
  };
};

export default connect(
  KioskAnemicSchoolDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
