import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import './styles.less';
import connect from 'src/redux/connect';
import moment from 'moment';

type MarketingGridProps = {
  data: {
    payload: Array<{}>,
  },
  marketings: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  schoolId: string,
  match: {
    url: string,
  },
};

class MarketingGrid extends React.Component {
  props: MarketingGridProps;

  constructor() {
    super();
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Start Date',
          accessor: 'StartDate',
          Cell: rowInfo => (
            <span className="date">
              {rowInfo.value && moment(rowInfo.value).format('MMMM D, YYYY')}
            </span>
          ),
        },
        {
          Header: 'EndDate',
          accessor: 'EndDate',
          Cell: rowInfo => (
            <span className="date">
              {rowInfo.value && moment(rowInfo.value).format('MMMM D, YYYY')}
            </span>
          ),
        },
        {
          Header: 'Detail',
          accessor: 'Detail',
        },
        {
          Header: 'Target',
          accessor: 'Target',
        },
      ],
    };
  }
  render() {
    if (this.props.data.payload.length === 0) {
      return (
        <div className="MarketingGrid">
          <h4>No Campaigns Found</h4>
        </div>
      );
    }

    return (
      <DynamicHeightReactTable
        pageSize={this.props.data.payload.length}
        className="MarketingGrid linked-row has-action"
        data={this.props.data.payload}
        columns={this.state.columns}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: () => {
            this.props.history.push({
              pathname: `/app/school-app/${
                this.props.schoolId
              }/school-detail/marketings/${rowInfo.original.Id}/edit`,
              state: { initialValues: rowInfo.original },
            });
          },
        })}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    references: state.utility.references,
  };
}

export default connect(
  MarketingGrid,
  mapStateToProps
);
