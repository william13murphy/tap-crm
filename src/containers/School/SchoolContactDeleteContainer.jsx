import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolContactDelete,
  schoolContactDeleteFormReset,
} from 'src/redux/actionCreators/school/contactDelete';

import { schoolContactsFetch } from 'src/redux/actionCreators/school/contacts';

const payloadDisplayName = 'School Contact Delete';

type SchoolContactDeleteContainerProps = {
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

class SchoolContactDeleteContainer extends React.Component {
  props: SchoolContactDeleteContainerProps;
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
    formState: state.school.contactDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolContactDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolContactDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(schoolContactsFetch(id));
    },
  };
};

export default connect(
  SchoolContactDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
