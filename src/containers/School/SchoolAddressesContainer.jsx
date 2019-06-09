import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolAddressesFetch,
  schoolAddressesResetState,
} from 'src/redux/actionCreators/school/addresses';

const payloadDisplayName = 'School Addresses';

class SchoolAddressesContainer extends React.Component {
  props: {
    id: string,
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
    data: state.school.addresses,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolAddressesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolAddressesResetState());
    },
  };
};

export default connect(
  SchoolAddressesContainer,
  mapStateToProps,
  mapDispatchToProps
);
