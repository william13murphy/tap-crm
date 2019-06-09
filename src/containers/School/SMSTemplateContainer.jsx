import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  smsTemplateFetch,
  smsTemplateResetState,
} from 'src/redux/actionCreators/school/smsTemplate';

const payloadDisplayName = 'SMS Template';

class SMSTemplateContainer extends React.Component {
  props: {
    id: string,
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
    data: state.school.smsTemplate,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(smsTemplateFetch(id));
    },
    dispatchResetState: () => {
      dispatch(smsTemplateResetState());
    },
  };
};

export default connect(
  SMSTemplateContainer,
  mapStateToProps,
  mapDispatchToProps
);
