import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import connect from 'src/redux/connect';
import { excelToBase64String } from 'util/base64';

import Module from 'components/Layout/Module';
import Modal from 'components/Modal';
import ConfirmDialog from 'components/ConfirmDialog';

import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import SmartReportGenerateExcelFormContainer from 'containers/School/SmartReportGenerateExcelFormContainer';
import SmartReportDetailContainer from 'containers/School/SmartReportDetailContainer';
import SchoolOutboxEmailFormContainer from 'containers/School/SchoolOutboxEmailFormContainer';
import SchoolOutboxSMSFormContainer from 'containers/School/SchoolOutboxSMSFormContainer';
import SmartReportDeleteContainer from 'containers/School/SmartReportDeleteContainer';

import LoadReport from './LoadReport';
import SaveReport from './SaveReport';
import SmartListPage from './SmartListDetail';

import SendSMSTemplate from 'src/views/_shared/Messaging/SMS/SendSMSTemplate';
import SendEmailTemplate from 'src/views/_shared/Messaging/Email/SendEmailTemplate';

type SmartListModuleProps = {
  history: {},
  match: { params: { schoolId: string } },
  smartReportGenerateExcelPost: any,
};

class SmartListModule extends React.Component {
  props: SmartListModuleProps;
  state = { base64data: null };

  componentWillReceiveProps(nextProps) {
    //Checks for new Excel data and converts it to base64
    if (
      !this.props.smartReportGenerateExcelPost.payload &&
      this.props.smartReportGenerateExcelPost.payload !==
        nextProps.smartReportGenerateExcelPost.payload
    ) {
      let base64String = excelToBase64String(
        nextProps.smartReportGenerateExcelPost.payload
      );
      base64String.then(value => {
        this.setState({
          base64data: value,
        });
      });
    }
  }

  render() {
    const schoolId = this.props.match.params.schoolId;
    return (
      <Module className="SmartListModule">
        <Route
          exact
          path={this.props.match.path}
          render={innerProps => {
            return <Redirect to={`${this.props.match.url}/report`} />;
          }}
        />
        <Route
          path={`${this.props.match.path}/report`}
          render={innerProps => {
            return (
              <SchoolStylesContainer
                dispatchFetchParams={innerProps.match.params.schoolId}
              >
                <SmartListPage />
              </SchoolStylesContainer>
            );
          }}
        />
        <Route
          path="/app/school-app/:schoolId/students/smart-list/report/send-email"
          render={routerProps => <SendEmailTemplate />}
        />
        <Route
          path="/app/school-app/:schoolId/students/smart-list/report/send-sms"
          render={routerProps => <SendSMSTemplate />}
        />
        <Route
          path="/app/school-app/:schoolId/students/smart-list/report/save"
          path={`${this.props.match.path}/report/save`}
          render={innerProps => {
            return <SaveReport />;
          }}
        />
        <Route
          path={`${this.props.match.path}/report/load`}
          render={innerProps => {
            return <LoadReport />;
          }}
        />
        <Route
          path={`${this.props.match.path}/report/export`}
          render={innerProps => {
            return (
              <Modal
                title="Export to Excel"
                closeUrl={`${this.props.match.url}/report`}
              >
                <SmartReportGenerateExcelFormContainer
                  dispatchFetchParams={innerProps.location.state.filters}
                >
                  {this.state.base64data ? (
                    <a
                      href={this.state.base64data}
                      className="pt-button pt-intent-primary pt-icon-export"
                      download
                    >
                      &nbsp;Download
                    </a>
                  ) : (
                    <button className="pt-button pt-icon-export" disabled>
                      &nbsp;Download
                    </button>
                  )}
                </SmartReportGenerateExcelFormContainer>
              </Modal>
            );
          }}
        />
        <Route
          exact
          path={`${this.props.match.path}/detail/:smartReportId`}
          render={innerProps => {
            return (
              <Redirect
                to={`${this.props.match.url}/detail/report/${
                  innerProps.match.params.smartReportId
                }`}
              />
            );
          }}
        />
        <Route
          path={`${this.props.match.path}/detail/report/:smartReportId`}
          render={innerProps => (
            <SmartReportDetailContainer
              dispatchFetchParams={innerProps.match.params.smartReportId}
            >
              <SchoolStylesContainer
                dispatchFetchParams={innerProps.match.params.schoolId}
              >
                <SmartListPage />
              </SchoolStylesContainer>
            </SmartReportDetailContainer>
          )}
        />
        <Route
          path={`${this.props.match.path}/detail/report/:smartReportId/save`}
          render={innerProps => {
            return <SaveReport />;
          }}
        />
        <Route
          path={`${this.props.match.path}/detail/report/:smartReportId/load`}
          render={innerProps => {
            return <LoadReport />;
          }}
        />
        <Route
          path={`${this.props.match.path}/detail/report/:smartReportId/delete`}
          render={innerProps => {
            return (
              <Modal
                title="Delete Smart Report"
                closeUrl={`${this.props.match.url}`}
              >
                <SmartReportDeleteContainer
                  dispatchActionOnCloseParams={innerProps.match.params.schoolId}
                  redirectOnSuccess={`${this.props.match.url}`}
                >
                  <ConfirmDialog
                    title="Are you sure you want to delete?"
                    closeUrl={`${this.props.match.url}`}
                    id={innerProps.match.params.smartReportId}
                  />
                </SmartReportDeleteContainer>
              </Modal>
            );
          }}
        />
        <Route
          path={`${this.props.match.path}/detail/report/:smartReportId/export`}
          render={innerProps => {
            return (
              <Modal
                title="Export to Excel"
                closeUrl={`${this.props.match.url}/detail/report/${
                  innerProps.match.params.smartReportId
                }`}
              >
                <SmartReportGenerateExcelFormContainer
                  dispatchFetchParams={innerProps.location.state.filters}
                >
                  {this.state.base64data ? (
                    <a
                      href={this.state.base64data}
                      className="pt-button pt-intent-primary pt-icon-export"
                      download
                    >
                      &nbsp;Download
                    </a>
                  ) : (
                    <button className="pt-button pt-icon-export" disabled>
                      &nbsp;Download
                    </button>
                  )}
                </SmartReportGenerateExcelFormContainer>
              </Modal>
            );
          }}
        />
      </Module>
    );
  }
}

const mapStateToProps = state => {
  return {
    smartReportGenerateExcelPost: state.school.smartReportGenerateExcelPost,
  };
};

export default connect(
  SmartListModule,
  mapStateToProps
);
