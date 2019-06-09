import React from 'react';
import flatten from 'flat';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import { excelToBase64String } from 'util/base64';
import Checkbox from 'components/Checkbox';

import SideNav from 'components/SideNav';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import SmartReportGenerateFormContainer from 'containers/School/SmartReportGenerateFormContainer';
import StateProvinceMasterContainer from 'containers/Utility/StateProvinceMasterContainer';

import FilteredStudentsDataGrid from '../FilteredStudentsDataGrid';
import SmartListFilterForm from '../SmartListFilterForm';
import EnabledColumnsForm from '../EnabledColumnsForm';

import LoadReport from '../LoadReport';
import '../styles.less';

type SmartListPageProps = {
  history: {},
  match: { params: { schoolId: string } },
  smartReportGeneratePost: any,
  smartReportDetail: { payload: { FilterJson: {} } },
  schoolAnemicStudents: { payload: {} },
};

class SmartListPage extends React.Component {
  props: SmartListPageProps;
  state = {
    filters: {},
    showFilters: true,
    selectedStudents: [],
    selectedStudentsData: [],
    columns: [
      {
        Header: () => (
          <span className="checkbox">
            <Checkbox
              checked={this.state.headerEnabled}
              onClick={this.handleHeaderEnabledChange}
            />
          </span>
        ),
        accessor: 'isEnabled',
        Cell: row => (
          <span className="checkbox">
            <Checkbox
              checked={
                this.state.headerEnabled ? 'true' : row.original.isEnabled
              }
              onClick={() => {
                this.handleEnabledChange(row);
              }}
            />
          </span>
        ),
        sortable: false, // use table default
        filterable: false,
        maxWidth: 100,
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
        Header: 'Email',
        accessor: 'Email',
        Cell: row => (
          <div>
            <span className="SendEmail__cell" title="Send an Email">
              {row.value}
            </span>
          </div>
        ),
      },
      {
        Header: 'Phone Number',
        accessor: 'PhoneNumber',
        Cell: row => (
          <div>
            <span className="SendSMS__cell" title="Send a SMS">
              {row.value}
            </span>
          </div>
        ),
      },
      {
        Header: 'Status',
        accessor: 'StatusTypeId',
      },
    ],
    data: [],
    headerEnabled: false,
  };

  componentWillReceiveProps(nextProps) {
    //Checks for new filtered students and sets the state to be used with the data grid
    if (
      !this.props.smartReportGeneratePost.payload &&
      this.props.smartReportGeneratePost !== nextProps.smartReportGeneratePost
    ) {
      this.setState({
        data: nextProps.smartReportGeneratePost.payload,
      });
    }
  }

  //Use data from SmartListFilterForm onSubmit to be passed to Save Reports
  handleFilters = filters => {
    this.setState({
      filters,
    });
  };

  handleShowHideFilters = () => {
    this.setState({
      showFilters: !this.state.showFilters,
    });
  };

  handleClearFilters = () => {
    this.setState({
      smartReportGeneratePost: null,
    });
  };

  handleColumnsChange = e => {
    if (e) {
      // Filter out any "false" values from the list, for items that have
      // been "checked" and then "un-checked".
      const flattyReduced = Object.keys(e).filter((cV, i) => {
        return e[cV];
      });
      const columnObjects = flattyReduced.map(cV => ({
        Header: cV,
        accessor: cV,
      }));
      this.setState({
        columns: columnObjects,
      });
    }
  };

  handleEnabledChange = row => {
    let data = this.state.data;
    let item = data[row.index];

    item.isEnabled = !item.isEnabled;
    data[row.index] = item;

    let selectedStudentsData = data.filter(
      student => student.isEnabled === true
    );

    let selectedStudentsIds = data
      .filter(student => student.isEnabled === true)
      .map(item => item.StudentId);

    this.setState({
      data,
      selectedStudents: selectedStudentsIds,
      selectedStudentsData,
    });
  };

