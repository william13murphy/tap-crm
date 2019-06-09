import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  allLetterTemplatesFetch,
  allLetterTemplatesResetState,
} from 'src/redux/actionCreators/school/allLetterTemplates';

const payloadDisplayName = 'Letter Templates';

class AllLetterTemplatesContainer extends React.Component {
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
    data: state.school.allLetterTemplates,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(allLetterTemplatesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(allLetterTemplatesResetState());
    },
  };
};

export default connect(
  AllLetterTemplatesContainer,
  mapStateToProps,
  mapDispatchToProps
);
