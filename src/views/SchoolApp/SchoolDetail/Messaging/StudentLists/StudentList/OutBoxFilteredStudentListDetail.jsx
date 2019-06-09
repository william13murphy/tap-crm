import React from 'react';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import '../styles.less';

type OutBoxFilteredStudentListDetailProps = {
  selectedStudentsDataPayload: any,
  schoolId: any,
};

class OutBoxFilteredStudentListDetail extends React.Component {
  props: OutBoxFilteredStudentListDetailProps;
  constructor() {
    super();

    this.state = {
      selectedStudentsDataPayload: [],
      columns: [
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
        },
        {
          Header: 'Phone',
          accessor: 'PhoneNumber',
        },
      ],
    };
  }

  render() {
    return (
      <div className="student_list_detail">
        <DefaultReactTable
          pageSize={5}
          data={this.props.selectedStudentsDataPayload}
          columns={this.state.columns}
          showPagination={
            this.props.selectedStudentsDataPayload.length > 5 ? true : false
          }
        />
      </div>
    );
  }
}

export default OutBoxFilteredStudentListDetail;
