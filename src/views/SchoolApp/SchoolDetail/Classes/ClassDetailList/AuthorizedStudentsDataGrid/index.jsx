import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import connect from 'src/redux/connect';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';

import moment from 'moment';

type AuthorizedStudentsDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  studentsEnrolledData: {
    payload: [{}],
  },
  token: {
    payload: {
      UserName: string,
      SchoolId: string,
      TimeZone: string,
    },
  },
};

class AuthorizedStudentsDataGrid extends React.Component {
  props: AuthorizedStudentsDataGridProps;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
          Header: 'Bar Code',
          accessor: 'BarCode',
        },
      ],
    };
  }

  componentDidMount() {
    let studentsEnrolledData = [];

    if (this.props.studentsEnrolledData) {
      studentsEnrolledData = this.props.studentsEnrolledData.payload.map(
        item => {
          return item;
        }
      );
    }

    let data = studentsEnrolledData;

    this.setState({ data });
  }

  render() {
    return (
      <DynamicHeightReactTable
        className="linked-row"
        data={this.state.data}
        pageSize={this.state.data.length}
        columns={this.state.columns}
        verticalBuffer={50}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            this.props.history.push(
              `/app/school-app/${this.props.schoolId}/students/detail/${
                rowInfo.original.StudentId
              }`
            );
          },
        })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    studentsEnrolledData: state.school.studentsEnrolled,
    token: state.token,
  };
};

export default connect(
  AuthorizedStudentsDataGrid,
  mapStateToProps
);
