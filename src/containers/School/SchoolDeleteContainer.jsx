import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import { allSchoolsFetch } from 'src/redux/actionCreators/school/allSchools';
import {
  schoolDelete,
  schoolDeleteFormReset,
} from 'src/redux/actionCreators/school/schoolDelete';

const payloadDisplayName = 'School Delete';

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

class SchoolDeleteContainer extends React.Component {
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
  return { formState: state.school.schoolDelete };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolDeleteFormReset());
    },
    dispatchActionOnClose: () => {
      dispatch(allSchoolsFetch());
    },
  };
};

export default connect(
  SchoolDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
