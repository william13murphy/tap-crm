import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  letterTemplateFetch,
  letterTemplateResetState,
} from 'src/redux/actionCreators/school/letterTemplate';

const payloadDisplayName = 'Letter Template';

class LetterTemplateContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    dispatchActionOnClose: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.letterTemplate,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(letterTemplateFetch(id));
    },
    dispatchResetState: () => {
      dispatch(letterTemplateResetState());
    },
  };
};

export default connect(
  LetterTemplateContainer,
  mapStateToProps,
  mapDispatchToProps
);
