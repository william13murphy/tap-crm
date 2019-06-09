import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolBankPost,
  schoolBankFormReset,
} from 'src/redux/actionCreators/school/bankPost';

import { schoolBankFetch } from 'src/redux/actionCreators/school/bank';

const formPostAction = schoolBankPost;
const formResetAction = schoolBankFormReset;

const payloadDisplayName = 'School Bank';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class SchoolBankFormContainer extends React.Component {
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
    formState: state.school.bankPost,
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
      dispatch(schoolBankFetch(schoolId));
    },
  };
};

export default connect(
  SchoolBankFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
