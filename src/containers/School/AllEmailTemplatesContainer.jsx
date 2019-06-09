import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  allEmailTemplatesFetch,
  allEmailTemplatesResetState,
} from 'src/redux/actionCreators/school/allEmailTemplates';

const payloadDisplayName = 'Email Templates';

class AllEmailTemplatesContainer extends React.Component {
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
    data: state.school.allEmailTemplates,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(allEmailTemplatesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(allEmailTemplatesResetState());
    },
  };
};

export default connect(
  AllEmailTemplatesContainer,
  mapStateToProps,
  mapDispatchToProps
);
