import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolDiscountsFetch,
  schoolDiscountsResetState,
} from 'src/redux/actionCreators/school/discounts';

const payloadDisplayName = 'School Discounts';

class SchoolDiscountsContainer extends React.Component {
  props: {
    id: string,
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
    data: state.school.discounts,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolDiscountsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolDiscountsResetState());
    },
  };
};

export default connect(
  SchoolDiscountsContainer,
  mapStateToProps,
  mapDispatchToProps
);
