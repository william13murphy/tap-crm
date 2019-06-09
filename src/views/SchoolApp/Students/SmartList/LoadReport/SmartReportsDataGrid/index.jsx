import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';

type SmartReportsDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  references: any,
  allStudentLists: {
    payload: [{}],
  },
  schoolId: string,
  original: {
    Students: [{}],
    DataJson: string,
  },
};

class SmartReportsDataGrid extends React.Component {
  props: SmartReportsDataGridProps;
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
          Header: 'Created On',
          accessor: 'CreatedOn',
          Cell: props => {
            if (props.original && props.original.CreatedOn) {
              return moment(props.original.CreatedOn).format('MMMM D, YYYY');
            }
          },
        },
        {
          Header: 'Action',
          accessor: 'Action',
          className: 'Action',
          filterable: false,
          minWidth: 50,
          Cell: row => (
            <div className="Action__cell">
              <Link
                className="pt-button"
                to={`/app/school-app/${
                  row.original.SchoolId
                }/students/smart-list/detail/${row.original.Id}`}
              >
                <i
                  className="Icon IconView fa fa-eye"
                  aria-hidden="true"
                  title="View"
                />
              </Link>
              {/* &nbsp;&nbsp;
              <Link
                className="pt-button"
                to={`/app/school-app/${
                  row.original.SchoolId
                }/students/smart-list/detail/report/${row.original.Id}/delete`}
              >
                <i
                  className="Icon IconDelete fa fa-trash"
                  aria-hidden="true"
                  title="Delete"
                />
              </Link> */}
            </div>
          ),
        },
      ],
    };
  }

  componentDidMount() {
    let smartReports = [];

    if (this.props.smartReports.payload) {
      smartReports = this.props.smartReports.payload.map(item => {
        return item;
      });
    }

    let data = smartReports;
    this.setState({ data });
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
    smartReports: state.school.smartReports,
  };
};

export default connect(
  SmartReportsDataGrid,
  mapStateToProps
);
