import React from 'react';
import { Link } from 'react-router-dom';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import SingleButtonForm from 'components/Forms/SingleButtonForm';
import ConvertLeadToStudentStatefulFormContainer from 'containers/School/ConvertLeadToStudentStatefulFormContainer';
import './styles.less';
import connect from 'src/redux/connect';
import moment from 'moment';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';

type LeadManagementDataGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  original: {
    LeadStatusId: string,
  },
};

class LeadManagementDataGrid extends React.Component {
  props: LeadManagementDataGridProps;

  componentDidMount() {
    if (this.props.data.payload) {
      let data = this.props.data.payload.map(item => {
        return {
          Id: item.SchoolLeadId,
          Inquiry: moment(item.InquiryDate).format('YYYY-MM-DD'),
          FirstName: item.FirstName,
          LastName: item.LastName,
          InterestedIn: item.InterestedIn,
          Phone: item.Phone,
          Status: item.Status,
          Intro:
            item.TrialClass1Utc &&
            moment(item.TrialClass1Utc).format('YYYY-MM-DD'),
          Intro2:
            item.TrialClass2Utc &&
            moment(item.TrialClass2Utc).format('YYYY-MM-DD'),
        };
      });

      this.setState({
        data,
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Inquiry Date',
          accessor: 'Inquiry',
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
          Header: 'Interested In',
          accessor: 'InterestedIn',
          Cell: rowInfo => {
            let matchedItem = this.props.styles.payload.find(
              item => item.Id == rowInfo.value
            );

            return (
              <span className="status">
                {rowInfo.value && matchedItem && matchedItem.Name}
              </span>
            );
          },
          filterMethod: (filter, row) => {
            let matchedItem = this.props.styles.payload.find(
              item => item.Id == row.InterestedIn
            );
            let obj = {
              ...row,
              InterestedIn: matchedItem && matchedItem.Name,
            };

            return filterPayloadMethod(filter, obj, 'InterestedIn');
          },
          Filter: filter,
        },
        {
          Header: 'Phone Number',
          accessor: 'Phone',
        },
        {
          Header: 'Status',
          accessor: 'Status',
        },
        {
          Header: 'Intro/Trial 1',
          accessor: 'Intro',
        },
        {
          Header: 'Intro/Trial 2',
          accessor: 'Intro2',
        },
        {
          Header: 'Actions',
          accessor: 'Actions',
          filterable: false,
          Cell: row => {
            return (
              <div className="Action__cell">
                <Link
                  className="pt-button"
                  to={{
                    pathname: `/app/school-app/${
                      props.schoolId
                    }/dashboard/marketing-overview/lead/${
                      row.original.Id
                    }/edit`,
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
                {row.original.Status === 'Sale' ? null : (
                  <ConvertLeadToStudentStatefulFormContainer
                    dispatchActionOnSuccessParams={props}
                    redirectOnSuccessWithReturnedId={`/app/school-app/${
                      props.schoolId
                    }/students/detail/:id/summary/first-time`}
                  >
                    <SingleButtonForm
                      title="Convert"
                      className="pt-icon pt-icon-new-person"
                      formData={{ Id: row.original.Id }}
                    />
                  </ConvertLeadToStudentStatefulFormContainer>
                )}
              </div>
            );
          },
        },
      ],
    };
  }
  render() {
    return (
      <DefaultReactTable
        pageSize={this.state.data.length}
        className="LeadManagementDataGrid linked-row"
        data={this.state.data}
        columns={this.state.columns}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.report.marketingLead,
    styles: state.school.styles,
    references: state.utility.references,
  };
}

export default connect(
  LeadManagementDataGrid,
  mapStateToProps
);
