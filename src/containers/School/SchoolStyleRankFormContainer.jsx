import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolStyleRankPost,
  schoolStyleRankFormReset,
} from 'src/redux/actionCreators/school/styleRankPost';

import { schoolStyleRanksFetch } from 'src/redux/actionCreators/school/styleRanks';

const formPostAction = schoolStyleRankPost;
const formResetAction = schoolStyleRankFormReset;

const payloadDisplayName = 'Program Rank';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class SchoolStyleRankFormContainer extends React.Component {
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
    formState: state.school.styleRankPost,
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
    dispatchActionOnClose: styleId => {
      dispatch(schoolStyleRanksFetch(styleId));
    },
  };
};

export default connect(
  SchoolStyleRankFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
