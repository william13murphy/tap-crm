import React from 'react';
import connect from 'src/redux/connect';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import './styles.less';

type NonEfcUsersDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  studentData: any,
};

class NonEfcUsersDataGrid extends React.Component {
  props: NonEfcUsersDataGridProps;
  render() {
    const columns = [
      {
        Header: 'FirstName',
        accessor: 'FirstName',
      },
      {
        Header: 'LastName',
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
        accessor: 'PhoneNumber',
        Cell: row => (
          <div>
            <span className="SendSMS__cell" title="Send a SMS">
              {row.value}
            </span>
          </div>
        ),
      },
      {
        Header: 'UserType',
        accessor: 'UserTypeId',
        Cell: row => {
          return (
            <div>
              <ReferenceOutput
                id={row.original.UserTypeId}
                listName="LstUserTypes"
              />
            </div>
          );
        },
      },
    ];
    if (
      !this.props.nonEfcUsersUpdate ||
      !this.props.nonEfcUsersUpdate.payload
    ) {
      return null;
    } else if (this.props.nonEfcUsersUpdate.payload.length == 0) {
      return <div>No Records Found</div>;
    } else {
      return (
        <DynamicHeightReactTable
          className="NonEfcUsersDataGrid__container linked-row"
          data={
            this.props.nonEfcUsersUpdate && this.props.nonEfcUsersUpdate.payload
          }
          columns={columns}
          getTdProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              if (
                rowInfo.original.StudentId !== null &&
                column.Header === 'Email'
              ) {
                this.props.history.push({
                  pathname: `/app/admin/external-users/${
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
                  pathname: `/app/admin/external-users/${
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
                this.props.history.push(
                  `/app/admin/external-users/detail/${rowInfo.original.Id}`
                );
              }
            },
          })}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  nonEfcUsersUpdate: state.administration.nonEfcUsersUpdate,
});

export default connect(
  NonEfcUsersDataGrid,
  mapStateToProps
);
