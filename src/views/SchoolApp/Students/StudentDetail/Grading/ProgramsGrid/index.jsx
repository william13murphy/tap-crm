import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import {
  filterPayloadMethod,
  filter
} from 'util/tableFilter';

type ProgramsGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  studentId: string,
  match: {
    path: string,
    url: string,
  },
  params: { schoolId: string }
};

class ProgramsGrid extends React.Component {
  props: ProgramsGridProps;
  render() {
    const columns = [
      {
        Header: 'Program Name',
        accessor: 'StyleName',
      },
    ];
    // console.log(JSON.stringify(this.props.data[0]));
    return (
      <div>
        <DynamicHeightReactTable
          pageSize={this.props.data.payload}
          className="linked-row"
          data={this.props.data}
          columns={columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push(
                `/app/school-app/${this.props.match.params.schoolId}/students/detail/${this.props.studentId}/grading/${rowInfo.original.StyleId}`);
            },
          })}
        />
      </div>
    );
  }
}

export default connect(ProgramsGrid);

