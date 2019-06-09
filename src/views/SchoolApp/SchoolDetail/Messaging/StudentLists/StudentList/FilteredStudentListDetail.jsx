import React from 'react';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import Checkbox from 'components/Checkbox';

import '../styles.less';

type FilteredStudentListDetailProps = {
  schoolId: any,
};

class FilteredStudentListDetail extends React.Component {
  props: FilteredStudentListDetailProps;
  constructor() {
    super();

    this.state = {
      columns: [
        {
          Header: () => (
            <span className="checkbox">
              <Checkbox
                checked={this.state.headerEnabled}
                onClick={this.handleHeaderEnabledChange}
              />
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
          Header: 'Id',
          accessor: 'BarCode',
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
          Header: 'Phone Number',
          accessor: 'PhoneNumber',
        },
        {
          Header: 'Email',
          accessor: 'Email',
        },
      ],
      data: [],
      headerEnabled: false,
    };
  }

  handleEnabledChange = row => {
    let { data } = this.state;
    let item = data[row.index];

    item.isEnabled = !item.isEnabled;
    data[row.index] = item;

    let selectedStudentsIds = data
      .filter(student => student.isEnabled === true)
      .map(item => item.StudentId);

    this.props.handleSelectedStudents(selectedStudentsIds);
    this.setState({
      data,
    });
  };

  handleHeaderEnabledChange = () => {
    let data = this.state.data.map(item => {
      return {
        ...item,
        isEnabled: !this.state.headerEnabled,
      };
    });

    let selectedStudentsIds = data
      .filter(student => student.isEnabled === true)
      .map(item => item.StudentId);

    this.props.handleSelectedStudents(selectedStudentsIds);
    this.setState({ data, headerEnabled: !this.state.headerEnabled });
  };

  componentDidMount() {
    if (this.props.data) {
      let data = this.props.data.map(item => {
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
      <div className="filtered_student_list_detail">
        <DefaultReactTable
          pageSize={5}
          data={this.state.data}
          columns={this.state.columns}
          showPagination={this.props.data.length > 5 ? true : false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  FilteredStudentListDetail,
  mapStateToProps
);
