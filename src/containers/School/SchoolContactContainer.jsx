import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolContactFetch,
  schoolContactResetState,
} from 'src/redux/actionCreators/school/contact';

const payloadDisplayName = 'School Contact';

class SchoolContactContainer extends React.Component {
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
    data: state.school.contact,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolContactFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolContactResetState());
    },
  };
};

export default connect(
  SchoolContactContainer,
  mapStateToProps,
  mapDispatchToProps
);
