import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import {
  schoolLeadPost,
  schoolLeadPostFormReset,
} from 'src/redux/actionCreators/school/leadPost';
import { searchFuzzyFetch } from 'src/redux/actionCreators/school/searchFuzzy';
import { schoolLeadsFetch } from 'src/redux/actionCreators/school/leads';

const payloadDisplayName = 'School Lead';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: string,
  redirectOnSuccess: any,
  update?: boolean,
  initialValues?: any,
};

class SchoolLeadFormContainer extends React.Component {
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
    formState: state.school.leadPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolLeadPost(data));
    },
    dispatchActionOnClose: data => {
      dispatch(schoolLeadsFetch(data.SchoolId));
      dispatch(searchFuzzyFetch(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolLeadPostFormReset());
    },
  };
};

export default connect(
  SchoolLeadFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
