import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import NoDataMessage from 'components/DataLoading/NoDataMessage';
import './styles.less';

type StudentsBirthdayBySchoolByDaysGridProps = {
  styleRateAdditionalClassesMany: [{}],
  styleRateId: string,
  match: {
    params: {
      schoolId: string,
      styleId: string,
    },
  },
  studentsBirthday: [],
  history: {
    push: any,
  },
  appContext: {
    schoolId: string,
  },
};

class StudentsBirthdayBySchoolByDaysGrid extends React.Component {
  props: StudentsBirthdayBySchoolByDaysGridProps;
  // Select this student's classes from redux, by their id
  constructor() {
    super();
    this.state = {
      data: [],
      columns: [
        {
          Header: 'First Name',
          accessor: 'FirstName',
          Cell: rowInfo => <span className="">{rowInfo.value}</span>,
        },
        {
          Header: 'Last Name',
          accessor: 'LastName',
          Cell: rowInfo => <span className="">{rowInfo.value}</span>,
        },
        {
          Header: 'Date Of Birth',
          accessor: 'Dob',
          Cell: rowInfo => (
            <span className="date">
              {moment(rowInfo.value).format('MMMM D, YYYY')}
            </span>
          ),
        },
        {
          Header: 'Email',
          accessor: 'Email',
          Cell: rowInfo => <span className="">{rowInfo.value}</span>,
        },
        {
          Header: 'Phone',
          accessor: 'PhoneNumber',
          Cell: rowInfo => <span className="">{rowInfo.value}</span>,
        },
      ],
    };
  }
  render() {
    if (
      this.props.studentsBirthday &&
      this.props.studentsBirthday.payload &&
      this.props.studentsBirthday.payload.length == 0
    ) {
      return <NoDataMessage errorMessage="No Upcoming Birthdays Found" />;
    }
    return (
      <div className="AdditionalClassRatesDisplay">
        <DefaultReactTable
          className="MarketingGrid linked-row has-action"
          data={this.props.studentsBirthday.payload}
          columns={this.state.columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push(
                `/app/school-app/${
                  this.props.appContext.schoolId
                }/students/detail/${rowInfo.original.StudentId}`
              );
            },
          })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    studentsBirthday: state.report.studentsBirthday,
    appContext: state.appContext,
  };
}

export default connect(
  StudentsBirthdayBySchoolByDaysGrid,
  mapStateToProps
);
