import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserEmailTemplatesFetch,
  efcUserEmailTemplatesResetState,
} from 'src/redux/actionCreators/administration/efcUserEmailTemplates';

const payloadDisplayName = 'EFC User Email Templates';

class EfcUserEmailTemplatesContainer extends React.Component {
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
    data: state.administration.efcUserEmailTemplates,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(efcUserEmailTemplatesFetch());
    },
    dispatchResetState: () => {
      dispatch(efcUserEmailTemplatesResetState());
    },
  };
};

export default connect(
  EfcUserEmailTemplatesContainer,
  mapStateToProps,
  mapDispatchToProps
);
