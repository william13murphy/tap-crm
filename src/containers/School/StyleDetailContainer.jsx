import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolStyleDetailFetch,
  schoolStyleDetailResetState,
} from 'src/redux/actionCreators/school/styleDetail';

const payloadDisplayName = 'School Style Detail';

class SchoolStyleDetailContainer extends React.Component {
  props: {
    dispatchFetchParams: string,
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
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.styleDetail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(schoolStyleDetailFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolStyleDetailResetState());
    },
  };
};

export default connect(
  SchoolStyleDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
