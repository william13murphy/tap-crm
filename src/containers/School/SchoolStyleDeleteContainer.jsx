import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import { schoolStylesFetch } from 'src/redux/actionCreators/school/styles';
import {
  styleDelete,
  styleDeleteFormReset,
} from 'src/redux/actionCreators/school/styleDelete';

const payloadDisplayName = 'School Program Delete';

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

class SchoolStyleDeleteContainer extends React.Component {
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
  return { formState: state.school.styleDelete };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(styleDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(styleDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(schoolStylesFetch(id));
    },
  };
};

export default connect(
  SchoolStyleDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