  handleHeaderEnabledChange = () => {
    let data = this.state.data.map(item => {
      return {
        ...item,
        isEnabled: !this.state.headerEnabled,
      };
    });

    let selectedStudentsData = data.filter(
      student => student.isEnabled === true
    );

    let selectedStudentsIds = data
      .filter(student => student.isEnabled === true)
      .map(item => item.StudentId);

    this.setState({
      data,
      headerEnabled: !this.state.headerEnabled,
      selectedStudents: selectedStudentsIds,
      selectedStudentsData,
    });
  };

  render() {
    const schoolId = this.props.match.params.schoolId;

    return (
      <Page className="SmartListPage" title="Smart List">
        <SideNav hideNav={!this.state.showFilters && true}>
          <div className="SmartList__filters">
            <SmartReportGenerateFormContainer>
              <SmartListFilterForm
                handleFilters={this.handleFilters}
                handleClearFilters={this.handleClearFilters}
                schoolId={this.props.match.params.schoolId}
                initialValues={
                  this.props.smartReportDetail.payload &&
                  this.props.smartReportDetail.payload.FilterJson
                }
                autoSubmit={
                  this.props.smartReportDetail.payload &&
                  this.props.smartReportDetail.payload.FilterJson
                    ? true
                    : false
                }
              />
            </SmartReportGenerateFormContainer>
            <EnabledColumnsForm
              handleColumnsChange={this.handleColumnsChange}
            />
          </div>
        </SideNav>
        <PageHeader>
          <div className="SmartList__actions">
            <div className="SmartList__actions__column1">
              {this.state.showFilters ? (
                <button
                  className="pt-button pt-icon-chevron-left"
                  onClick={this.handleShowHideFilters}
                >
                  &nbsp;Hide Filters
                </button>
              ) : (
                <button
                  className="pt-button pt-icon-chevron-right"
                  onClick={this.handleShowHideFilters}
                >
                  &nbsp;Show Filters
                </button>
              )}
              {this.state.filters && (
                <Link
                  className="pt-button pt-icon-floppy-disk"
                  to={{
                    pathname: `${this.props.match.url}/save`,
                    //Data from SmartListFilterForm passed into this.props.location.state.filters
                    state: { filters: this.state.filters },
                  }}
                >
                  &nbsp;Save Report
                </Link>
              )}
              <Link
                className="pt-button pt-icon-folder-open"
                to={`${this.props.match.url}/load`}
              >
                &nbsp;Load Report
              </Link>
            </div>
            {this.state.filters && (
              <div className="SmartList__actions__column2">
                <Link
                  className="pt-button pt-icon-envelope"
                  to={{
                    pathname: `/app/school-app/${schoolId}/school-detail/messaging/outbox/compose`,
                    //filtered students passed into this.props.location.state.filteredStudents
                    state: {
                      filteredStudents: this.state.selectedStudents,
                      selectedStudentsData: this.state.selectedStudentsData,
                    },
                  }}
                >
                  &nbsp;Send Message
                </Link>
                {/* <Link
                  className="pt-button pt-icon-export"
                  to={{
                    pathname: `${this.props.match.url}/export`,
                    state: {
                      filters: this.state.filters,
                    },
                  }}
                >
                  &nbsp;Export
                </Link> */}
              </div>
            )}
          </div>
        </PageHeader>
        <PageBody>
          <div className="SmartList__grid">
            {this.state.data && (
              <FilteredStudentsDataGrid
                data={this.state.data}
                columns={this.state.columns}
                history={this.props.history}
                schoolId={schoolId}
              />
            )}
          </div>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    smartReportDetail: state.school.smartReportDetail,
    smartReportGeneratePost: state.school.smartReportGeneratePost,
    schoolAnemicStudents: state.school.anemicStudents,
  };
};

export default connect(
  SmartListPage,
  mapStateToProps
);
