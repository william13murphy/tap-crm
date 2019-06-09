import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import connect from 'src/redux/connect';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import '../styles.less';

type AllOutboxDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  references: any,
  role: string,
  allStudentLists: {
    payload: [{}],
  },
  schoolId: string,
  original: {
    Students: [{}],
    DataJson: string,
  },
};

class AllOutboxDataGrid extends React.Component {
  props: AllOutboxDataGridProps;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Name',
          accessor: 'Name',
        },
        {
          Header: 'Description',
          accessor: 'Description',
        },
        {
          Header: 'Students',
          accessor: 'Students',
          Cell: props => {
            if (props.original && props.original.DataJson) {
              let allStudents = JSON.parse(props.original.DataJson);
              return allStudents.length;
            }
          },
          filterMethod: (filter, row) => {
            let allStudents = JSON.parse(row._original.DataJson);
            let obj = {
              ...row,
              Students: allStudents.length,
            };

            return filterPayloadMethod(filter, obj, 'Students');
          },
          Filter: filter,
        },
      ],
    };
  }

  componentDidMount() {
    let allStudentLists = [];

    if (this.props.allStudentLists.payload) {
      allStudentLists = this.props.allStudentLists.payload.map(item => {
        return item;
      });
    }

    let data = allStudentLists;

    this.setState({ data });
  }

  render() {
    return (
      <div>
        <DynamicHeightReactTable
          className="linked-row"
          data={this.state.data}
          pageSize={this.state.data.length}
          columns={this.state.columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push(
                `/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/studentlists/detail/${
                  rowInfo.original.Id
                }`
              );
            },
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
    role: state.token.payload.Role,
    allStudentLists: state.school.allStudentLists,
  };
};

export default connect(
  AllOutboxDataGrid,
  mapStateToProps
);
