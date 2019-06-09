import React from 'react';
import connect from 'src/redux/connect';
import SelectMockInput from 'components/Forms/SelectMockInput';
import EFCStudentUnpaidContainer from 'containers/Report/EFCStudentUnpaidContainer';
import EFCStudentUnpaidByUserIdContainer from 'containers/Report/EFCStudentUnpaidByUserIdContainer';
import StudentsUnpaidGrid from '../StudentsUnpaidGrid';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

class AdminUnpaids extends React.Component {
  state = { user: null };
  handleSelectChange = e => {
    if (e) {
      this.setState({ user: e.value });
    }
  };
  render() {
    let selectOptions = this.props.efcUsers.payload.map((user, i) => {
      return { label: user.FullName, value: user.Id };
    });
    selectOptions.unshift({ label: 'Show All Unpaids', value: null });
    return (
      <div className="AdminUnpaids">
        <SelectMockInput
          className="AdminUnpaids__SelectInput"
          options={selectOptions}
          value={this.state.user}
          onChange={this.handleSelectChange}
          placeholder={'Filter Unpaids by Staff'}
        />
        {this.state.user && this.state.user != null ? (
          <EFCStudentUnpaidByUserIdContainer
            dispatchFetchParams={this.state.user}
          >
            {this.props.efcStudentUnpaidByUserId.payload &&
            this.props.efcStudentUnpaidByUserId.payload.length > 0 ? (
              <StudentsUnpaidGrid
                data={this.props.efcStudentUnpaidByUserId.payload}
              />
            ) : (
              <NoDataMessage errorMessage="No Students with Unpaid Reports Found" />
            )}
          </EFCStudentUnpaidByUserIdContainer>
        ) : (
          <EFCStudentUnpaidContainer>
            {this.props.efcStudentUnpaid.payload &&
            this.props.efcStudentUnpaid.payload.length > 0 ? (
              <StudentsUnpaidGrid data={this.props.efcStudentUnpaid.payload} />
            ) : (
              <div>No Students Found</div>
            )}
          </EFCStudentUnpaidContainer>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    efcUsers: state.administration.efcUsers,
    efcStudentUnpaid: state.report.efcStudentUnpaid,
    efcStudentUnpaidByUserId: state.report.efcStudentUnpaidByUserId,
  };
};

export default connect(
  AdminUnpaids,
  mapStateToProps
);
