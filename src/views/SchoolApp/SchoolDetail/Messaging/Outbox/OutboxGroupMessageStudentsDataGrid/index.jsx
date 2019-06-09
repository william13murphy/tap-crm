import React from 'react';
import connect from 'src/redux/connect';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

type OutboxGroupMessageStudentsDataGridProps = {
  match: {
    params: {
      Name: string,
    },
  },
  anemicStudents: [{}],
  references: [{}],
  allOutboxGroup: {
    payload: any,
  },
  timeId: any,
};

class OutboxGroupMessageStudentsDataGrid extends React.Component {
  constructor(props: OutboxGroupMessageStudentsDataGridProps) {
    super(props);
    this.state = {
      data: [],
      columns: [
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
        },
      ],
    };
  }

  componentDidMount() {
    let StudentsData = [];
    this.props.anemicStudents.payload.map(cV => {
      this.props.students.map(item => {
        if (cV.StudentId === item.StudentId) {
          StudentsData.push(cV);
        }
      });
    });
    this.setState({ data: StudentsData });
  }

  render() {
    return (
      <div>
        <DefaultReactTable
          className="linked-row"
          data={this.state.data}
          pageSize={this.state.data.length}
          columns={this.state.columns}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    anemicStudents: state.school.anemicStudents,
  };
};

export default connect(
  OutboxGroupMessageStudentsDataGrid,
  mapStateToProps
);
