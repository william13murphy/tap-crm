import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolDiscountPost,
  schoolDiscountFormReset,
} from 'src/redux/actionCreators/school/discountPost';

import { schoolDiscountsFetch } from 'src/redux/actionCreators/school/discounts';

const formPostAction = schoolDiscountPost;
const formResetAction = schoolDiscountFormReset;

const payloadDisplayName = 'School Discount';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues: {},
};

class SchoolDiscountFormContainer extends React.Component {
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
    formState: state.school.discountPost,
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
      dispatch(schoolDiscountsFetch(id));
    },
  };
};

export default connect(
  SchoolDiscountFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
