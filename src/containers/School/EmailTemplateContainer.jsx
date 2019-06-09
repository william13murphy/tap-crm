import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  emailTemplateFetch,
  emailTemplateResetState,
} from 'src/redux/actionCreators/school/emailTemplate';

const payloadDisplayName = 'Email Template';

class EmailTemplateContainer extends React.Component {
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
    data: state.school.emailTemplate,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(emailTemplateFetch(id));
    },
    dispatchResetState: () => {
      dispatch(emailTemplateResetState());
    },
  };
};

export default connect(
  EmailTemplateContainer,
  mapStateToProps,
  mapDispatchToProps
);
