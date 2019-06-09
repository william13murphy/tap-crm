import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from './GenericFetchContainer';
import { referencesFetch } from 'src/redux/actionCreators/references';

const payloadDisplayName = 'References';

class ReferencesContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={false}
        payloadDisplayName={payloadDisplayName}
        data={this.props.data}
        dispatchFetch={this.props.dispatchFetch}
        options={this.props.options || {}}
      >
        {this.props.children}
      </GenericFetchContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.utility.references,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(referencesFetch());
    },
  };
};

export default connect(
  ReferencesContainer,
  mapStateToProps,
  mapDispatchToProps
);
