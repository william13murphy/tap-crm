import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserLetterTemplateFetch,
  efcUserLetterTemplateResetState,
} from 'src/redux/actionCreators/administration/efcUserLetterTemplate';

const payloadDisplayName = 'EFC User Letter Template';

class EfcUserLetterTemplateContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.administration.efcUserLetterTemplate,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcUserLetterTemplateFetch(id));
    },
    dispatchResetState: () => {
      dispatch(efcUserLetterTemplateResetState());
    },
  };
};

export default connect(
  EfcUserLetterTemplateContainer,
  mapStateToProps,
  mapDispatchToProps
);
