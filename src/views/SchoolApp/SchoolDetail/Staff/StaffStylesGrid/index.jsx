import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import Page from 'components/Layout/Page';

type StaffStylesGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
};

class StaffStylesGrid extends React.Component {
  props: CurrentRankGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Style',
          accessor: 'm_Item2',
        },
      ],
      data: [],
    };
  }
  render() {
    return (
      <Page className="StaffStylesGrid" title="Staff Styles">
        <DefaultReactTable
          noFilter
          pageSize={this.props.data.length}
          className="linked-row"
          data={this.props.data}
          columns={this.state.columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push(
                `/app/school-app/${
                  this.props.schoolId
                }/school-detail/programs/detail/${
                  rowInfo.original.m_Item1
                }/program`
              );
            },
          })}
        />
      </Page>
    );
  }
}

export default StaffStylesGrid;
