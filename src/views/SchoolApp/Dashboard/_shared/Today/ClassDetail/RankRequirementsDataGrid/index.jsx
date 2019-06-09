import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import moment from 'moment';
import connect from 'src/redux/connect';

import { roles } from 'util/auth/roles';
import PrivateComponent from 'components/Auth/PrivateComponent';
import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import StudentRankRequirementTableFormContainer from 'containers/Student/StudentRankRequirementTableFormContainer';
import SingleButtonForm from 'components/Forms/SingleButtonForm';
import { studentRankRequirementsByStyleFetch } from 'src/redux/actionCreators/student/rankRequirementsByStyle';

type RankRequirementsGridProps = {
  UserId: string,
  studentId: string,
  schoolStyleId: string,
  styleRankId: string,
  data: Array<{}>,
  dispatchFormPost: string,
  classId: string,
  classScheduleId: string,
  dispatchStudentRankRequirementsByStyleFetch: any,
};

class RankAchieveForm extends React.Component {
  props: RankRequirementsGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Skill',
          accessor: 'Field',
        },
        {
          Header: 'Date Achieved',
          accessor: 'Attained',
          Cell: row => (
            <div>
              {row.original.Attained != 0 ? (
                <span className="date">
                  {row.value && moment(row.value).format('YYYY-MM-DD')}
                </span>
              ) : null}
            </div>
          ),
        },
        {
          Header: 'Actions',
          accessor: 'Actions',
          Cell: row => {
            return (
              <PrivateComponent allow={roles.LEVEL_INSTRUCT}>
                <div className="Action__cell">
                  {row.original.Attained != 0 ? null : (
                    <StudentRankRequirementTableFormContainer
                      dispatchActionOnClose={
                        props.dispatchStudentRankRequirementsByStyleFetch
                      }
                      dispatchActionOnSuccessParams={{
                        StudentId: row.original.StudentId,
                        SchoolStyleId: row.original.SchoolStyleId,
                        StyleRankId: row.original.StyleRankId,
                      }}
                    >
                      <SingleButtonForm
                        title="Achieve"
                        formData={{
                          StudentId: row.original.StudentId,
                          SchoolStyleId: row.original.SchoolStyleId,
                          SchoolRankRequirementId:
                            row.original.SchoolRankRequirementId,
                          StyleRankId: row.original.StyleRankId,
                          CreatedBy: props.UserId,
                          CreatedOn: moment
                            .utc()
                            .startOf('day')
                            .format(),
                        }}
                      />
                    </StudentRankRequirementTableFormContainer>
                  )}
                </div>
              </PrivateComponent>
            );
          },
        },
      ],
    };
  }

  render() {
    if (this.props.data.payload && this.props.data.payload.length === 0) {
      return (
        <div className="RankRequirementsGrid">
          <h4>No Rank RankRequirements Found</h4>
        </div>
      );
    }

    return (
      <DefaultReactTable
        pageSize={this.props.data.length}
        className="linked-row"
        data={this.props.data}
        columns={this.state.columns}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    UserId: state.token.payload.UserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchStudentRankRequirementsByStyleFetch: data => {
      dispatch(studentRankRequirementsByStyleFetch(data));
    },
  };
};
export default connect(
  RankAchieveForm,
  mapStateToProps,
  mapDispatchToProps
);
