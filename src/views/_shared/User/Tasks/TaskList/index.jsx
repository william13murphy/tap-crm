import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import { Link, Route } from 'react-router-dom';
import { getReferenceItemOptions } from 'api/referenceItems';
import moment from 'moment';
import StaffNameOutput from 'components/ConnectedComponents/StaffNameOutput';
import connect from 'src/redux/connect';
import TasksModule from '../';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import './styles.less';

type TaskListProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  nav: {
    efcNavHeight: number,
    schoolNavHeight: number,
    subNavHeight: number,
  },
  topSectionClassName?: string,
  showAll: boolean,
  appContext: { schoolId: string },
};

class TaskList extends React.Component {
  props: TaskListProps;
  constructor(props) {
    super(props);
    this.setGridHeight = this.setGridHeight.bind(this);
    this._isMounted = false;
    this.state = {
      height: 500, // default table height
      columns: [
        {
          Header: 'Due Date',
          accessor: 'DueDate',
          Cell: props => (
            <span className="date">
              {props.value && moment(props.value).format('YYYY-MM-DD')}
            </span>
          ),
        },
        {
          Header: 'Name',
          accessor: 'Title',
        },
        {
          Header: 'Assigned To',
          accessor: 'AssignedTo',
          Cell: row => {
            return <StaffNameOutput id={row.original.AssignedTo} />;
          },
          filterMethod: (filter, row) => {
            let matchedItem = this.props.staffs.payload.find(
              item => item.UserId === row.AssignedTo
            );

            let obj = {
              ...row,
              Name: matchedItem.Name,
            };

            return filterPayloadMethod(filter, obj, 'Name');
          },
          Filter: filter,
        },
        {
          Header: 'Type',
          accessor: 'TaskTypeId',
          Cell: props => {
            let items = getReferenceItemOptions(
              'LstTaskTypes',
              this.props.references
            );
            let matchedItem = items.find(item => item.value === props.value);
            return <span>{matchedItem.label}</span>;
          },
          filterMethod: (filter, row) =>
            filterReferenceMethod(
              filter,
              row,
              this.props.references,
              'LstTaskTypes',
              'TaskTypeId'
            ),
          Filter: filter,
        },
        {
          Header: 'Status',
          accessor: 'TaskStatusTypeId',
          Cell: props => {
            let items = getReferenceItemOptions(
              'LstTaskStatusTypes',
              this.props.references
            );
            let matchedItem = items.find(item => item.value === props.value);
            return <span>{matchedItem.label}</span>;
          },
          filterMethod: (filter, row) =>
            filterReferenceMethod(
              filter,
              row,
              this.props.references,
              'LstTaskStatusTypes',
              'TaskStatusTypeId'
            ),
          Filter: filter,
        },
        {
          Header: 'Actions',
          accessor: 'Actions',
          filterable: false,
          sortable: false,
          Cell: row => (
            <div className="Action__cell">
              <Route
                path={`/app/user/all-tasks/${row.original.Id}/edit`}
                render={() => (
                  <TasksModule
                    schoolId={this.props.appContext.schoolId}
                    allTaskList={true}
                  />
                )}
              />
              <Link
                className="pt-button pt-intent-primary"
                to={{
                  pathname: `/app/user/all-tasks/${row.original.Id}/edit`,
                  state: { taskDetail: row.original },
                }}
              >
                Edit
              </Link>
            </div>
          ),
        },
      ],
    };
  }

  setGridHeight = () => {
    // Get grid header & filter height
    const tableHeaderHeight = document.getElementsByClassName('-header')[0]
      .clientHeight;
    const tableFiltersHeight = document.getElementsByClassName('-filters')[0]
      .clientHeight;
    // Get height of section above the grid
    const topSectionHeight = document.getElementsByClassName(
      this.props.topSectionClassName || 'PageHeader'
    )[0].clientHeight;
    // Add padding below the grid
    const bottomPadding = 4;
    const bufferHeight = 90;

    // Calculate table body height
    let tableBodyHeight =
      window.innerHeight -
      (this.props.nav.efcNavHeight +
        this.props.nav.schoolNavHeight +
        this.props.nav.subNavHeight +
        topSectionHeight +
        bottomPadding +
        tableHeaderHeight +
        tableFiltersHeight +
        bufferHeight);

    // Minimum table height:
    if (tableBodyHeight < 222) {
      tableBodyHeight = 222;
    }

    this.setState({
      height: tableBodyHeight,
    });
  };

  componentDidMount() {
    this._isMounted = true;
    setTimeout(() => {
      if (this._isMounted) {
        this.setGridHeight();
      }
    }, 0);
    window.addEventListener('resize', this.setGridHeight);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.setGridHeight);
  }

  render() {
    let data = this.props.showAll
      ? this.props.data.payload
      : this.props.data.payload.filter(
          item =>
            item.TaskStatusTypeId === 'f808b6f3-c0ca-4094-b209-6e26a39c0c64' // Only show "Pending" tasks
        );

    return (
      <div className="TaskList">
        <DefaultReactTable
          getTbodyProps={() => {
            return {
              style: {
                height: this.state.height,
              },
            };
          }}
          // getTbodyProps={() => {
          //   return {
          //     style: {
          //       maxHeight: '975px',
          //       overflow: 'auto',
          //     },
          //   };
          // }}
          pageSize={this.props.data.payload.length}
          className="linked-row"
          data={data}
          columns={this.state.columns}
          // height="600px"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav,
    appContext: state.appContext,
    staffs: state.school.utilityStaffs,
  };
};

export default connect(
  TaskList,
  mapStateToProps
);
