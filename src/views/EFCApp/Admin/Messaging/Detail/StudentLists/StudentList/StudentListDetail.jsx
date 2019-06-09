import React from 'react';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import '../styles.less';

type StudentListDetailProps = {
  studentListDetailPayLoad: any,
  schoolId: any,
};

class StudentListDetail extends React.Component {
  props: StudentListDetailProps;
  constructor() {
    super();

    this.state = {
      studentListDetailPayLoad: [],
      columns: [
        {
          Header: 'Id',
          accessor: 'Barcode',
        },
        {
          Header: 'First Name',
          accessor: 'FirstName',
        },
        {
          Header: 'Last Name',
          accessor: 'LastName',
        },
        {
          Header: 'Phone',
          accessor: 'Phone',
        },
        {
          Header: 'Email',
          accessor: 'Email',
        },
      ],
    };
  }

  componentWillMount() {
    if (this.props.studentListDetailPayLoad) {
      let studentListDetailPayLoad = this.props.studentListDetailPayLoad.Students.map(
        item => {
          return {
            Barcode: item.Barcode,
            FirstName: item.FirstName,
            LastName: item.LastName,
            Phone: item.Phone,
            Email: item.Email,
            StudentId: item.StudentId,
          };
        }
      );
      this.setState({
        studentListDetailPayLoad,
      });
    }
  }
  render() {
    return (
      <div className="student_list_detail">
        <DefaultReactTable
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push(
                `/app/school-app/${this.props.schoolId}/students/detail/${
                  rowInfo.original.StudentId
                }/summary`
              );
            },
          })}
          pageSize={5}
          data={this.state.studentListDetailPayLoad}
          columns={this.state.columns}
          showPagination={
            this.state.studentListDetailPayLoad.length > 5 ? true : false
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    studentListDetailPayLoad: state.administration.efcUserCustomReport.payload,
  };
};

export default connect(
  StudentListDetail,
  mapStateToProps
);
