import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  templatePlaceholdersFetch,
  templatePlaceholdersResetState,
} from 'src/redux/actionCreators/utility/templatePlaceholders';

const payloadDisplayName = 'Placeholders';

class TemplatePlaceholdersContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
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
    data: state.utility.templatePlaceholders,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(templatePlaceholdersFetch());
    },
    dispatchResetState: () => {
      dispatch(templatePlaceholdersResetState());
    },
  };
};

export default connect(
  TemplatePlaceholdersContainer,
  mapStateToProps,
  mapDispatchToProps
);
