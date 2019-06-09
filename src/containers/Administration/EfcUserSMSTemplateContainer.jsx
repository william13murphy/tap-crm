import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserSMSTemplateFetch,
  efcUserSMSTemplateResetState,
} from 'src/redux/actionCreators/administration/efcUserSMSTemplate';

const payloadDisplayName = 'EFC User SMS Template';

class EfcUserSMSTemplateContainer extends React.Component {
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
    data: state.administration.efcUserSMSTemplate,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcUserSMSTemplateFetch(id));
    },
    dispatchResetState: () => {
      dispatch(efcUserSMSTemplateResetState());
    },
  };
};

export default connect(
  EfcUserSMSTemplateContainer,
  mapStateToProps,
  mapDispatchToProps
);
