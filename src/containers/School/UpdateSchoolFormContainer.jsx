import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import {
  schoolUpdate,
  schoolFormReset,
} from 'src/redux/actionCreators/school/schoolPost';

import { schoolProfileFetch } from 'src/redux/actionCreators/school/profile';

const payloadDisplayName = 'School';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class UpdateSchoolFormContainer extends React.Component {
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
    formState: state.school.schoolPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolFormReset());
    },
    dispatchActionOnClose: schoolId => {
      dispatch(schoolProfileFetch(schoolId));
    },
  };
};

export default connect(
  UpdateSchoolFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
