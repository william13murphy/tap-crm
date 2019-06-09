import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import { schoolContactsFetch } from 'src/redux/actionCreators/school/contacts';
import {
  staffDelete,
  staffDeleteFormReset,
} from 'src/redux/actionCreators/school/staffDelete';

const payloadDisplayName = 'School Staff Delete';

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

class SchoolStaffDeleteContainer extends React.Component {
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
  return { formState: state.school.staffDelete };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(staffDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(staffDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(schoolContactsFetch(id));
    },
  };
};

export default connect(
  SchoolStaffDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
