import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import { getReferenceItemOptions } from 'api/referenceItems';

import SingleButtonForm from 'components/Forms/SingleButtonForm';
import NoDataMessage from 'components/DataLoading/NoDataMessage';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';

import ConvertLeadToStudentStatefulFormContainer from 'containers/School/ConvertLeadToStudentStatefulFormContainer';
import './styles.less';

type MarketingLeadGridProps = {
  data: {
    payload: Array<{}>,
  },
  marketings: {
    payload: Array<{}>,
  },
  styles: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  original: {
    LeadStatusId: string,
  },
};

class MarketingLeadGrid extends React.Component {
  props: MarketingLeadGridProps;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: 'First Name ',
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
            if (filter.value === 'All Programs') {
              return row;
            } else if (filter.value === row.InterestedIn) {
              return row;
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: '100%' }}
              value={filter ? filter.value : 'All'}
            >
              <option value="All Programs">All</option>
              {this.props.styles.payload.map(item => {
                return (
                  <option value={item.Id} key={item.Id}>
                    {item.Name}
                  </option>
                );
              })}
            </select>
          ),
        },
        {
          Header: 'Phone Number',
          accessor: 'Phone',
        },
        {
          Header: 'Email',
          accessor: 'Email',
        },
        {
          Header: 'Source',
          accessor: 'SchoolMarketingId',
          Cell: rowInfo => {
            let matchedMarketing =
              this.props.marketings.payload &&
              this.props.marketings.payload.find(
                marketing => marketing.Id === rowInfo.value
              );

            return (
              <span className="status">
                {rowInfo.value && matchedMarketing && matchedMarketing.Detail}
              </span>
            );
          },
          filterMethod: (filter, row) => {
            if (filter.value === 'All Source') {
              return row;
            } else if (filter.value === row.SchoolMarketingId) {
              return row;
            }
          },
          Filter: ({ filter, onChange }) => {
            return (
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: '100%' }}
                value={filter ? filter.value : 'All Source'}
              >
                <option value="All">All</option>
                {this.props.marketings.payload.map(item => {
                  return (
                    <option key={item.Id} value={item.Id}>
                      {item.Detail}
                    </option>
                  );
                })}
              </select>
            );
          },
        },
        {
          Header: 'Status',
          accessor: 'LeadStatusId',
          Cell: props => {
            if (props.original.LeadStatusId) {
              return (
                <div className="Status__cell">
                  <ReferenceOutput
                    listName="LstLeadStatus"
                    id={props.original.LeadStatusId}
                    references={this.props.references}
                  />
                </div>
              );
            } else {
              return null;
            }
          },
          filterMethod: (filter, row) => {
            let leadTypes = getReferenceItemOptions(
              'LstLeadStatus',
              this.props.references
            );
            if (filter.value === 'AllLeads') {
              return (
                row[filter.id] === leadTypes[0].value || //"LstLeadStatus": ['Lead']
                row[filter.id] === leadTypes[1].value || //"LstLeadStatus": ['Prospect']
                row[filter.id] === leadTypes[2].value || //"LstLeadStatus": ['Appointment']
                row[filter.id] === leadTypes[3].value || //"LstLeadStatus": ['Trial']
                row[filter.id] === leadTypes[4].value || //"LstLeadStatus": ['Sale']
                row[filter.id] === leadTypes[5].value || //"LstLeadStatus": ['No Sale']
                row[filter.id] === leadTypes[6].value //"LstLeadStatus": ['Other']
              );
            }
            if (filter.value === 'OpenLeads') {
              return (
                row[filter.id] === leadTypes[0].value || //"LstLeadStatus": ['Lead']
                row[filter.id] === leadTypes[1].value || //"LstLeadStatus": ['Prospect']
                row[filter.id] === leadTypes[2].value || //"LstLeadStatus": ['Appointment']
                row[filter.id] === leadTypes[3].value || //"LstLeadStatus": ['Trial']
                row[filter.id] === leadTypes[6].value //"LstLeadStatus": ['Other']
              );
            }
            if (filter.value === 'ClosedLeads') {
              let isClosed = false;
              return (
                row[filter.id] === leadTypes[4].value || //"LstLeadStatus": ['Sale']
                row[filter.id] === leadTypes[5].value //"LstLeadStatus": ['No Sale']
              );
            }
            if (filter.value === 'Lead') {
              return row[filter.id] === leadTypes[0].value; //"LstLeadStatus": ['Lead']
            }
            if (filter.value === 'Prospect') {
              return row[filter.id] === leadTypes[1].value; //"LstLeadStatus": ['Prospect']
            }
            if (filter.value === 'Appointment') {
              return row[filter.id] === leadTypes[2].value; //"LstLeadStatus": ['Appointment']
            }
            if (filter.value === 'Trial') {
              return row[filter.id] === leadTypes[3].value; //"LstLeadStatus": ['Trial']
            }
            if (filter.value === 'Sale') {
              return row[filter.id] === leadTypes[4].value; //"LstLeadStatus": ['Sale'];
            }
            if (filter.value === 'NoSale') {
              return row[filter.id] === leadTypes[5].value; //"LstLeadStatus": ['No Sale'];
            }
            if (filter.value === 'Other') {
              return row[filter.id] === leadTypes[6].value; //"LstLeadStatus": ['Other']
            }
            //return true;
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: '100%' }}
              value={filter ? filter.value : 'OpenLeads'}
            >
              <option value="AllLeads">All Leads</option>
              <option value="OpenLeads">Open Leads</option>
              <option value="ClosedLeads">Closed Leads</option>
              <option value="Lead">Lead</option>
              <option value="Prospect">Prospect</option>
              <option value="Appointment">Appointment</option>
              <option value="Trial">Trial</option>
              <option value="NoSale">No Sale</option>
              <option value="Other">Other</option>
            </select>
          ),
        },
        {
          Header: 'Intro/Trial 1',
          accessor: 'TrialClass1Utc',
          Cell: rowInfo => {
            return (
              <span className="date">
                {rowInfo.value ? (
                  moment(rowInfo.value).format('YYYY-MM-DD')
                ) : (
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/${
                        rowInfo.original.Id
                      }/schedule-trial`,
                      state: {
                        initialValues: {
                          Id: rowInfo.original.Id,
                          Title:
                            'Trial Appointment: ' +
                            rowInfo.original.FirstName +
                            ' ' +
                            rowInfo.original.LastName,
                          Description:
                            rowInfo.original.FirstName +
                            ' ' +
                            rowInfo.original.LastName +
                            ' trial #1',
                          AppointmentTypeId:
                            '8642ee06-2dd3-49c0-bc9c-538e7430db6d', //Trial,
                          SchoolMarketingId: rowInfo.original.SchoolMarketingId,
                          TrialClass1Utc: rowInfo.original.TrialClass1Utc,
                          TrialClass2Utc: rowInfo.original.TrialClass1Utc,
                          FirstName: rowInfo.original.FirstName,
                          LastName: rowInfo.original.LastName,
                          LeadStatusId: rowInfo.original.LeadStatusId,
                          updateColumn: 'TrialClass1Utc',
                          Phone: rowInfo.original.Phone,
                          Email: rowInfo.original.Email,
                          InterestedIn: rowInfo.original.InterestedIn,
                        },
                      },
                    }}
                    className="pt-button pt-intent-primary"
                  >
                    Schedule
                  </Link>
                )}
              </span>
            );
          },
        },
        {
          Header: 'Intro/Trial 2',
          accessor: 'TrialClass2Utc',
          Cell: rowInfo => {
            return (
              <span className="date">
                {rowInfo.value ? (
                  moment(rowInfo.value).format('YYYY-MM-DD')
                ) : (
                  <Link
                    to={{
                      pathname: `${this.props.match.url}/${
                        rowInfo.original.Id
                      }/schedule-trial`,
                      state: {
                        initialValues: {
                          Id: rowInfo.original.Id,
                          Title:
                            'Trial Appointment: ' +
                            rowInfo.original.FirstName +
                            ' ' +
                            rowInfo.original.LastName,
                          Description:
                            rowInfo.original.FirstName +
                            ' ' +
                            rowInfo.original.LastName +
                            ' trial #2',
                          AppointmentTypeId:
                            '8642ee06-2dd3-49c0-bc9c-538e7430db6d', //Trial,
                          SchoolMarketingId: rowInfo.original.SchoolMarketingId,
                          TrialClass1Utc: rowInfo.original.TrialClass1Utc,
                          TrialClass2Utc: rowInfo.original.TrialClass2Utc,
                          FirstName: rowInfo.original.FirstName,
                          LastName: rowInfo.original.LastName,
                          LeadStatusId: rowInfo.original.LeadStatusId,
                          updateColumn: 'TrialClass2Utc',
                          Phone: rowInfo.original.Phone,
                          Email: rowInfo.original.Email,
                          InterestedIn: rowInfo.original.InterestedIn,
                        },
                      },
                    }}
                    className="pt-button pt-intent-primary"
                  >
                    Schedule
                  </Link>
                )}
              </span>
            );
          },
        },
        {
          Header: 'Actions',
          accessor: 'Actions',
          filterable: false,
          Cell: row => {
            const leadToStudentFuzzySearchParams = {
              SchoolId: this.props.schoolId,
              Term: '',
            };
            let leadStatusTypes = getReferenceItemOptions(
              'LstLeadStatus',
              this.props.references
            );
            return (
              <div className="Action__cell">
                <Link
                  className="pt-button"
                  to={{
                    pathname: `${this.props.match.url}/${row.original.Id}/edit`,
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
                {row.original.LeadStatusId ===
                leadStatusTypes[4].value ? null : (
                  <ConvertLeadToStudentStatefulFormContainer
                    dispatchActionOnSuccessParams={
                      leadToStudentFuzzySearchParams
                    }
                    redirectOnSuccessWithReturnedId={`/app/school-app/${
                      this.props.schoolId
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
    if (this.props.data.payload.length === 0) {
      return <NoDataMessage errorMessage="No Leads Found" />;
    }

    return (
      <DynamicHeightReactTable
        pageSize={this.props.data.payload.length}
        className="MarketingLeadGrid linked-row has-action has-status"
        data={this.props.data.payload}
        filterable={true}
        defaultFiltered={[
          {
            id: 'LeadStatusId',
            value: 'OpenLeads',
          },
        ]}
        columns={this.state.columns}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    references: state.utility.references,
    marketings: state.school.marketings,
    styles: state.school.styles,
  };
}

export default connect(
  MarketingLeadGrid,
  mapStateToProps
);
