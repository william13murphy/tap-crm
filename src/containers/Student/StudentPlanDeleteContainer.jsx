import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import { studentPlansFetch } from 'src/redux/actionCreators/student/plans';
import {
  planDelete,
  planDeleteFormReset,
} from 'src/redux/actionCreators/student/planDelete';

const payloadDisplayName = 'Plan Delete';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class StudentPlanDeleteContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return { formState: state.student.planDelete };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(planDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(planDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(studentPlansFetch(id));
    },
  };
};

export default connect(
  StudentPlanDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
