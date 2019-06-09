import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

/* Start: Edit area for creating FormContainer */

import {
  schoolStyleRatePost,
  schoolStyleRateFormReset,
} from 'src/redux/actionCreators/school/styleRatePost';

import { schoolStyleRatesFetch } from 'src/redux/actionCreators/school/styleRates';

const formPostAction = schoolStyleRatePost;
const formResetAction = schoolStyleRateFormReset;

const payloadDisplayName = 'Style Rate';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any /** No parameters required in  allSchoolsFetch */,
  redirectOnSuccess: string,
};

class StyleRateFormContainer extends React.Component {
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
    formState: state.school.styleRatePost,
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
    dispatchActionOnClose: id => {
      dispatch(schoolStyleRatesFetch(id));
    },
  };
};

export default connect(
  StyleRateFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
