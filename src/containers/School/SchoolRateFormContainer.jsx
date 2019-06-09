import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolRatePost,
  schoolRateFormReset,
} from 'src/redux/actionCreators/school/ratePost';

import { schoolRatesFetch } from 'src/redux/actionCreators/school/rates';

const formPostAction = schoolRatePost;
const formResetAction = schoolRateFormReset;

const payloadDisplayName = 'School Rate';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: any,
};

class SchoolRateFormContainer extends React.Component {
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
    formState: state.school.ratePost,
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
      dispatch(schoolRatesFetch(schoolId));
    },
  };
};

export default connect(
  SchoolRateFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
