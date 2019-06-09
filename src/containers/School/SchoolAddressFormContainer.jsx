import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolAddressPost,
  schoolAddressFormReset,
} from 'src/redux/actionCreators/school/addressPost';

import { schoolAddressesFetch } from 'src/redux/actionCreators/school/addresses';

const formPostAction = schoolAddressPost;
const formResetAction = schoolAddressFormReset;

const payloadDisplayName = 'School Address';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class SchoolAddressFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.school.addressPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(formPostAction(data));
    },
    dispatchFormReset: () => {
      dispatch(formResetAction());
    },
    dispatchActionOnClose: schoolId => {
      dispatch(schoolAddressesFetch(schoolId));
    },
  };
};

export default connect(
  SchoolAddressFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
