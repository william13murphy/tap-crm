import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserSMSTemplatesFetch,
  efcUserSMSTemplatesResetState,
} from 'src/redux/actionCreators/administration/efcUserSMSTemplates';

const payloadDisplayName = 'EFC User SMS Templates';

class EfcUserSMSTemplatesContainer extends React.Component {
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
    data: state.administration.efcUserSMSTemplates,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(efcUserSMSTemplatesFetch());
    },
    dispatchResetState: () => {
      dispatch(efcUserSMSTemplatesResetState());
    },
  };
};

export default connect(
  EfcUserSMSTemplatesContainer,
  mapStateToProps,
  mapDispatchToProps
);
