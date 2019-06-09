import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  importProgramPost,
  importProgramFormReset,
} from 'src/redux/actionCreators/school/importProgramPost';

import { schoolStylesFetch } from 'src/redux/actionCreators/school/styles';

const formPostAction = importProgramPost;
const formResetAction = importProgramFormReset;

const payloadDisplayName = 'School Programs';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class ImportSchoolProgramsFormContainer extends React.Component {
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
    formState: state.school.importProgramPost,
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
      dispatch(schoolStylesFetch(schoolId));
    },
  };
};

export default connect(
  ImportSchoolProgramsFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
