import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import Checkbox from 'components/Checkbox';
import { Link } from 'react-router-dom';
import { getReferenceItemOptions } from 'api/referenceItems';
import moment from 'moment';
import StaffNameOutput from 'components/ConnectedComponents/StaffNameOutput';
import TaskListCompletionForm from './TaskListCompletionForm';
import TaskCompletionStatefulFormContainer from 'containers/User/TaskCompletionStatefulFormContainer';
import connect from 'src/redux/connect';

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
  userId: string,
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
          Header: 'Actions',
          accessor: 'Actions',
          filterable: false,
          sortable: false,
          Cell: row => {
            let initialValues = {
              TaskStatusTypeId: '0962c6ce-d066-434a-8da8-087bab7d4939', //Fixed task status type with complete
              AssignedTo: row.original.AssignedTo,
              ChangedOn: row.original.ChangedOn,
              CreatedBy: row.original.CreatedBy,
              CreatedOn: row.original.CreatedOn,
              DateCompleted: moment.utc().format(),
              Description: row.original.Description,
              DueDate: row.original.DueDate,
              Id: row.original.Id,
              TaskTypeId: row.original.TaskTypeId,
              Title: row.original.Title,
            };
            return (
              <div className="Action__cell">
                <Link
                  className="pt-button"
                  to={{
                    pathname: `/app/school-app/${
                      this.props.appContext.schoolId
                    }/dashboard/today/tasks/${row.original.Id}/edit`,
                    state: { taskDetail: row.original },
                  }}
                >
                  Edit
                </Link>
                <TaskCompletionStatefulFormContainer
                  dispatchActionOnSuccessParams={props.userId}
                >
                  <TaskListCompletionForm
                    title=" "
                    initialValues={initialValues}
                  />
                </TaskCompletionStatefulFormContainer>
              </div>
            );
          },
        },
      ],
    };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.schoolHealth.payload) {
      if (nextProps.schoolHealth.payload) {
        // Set Grid Height after call stack clears:
        setTimeout(() => {
          if (this._isMounted) {
            this.setGridHeight();
          }
        }, 0);
      }
    }
  }

  setGridHeight = () => {
    const pageHeaderHeight =
      document.getElementsByClassName('Dashboard__header') &&
      document.getElementsByClassName('Dashboard__header')[0]
        ? document.getElementsByClassName('Dashboard__header')[0].clientHeight
        : 0;

    // Get grid header & filter height
    const tableHeaderHeight =
      document.getElementsByClassName('-header') &&
      document.getElementsByClassName('-header')[0]
        ? document.getElementsByClassName('-header')[0].clientHeight
        : 0;

    const tableFiltersHeight =
      document.getElementsByClassName('-filters') &&
      document.getElementsByClassName('-filters')[0]
        ? document.getElementsByClassName('-filters')[0].clientHeight
        : 0;

    // Get height of section above the grid
    const bottomSectionHeight =
      document.getElementsByClassName('PageHeader') &&
      document.getElementsByClassName('PageHeader')[0]
        ? document.getElementsByClassName('PageHeader')[0].clientHeight
        : 0;

    const bufferHeight = 40;

    // Calculate table body height
    let tableBodyHeight =
      window.innerHeight -
      (this.props.nav.efcNavHeight +
        this.props.nav.schoolNavHeight +
        this.props.nav.subNavHeight +
        pageHeaderHeight +
        tableHeaderHeight +
        tableFiltersHeight +
        bottomSectionHeight +
        bufferHeight);

    // Minimum table height:
    if (tableBodyHeight < 110) {
      tableBodyHeight = 110; // 170 - 60 for header and filter rows
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
      <div className="TodayTaskList">
        <DefaultReactTable
          getTbodyProps={() => {
            return {
              style: {
                height: this.state.height,
              },
            };
          }}
          pageSize={this.props.data.payload.length}
          className="linked-row"
          data={data}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav,
    userId: state.token.payload.UserId,
    appContext: state.appContext,
    staffs: state.school.utilityStaffs,
    schoolHealth: state.report.schoolHealth,
  };
};

export default connect(
  TaskList,
  mapStateToProps
);
