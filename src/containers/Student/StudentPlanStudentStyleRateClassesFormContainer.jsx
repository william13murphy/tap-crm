import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentPlanStudentStyleRateClassesPost,
  studentPlanStudentStyleRateClassesPostFormReset,
} from 'src/redux/actionCreators/student/planStudentStyleRateClassesPost';

import { studentPlanStudentStyleRateClassesManyFetch } from 'src/redux/actionCreators/student/planStudentStyleRateClassesMany';

const payloadDisplayName = 'Student Classes';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
  studentId: string,
};

class StudentPlanStudentStyleRateClassesFormContainer extends React.Component {
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
  return {
    formState: state.student.planStudentStyleRateClassesPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentPlanStudentStyleRateClassesPost(data));
    },
    dispatchFormReset: () => {
      dispatch(studentPlanStudentStyleRateClassesPostFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(studentPlanStudentStyleRateClassesManyFetch(id));
    },
  };
};

export default connect(
  StudentPlanStudentStyleRateClassesFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
