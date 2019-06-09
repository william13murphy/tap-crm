import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolMarketingPost,
  schoolMarketingPostFormReset,
} from 'src/redux/actionCreators/school/marketingPost';

import { schoolMarketingsFetch } from 'src/redux/actionCreators/school/marketings';

const formPostAction = schoolMarketingPost;
const formResetAction = schoolMarketingPostFormReset;

const payloadDisplayName = 'School Marketing';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: string,
  redirectOnSuccess: any,
  initialValues?: any,
};

class SchoolMarketingFormContainer extends React.Component {
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
    formState: state.school.marketingPost,
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
    dispatchActionOnClose: data => {
      dispatch(schoolMarketingsFetch(data));
    },
  };
};

export default connect(
  SchoolMarketingFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
