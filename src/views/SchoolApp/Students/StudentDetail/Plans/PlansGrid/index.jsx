import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';

import BooleanToYesNo from 'components/BooleanToYesNo';
import NoDataMessage from 'components/DataLoading/NoDataMessage';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';

type PlansGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  references: {
    payload: Array<{}>,
  },
  studentId: string,
};

class PlansGrid extends React.Component {
  props: PlansGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Owner',
          accessor: 'OwnerId',
          Cell: row => {
            const owner = this.props.owners.payload.filter(o => {
              return o.Id === row.value;
            })[0];

            if (owner) {
              return (
                <div>
                  {owner.FirstName} {owner.LastName}
                </div>
              );
            } else {
              return null;
            }
          },
          filterMethod: (filter, row) => {
            let matchedItem = this.props.owners.payload.find(
              item => item.Id === row.OwnerId
            );
            if (matchedItem) {
              let obj = {
                ...row,
                Name: matchedItem.FirstName + ' ' + matchedItem.LastName,
              };
              return filterPayloadMethod(filter, obj, 'Name');
            }
          },
          Filter: filter,
        },
        {
          Header: 'Plan Start Date',
          accessor: 'PlanStartDate',
          Cell: row => <span>{moment(row.value).format('MMMM D, YYYY')}</span>,
        },
        {
          Header: 'Plan End Date',
          accessor: 'PlanEndDate',
          Cell: row => {
            if (row.value === '9999-12-31T00:00:00') {
              return <span />;
            } else {
              return <span>{moment(row.value).format('MMMM D, YYYY')}</span>;
            }
          },
        },
        {
          Header: 'Finalized',
          accessor: 'Finalized',
          Cell: row => (
            <BooleanToYesNo
              color
              bool={row.original.Finalized}
              yes="Finalized"
              no="Not Finalized"
            />
          ),
        },
        {
          Header: 'Active',
          accessor: 'TerminiationDate',
          Cell: row => {
            let active = false;
            if (row.original.Finalized && !row.original.TerminiationDate) {
              active = true;
            }
            return (
              <BooleanToYesNo color bool={active} yes="Active" no="Inactive" />
            );
          },
        },
      ],
    };
  }
  render() {
    if (this.props.data.length === 0) {
      return <NoDataMessage errorMessage="No Plans Found." />;
    }
    return (
      <div className="StudentPlansGrid">
        <DynamicHeightReactTable
          pageSize={this.props.data.length}
          className="linked-row"
          data={this.props.data}
          columns={this.state.columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push({
                pathname: `/app/school-app/${
                  this.props.schoolId
                }/students/plans/detail/${rowInfo.original.Id}`,
                state: { initialValues: rowInfo.original },
              });
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
    owners: state.student.owners,
  };
};

export default connect(
  PlansGrid,
  mapStateToProps
);
