import React from 'react';
import connect from 'src/redux/connect';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';

import { saveStyleRankPromotion } from 'api';
import { studentProgressionsFetch } from 'src/redux/actionCreators/student/progressions';
import { studentProgressionsByStyleFetch } from 'src/redux/actionCreators/student/progressionsByStyle';

const formPostEndpoint = saveStyleRankPromotion;

const payloadDisplayName = 'Promotion';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchActionOnSuccess: any,
  dispatchActionOnSuccessParams: any,
  initialValues?: any,
  update?: boolean,
};

class StudentPromotionStatefulFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericStatefulFormContainer
        payloadDisplayName={payloadDisplayName}
        formPostEndpoint={formPostEndpoint}
        {...this.props}
      >
        {this.props.children}
      </GenericStatefulFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.student.stylerankPromotion,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchActionOnSuccess: closeParams => {
      dispatch(studentProgressionsFetch(closeParams.studentId));
      dispatch(studentProgressionsByStyleFetch(closeParams));
    },
  };
};

export default connect(
  StudentPromotionStatefulFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
