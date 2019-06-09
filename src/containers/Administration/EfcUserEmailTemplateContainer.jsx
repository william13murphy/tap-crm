import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserEmailTemplateFetch,
  efcUserEmailTemplateResetState,
} from 'src/redux/actionCreators/administration/efcUserEmailTemplate';

const payloadDisplayName = 'EFC User Email Template';

class EfcUserEmailTemplateContainer extends React.Component {
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
    data: state.administration.efcUserEmailTemplate,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcUserEmailTemplateFetch(id));
    },
    dispatchReset: () => {
      dispatch(efcUserEmailTemplateReset());
    },
  };
};

export default connect(
  EfcUserEmailTemplateContainer,
  mapStateToProps,
  mapDispatchToProps
);
