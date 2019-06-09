import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  validatePasswordRequestFetch,
  validatePasswordRequestResetState,
} from 'src/redux/actionCreators/utility/validatePasswordRequest';

const payloadDisplayName = 'Invalid Password Request';

class ValidatePasswordRequestContainer extends React.Component {
  props: {
    id: string, // required id prop
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        data={this.props.data}
        dispatchFetch={this.props.dispatchFetch}
        dispatchFetchParams={this.props.id}
        options={this.props.options || {}}
      >
        {this.props.children}
      </GenericFetchContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.utility.validatePasswordRequest,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(validatePasswordRequestFetch(id));
    },
    dispatchResetState: () => {
      dispatch(validatePasswordRequestResetState());
    },
  };
};

export default connect(
  ValidatePasswordRequestContainer,
  mapStateToProps,
  mapDispatchToProps
);
