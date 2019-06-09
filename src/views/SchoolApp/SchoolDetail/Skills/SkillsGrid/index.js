import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import SingleButtonForm from 'components/Forms/SingleButtonForm';
import ColorDisplay from 'components/ColorDisplay';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';

type SkillsGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  studentId: string,
  schoolId: string,
  match: {
    url: string,
  },
};

class SkillsGrid extends React.Component {
  props: SkillsGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: 'Color',
          accessor: 'Color',
          Cell: props => {
            return <ColorDisplay small color={props.original.Color} />;
          },
        },
        {
          Header: 'Name',
          accessor: 'Name',
        },
        {
          Header: 'Description',
          accessor: 'Description',
        },
        {
          Header: 'Action',
          accessor: 'Action',
          Cell: row => (
            <div className="Action__cell">
              <Link
                className="pt-button"
                to={{
                  pathname: `${props.match.url}/${row.original.Id}/edit`,
                  state: { initialValues: row.original },
                }}
              >
                <i
                  className="Icon IconEdit fa fa-pencil"
                  aria-hidden="true"
                  title="Edit"
                />
              </Link>
              &nbsp;&nbsp;
              <Link
                className="pt-button"
                to={{
                  pathname: `${props.match.url}/${row.original.Id}/delete`,
                  state: { initialValues: row.original },
                }}
              >
                <i
                  className="Icon IconDelete fa fa-trash"
                  aria-hidden="true"
                  title="Delete"
                />
              </Link>
            </div>
          ),
          filterable: false,
          sortable: false,
        },
      ],
    };
  }
  render() {
    return (
      <div className="SkillsGrid">
        <DynamicHeightReactTable
          pageSize={this.props.data && this.props.data.length}
          className="linked-row has-action"
          data={this.props.data}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default SkillsGrid;
