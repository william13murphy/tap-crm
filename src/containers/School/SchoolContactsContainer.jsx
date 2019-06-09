import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolContactsFetch,
  schoolContactsResetState,
} from 'src/redux/actionCreators/school/contacts';

const payloadDisplayName = 'School Contacts';

class SchoolContactsContainer extends React.Component {
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
    data: state.school.contacts,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolContactsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolContactsResetState());
    },
  };
};

export default connect(
  SchoolContactsContainer,
  mapStateToProps,
  mapDispatchToProps
);
