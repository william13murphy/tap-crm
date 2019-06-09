import React from 'react';
import moment from 'moment';

import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import connect from 'src/redux/connect';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import '../styles.less';

type OutboxGroupMessagesDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  references: any,
  role: string,
  efcUserOutboxGroup: {
    payload: any,
  },
  schoolId: string,
};

class OutboxGroupMessagesDataGrid extends React.Component {
  props: OutboxGroupMessagesDataGridProps;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Subject',
          accessor: 'Subject',
        },
        {
          Header: 'Sent on',
          accessor: 'Name',
          Cell: props => {
            let createdOn = moment(props.original.Name).format(
              'MMMM Do YYYY, h:mm:ss a'
            );
            return createdOn;
          },
        },
        {
          Header: 'Message',
          accessor: 'HtmlData',
          Cell: props => {
            return (
              <div
                dangerouslySetInnerHTML={{ __html: props.original.HtmlData }}
              />
            );
          },
        },
      ],
    };
  }

  componentDidMount() {
    let outBoxDataGroup = [];

    if (this.props.efcUserOutboxGroup.payload) {
      outBoxDataGroup = this.props.efcUserOutboxGroup.payload
        .filter(item => item.SchoolId === this.props.schoolId)
        .map(item => {
          return item;
        });
    }
    this.setState({ data: outBoxDataGroup });
  }

  render() {
    return (
      <div>
        <DynamicHeightReactTable
          className="linked-row"
          data={this.state.data}
          pageSize={this.state.data.length}
          columns={this.state.columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => {
              this.props.history.push({
                pathname: `/app/admin/messaging/detail/${
                  rowInfo.original.SchoolId
                }/outbox/${rowInfo.original.Name}/detail`,
                state: { students: rowInfo.original.StudentIds },
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
    role: state.token.payload.Role,
    efcUserOutboxGroup: state.administration.efcUserOutboxGroup,
  };
};

export default connect(
  OutboxGroupMessagesDataGrid,
  mapStateToProps
);
