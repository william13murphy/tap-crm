import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserLetterTemplatesFetch,
  efcUserLetterTemplatesResetState,
} from 'src/redux/actionCreators/administration/efcUserLetterTemplates';

const payloadDisplayName = 'EFC User Letter Templates';

class EfcUserLetterTemplatesContainer extends React.Component {
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
    data: state.administration.efcUserLetterTemplates,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(efcUserLetterTemplatesFetch());
    },
    dispatchResetState: () => {
      dispatch(efcUserLetterTemplatesResetState());
    },
  };
};

export default connect(
  EfcUserLetterTemplatesContainer,
  mapStateToProps,
  mapDispatchToProps
);
