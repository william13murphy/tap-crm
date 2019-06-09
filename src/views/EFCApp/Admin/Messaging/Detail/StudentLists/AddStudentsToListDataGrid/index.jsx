import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

import Checkbox from 'components/Checkbox';

type AddStudentsToListDataGridProps = {
  data: [],
  history: {
    push: any,
  },
  schoolId: string,
  dispatchFormPost: Function,
};

class AddStudentsToListDataGrid extends React.Component {
  props: AddStudentsToListDataGridProps;

  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          Header: () => (
            <span className="checkbox">
              {this.state.isSelectMember ? (
                <Checkbox
                  checked={this.state.headerEnabled}
                  onClick={this.handleHeaderEnabledChange}
                />
              ) : null}
            </span>
          ),
          accessor: 'isEnabled',
          Cell: row => (
            <span className="checkbox">
              <Checkbox
                checked={row.original.isEnabled}
                onClick={() => {
                  this.handleEnabledChange(row);
                }}
              />
            </span>
          ),
          sortable: false, // use table default
          filterable: false,
          maxWidth: 100,
        },

        {
          Header: 'First Name',
          accessor: 'FirstName',
        },
        {
          Header: 'Last Name',
          accessor: 'LastName',
        },
      ],
      data: [],
      isSelectMember: false,
      isPagination: false,
      headerEnabled: false, // Have to check this value
      studentIds: [],
    };
  }

  handleEnabledChange = row => {
    let { data } = this.state;
    let item = data[row.index];
    item.isEnabled = !item.isEnabled;
    data[row.index] = item;
    this.setState({
      data,
    });

    if (item.isEnabled) {
      this.setState(
        {
          studentIds: this.state.studentIds.concat(item.StudentId),
        },
        () => {
          this.props.setStudentIds(this.state.studentIds);
        }
      );
    } else {
      let studentIds = this.state.studentIds;
      studentIds = studentIds.filter(id => id !== item.StudentId);
      this.setState(
        {
          studentIds: studentIds,
        },
        () => {
          this.props.setStudentIds(this.state.studentIds);
        }
      );
    }
  };

  handleHeaderEnabledChange = () => {
    let data = this.state.data.map(item => {
      return {
        ...item,
        isEnabled: !this.state.headerEnabled,
      };
    });
    let studentIds = [];
    if (!this.state.headerEnabled) {
      studentIds = data.map(item => item.StudentId);
    }
    this.setState(
      {
        data,
        headerEnabled: !this.state.headerEnabled,
        studentIds: studentIds,
      },
      () => {
        if (this.state.headerEnabled) {
          this.props.setStudentIds(this.state.studentIds);
        } else {
          this.props.setStudentIds(this.state.studentIds);
        }
      }
    );
  };

  componentWillMount() {
    if (this.props.data.payload.length > 0) {
      this.setState({
        isSelectMember: !this.state.isSelectMember,
        isPagination: !this.state.isPagination,
      });
    }
  }

  componentDidMount() {
    if (this.props.data.payload) {
      let data = this.props.data.payload.map(item => {
        return {
          ...item,
          isEnabled: false,
        };
      });

      this.setState({ data });
    }
  }

  render() {
    return (
      <div>
        <DefaultReactTable
          className="linked-row"
          pageSize={this.state.data.length}
          data={this.state.data}
          columns={this.state.columns}
          pageSize={10}
          showPagination={this.state.isPagination}
        />
      </div>
    );
  }
}

export default AddStudentsToListDataGrid;
