import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentContactsFetch,
  studentContactsResetState,
} from 'src/redux/actionCreators/student/contacts';

const payloadDisplayName = 'Student Contacts';

class StudentContactsContainer extends React.Component {
  props: {
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
    data: state.student.contacts,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentContactsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentContactsResetState());
    },
  };
};

export default connect(
  StudentContactsContainer,
  mapStateToProps,
  mapDispatchToProps
);
