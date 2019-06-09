import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  allSMSTemplatesFetch,
  allSMSTemplatesResetState,
} from 'src/redux/actionCreators/school/allSMSTemplates';

const payloadDisplayName = 'SMS Templates';

class AllSMSTemplatesContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
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
    data: state.school.allSMSTemplates,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(allSMSTemplatesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(allSMSTemplatesResetState());
    },
  };
};

export default connect(
  AllSMSTemplatesContainer,
  mapStateToProps,
  mapDispatchToProps
);
