import React from 'react';
import connect from 'src/redux/connect';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { appContextSetSchoolId } from 'src/redux/actionCreators/appContext';
import NoDataMessage from 'components/DataLoading/NoDataMessage';
import './styles.less';

type StudentsDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  studentData: any,
  dispatchAppContextSetSchoolId: Function,
};

class StudentsDataGrid extends React.PureComponent {
  props: StudentsDataGridProps;

  render() {
    const columns = [
      {
        Header: 'First Name',
        accessor: 'FirstName',
      },
      {
        Header: 'Last Name',
        accessor: 'LastName',
      },
      {
        Header: 'Email',
        accessor: 'Email',
        Cell: row => (
          <div>
            <span className="SendEmail__cell" title="Send an Email">
              {row.value}
            </span>
          </div>
        ),
      },
      {
        Header: 'Phone',
        accessor: 'Phone',
        Cell: row => (
          <div>
            <span className="SendSMS__cell" title="Send a SMS">
              {row.value}
            </span>
          </div>
        ),
      },
      {
        Header: 'Type',
        accessor: 'Type',
      },
    ];

    if (!this.props.data) {
      return null;
    } else if (this.props.data.length == 0) {
      return <div>No Records Found</div>;
    } else {
      return (
        <DynamicHeightReactTable
          className="StudentsDataGrid__container linked-row"
          data={this.props.data}
          columns={columns}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              if (
                rowInfo.original.StudentId !== null &&
                column.Header === 'Email'
              ) {
                this.props.history.push({
                  pathname: `/app/students/${
                    rowInfo.original.StudentId
                  }/send-email`,

                  state: {
                    studentId: rowInfo.original.StudentId,
                    schoolId: rowInfo.original.SchoolId,
                    firstName: rowInfo.original.FirstName,
                    lastName: rowInfo.original.LastName,
                    prevPath: location.pathname,
                  },
                });
              } else if (
                rowInfo.original.StudentId !== null &&
                column.Header === 'Phone'
              ) {
                this.props.history.push({
                  pathname: `/app/students/${
                    rowInfo.original.StudentId
                  }/send-sms`,

                  state: {
                    studentId: rowInfo.original.StudentId,
                    schoolId: rowInfo.original.SchoolId,
                    firstName: rowInfo.original.FirstName,
                    prevPath: location.pathname,
                  },
                });
              } else {
                this.props.dispatchAppContextSetSchoolId(
                  rowInfo.original.SchoolId
                );
                if (rowInfo.original.Type === 'CONTACT') {
                  this.props.history.push(
                    `/app/school-app/${
                      rowInfo.original.SchoolId
                    }/students/student-contact/${rowInfo.original.ContactId}`
                  );
                } else if (rowInfo.original.Type === 'LEAD') {
                  this.props.history.push(
                    `/app/school-app/${
                      rowInfo.original.SchoolId
                    }/students/leads/${rowInfo.original.SchoolLeadId}/edit`
                  );
                } else if (rowInfo.original.Type === 'STUDENT') {
                  this.props.history.push(
                    `/app/school-app/${
                      rowInfo.original.SchoolId
                    }/students/detail/${rowInfo.original.StudentId}`
                  );
                }
              }
            },
          })}
        />
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchAppContextSetSchoolId: id => {
      dispatch(appContextSetSchoolId(id));
    },
  };
};

export default connect(
  StudentsDataGrid,
  null,
  mapDispatchToProps
);
