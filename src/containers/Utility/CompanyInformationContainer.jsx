import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  companyInformationFetch,
  companyInformationResetState,
} from 'src/redux/actionCreators/utility/companyInformation';

const payloadDisplayName = 'Company Info';

class CompanyInformationContainer extends React.Component {
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
    data: state.utility.companyInformation,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(companyInformationFetch());
    },
    dispatchResetState: () => {
      dispatch(companyInformationResetState());
    },
  };
};

export default connect(
  CompanyInformationContainer,
  mapStateToProps,
  mapDispatchToProps
);
