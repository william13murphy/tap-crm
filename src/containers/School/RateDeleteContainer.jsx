import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolRateDelete,
  schoolRateDeleteFormReset,
} from 'src/redux/actionCreators/school/rateDelete';

import { schoolRatesFetch } from 'src/redux/actionCreators/school/rates';

const payloadDisplayName = 'School Rate Delete';

type RateDeleteContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class RateDeleteContainer extends React.Component {
  props: RateDeleteContainerProps;
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
    formState: state.school.rateDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolRateDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolRateDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(schoolRatesFetch(id));
    },
  };
};

export default connect(
  RateDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
