import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolBankFetch,
  schoolBankResetState,
} from 'src/redux/actionCreators/school/bank';

const payloadDisplayName = 'School Bank';

class SchoolBankContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.school.bank,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolBankFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolBankResetState());
    },
  };
};

export default connect(
  SchoolBankContainer,
  mapStateToProps,
  mapDispatchToProps
);
