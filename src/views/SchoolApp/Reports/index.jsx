import React from 'react';
import moment from 'moment';
import { Route, Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import SendSMSTemplate from 'src/views/_shared/Messaging/SMS/SendSMSTemplate';
import SendEmailTemplate from 'src/views/_shared/Messaging/Email/SendEmailTemplate';

import Module from 'components/Layout/Module';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import DataCard from 'components/DataCard';
import SideNav from 'components/SideNav';
import Collapsible from 'components/Collapsible';
import Modal from 'components/Modal';

import NoShowContainer from 'containers/Report/NoShowContainer';
import EnrollmentByProgramContainer from 'containers/Report/EnrollmentByProgramContainer';
import AttendanceByProgramContainer from 'containers/Report/AttendanceByProgramContainer';
import CumulativeAttendanceContainer from 'containers/Report/CumulativeAttendanceContainer';
import InquiryBySourceContainer from 'containers/Report/InquiryBySourceContainer';
import StudentCountContainer from 'containers/Report/StudentCountContainer';
import StudentLocationContainer from 'containers/Report/StudentLocationContainer';
import NewEnrollmentByProgramContainer from 'containers/Report/NewEnrollmentByProgramContainer';
import BillingByDateContainer from 'containers/Report/BillingByDateContainer';
import DeclineByDateContainer from 'containers/Report/DeclineByDateContainer';
import AttendanceByStyleByDateReportFormContainer from 'containers/Report/AttendanceByStyleByDateReportFormContainer';
import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import SchoolBirthdayContainer from 'containers/Report/SchoolBirthdayContainer';
import PerfectAttendanceByStyleByDateReportFormContainer from 'containers/Report/PerfectAttendanceByStyleByDateReportFormContainer';
import FinanceDeductionsReportContainer from 'containers/Report/FinanceDeductionsReportContainer';
import FinanceDisbursementsReportContainer from 'containers/Report/FinanceDisbursementsReportContainer';
import SchoolOutboxEmailFormContainer from 'containers/School/SchoolOutboxEmailFormContainer';
import SchoolOutboxSMSFormContainer from 'containers/School/SchoolOutboxSMSFormContainer';
import StudentUnpaidContainer from 'containers/Report/StudentUnpaidContainer';
import EOMContainer from 'containers/Report/EOMContainer';
import EOMExcelContainer from 'containers/Report/EOMExcelContainer';
import EOMByMonthByYearReportFormContainer from 'containers/Report/EOMByMonthByYearReportFormContainer';
import SoftExitContainer from 'containers/Report/SoftExitContainer';
import RenewalContainer from 'containers/Report/RenewalContainer';

import NoShow from './NoShow';
import SchoolBirthdayDataGrid from './SchoolBirthdayDataGrid';
import EnrollmentByProgram from './EnrollmentByProgram';
import AttendanceByProgram from './AttendanceByProgram';
import AttendanceByStyleByDate from './AttendanceByStyleByDate';
import CumulativeAttendance from './CumulativeAttendance';
import InquiryBySource from './InquiryBySource';
import StudentCount from './StudentCount';
import StudentLocation from './StudentLocation';
import NewEnrollmentByProgram from './NewEnrollmentByProgram';
import BillingByDate from './BillingByDate';
import DeclineByDate from './DeclineByDate';
import AttendanceByStyleByDateDataGrid from './AttendanceByStyleByDateDataGrid';
import PerfectAttendanceByStyleByDate from './PerfectAttendanceByStyleByDate';
import PerfectAttendanceByStyleByDateDataGrid from './PerfectAttendanceByStyleByDateDataGrid';
import DeductionsDataGrid from './Finance/DeductionsDataGrid';
import DisbursementsDataGrid from './Finance/DisbursementsDataGrid';
import StudentsUnpaid from './StudentsUnpaid';
import EndOfMonthGridDisplay from './EndOfMonth';
import EOMByMonthByYearForm from './EndOfMonth/EOMByMonthByYearForm';
import ExportToExcel from './EndOfMonth/ExportToExcel';
import SoftExitDataGrid from './SoftExitDataGrid';
import RenewalDataGrid from './RenewalDataGrid';
import './styles.less';

type ReportsModuleProps = {
  match: { params: { schoolId: string } },
  attendanceByStyleByDateReport: [{}],
  perfectAttendanceByStyleByDateReport: {
    payload: [{}],
  },
  schoolBirthdayReport: [{}],
  financeDeductions: [{}],
  financeDisbursements: [{}],
  eom: [{}],
  eomExcel: [{}],
  eomByMonthByReport: [{}],
  base64data: '',
};

class ReportsModule extends React.Component {
  props: ReportsModuleProps;
  render() {
    const schoolId = this.props.match.params.schoolId;
    return (
      <Module className="ReportsModule">
        <Page className="ReportsPage" title="Reports">
          <SideNav>
            <div className="Reports__list">
              <Collapsible title="Attendance Reports" isOpen>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/attendance-report`}
                >
                  Attendance Report
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/student-attendance`}
                >
                  Class Attendance Report
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/cumulative-attendance`}
                >
                  Cumulative Attendance Report
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/no-show`}
                >
                  No Show Report
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/perfect-attendance-report`}
                >
                  Perfect Attendance Report
                </Link>
              </Collapsible>
              <Collapsible title="Program Reports">
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/student-enrollment`}
                >
                  Students by Program
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/new-student-enrollment`}
                >
                  New Students by Program
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/student-count`}
                >
                  Student Count
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Students by Package
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Students by Rank
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Package Expiration Report
                </Link>
              </Collapsible>
              <Collapsible title="Marketing Reports">
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/inquiry-source`}
                >
                  Leads/Prospects Report
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Trial Report
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Zip Code Report
                </Link>
              </Collapsible>
              <Collapsible title="Student Reports">
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/student-location`}
                >
                  Student Location
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/birthday-report`}
                >
                  Student Dates of Birth Report
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/soft-exit`}
                >
                  Soft Exit Report
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/renewal`}
                >
                  Renewal Report
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Active Student Report
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Inactive Student Report
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Canceled Student Report
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Student Anniversary Report
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Student Promotion History
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Member Directory
                </Link>
              </Collapsible>
              <Collapsible title="Financial Reports">
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/billing-by-date`}
                >
                  Total Billed in Past Week
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/declines-by-date`}
                >
                  Declined Payments in Past Week
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/deductions`}
                >
                  Deductions Report
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/disbursements`}
                >
                  Disbursements Report
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/students-unpaid`}
                >
                  Unpaid Students Report
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Tax Reports
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Financial Summary Report
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Point of Sale Summary Report
                </Link>
                <Link
                  className="Reports__list__item disabled"
                  to={`${this.props.match.url}`}
                  onClick={e => e.preventDefault()}
                >
                  Staff Hours Report
                </Link>
              </Collapsible>
              <Collapsible title="EOM Reports">
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/eom`}
                >
                  Current EOM Reports
                </Link>
                <Link
                  className="Reports__list__item"
                  to={`${this.props.match.url}/previous-eom`}
                >
                  Previous EOM Reports
                </Link>
              </Collapsible>
            </div>
          </SideNav>
          <PageBody>
            <Route
              path={`${this.props.match.path}/attendance-report`}
              render={() => (
                <div>
                  <DataCard title="Student Attendance Report">
                    <SchoolStylesContainer dispatchFetchParams={schoolId}>
                      <AttendanceByStyleByDateReportFormContainer
                        dispatchFetchParams={schoolId}
                      >
                        <AttendanceByStyleByDate schoolId={schoolId} sideNav />
                      </AttendanceByStyleByDateReportFormContainer>
                    </SchoolStylesContainer>
                  </DataCard>
                  {this.props.attendanceByStyleByDateReport &&
                    this.props.attendanceByStyleByDateReport.payload && (
                      <AttendanceByStyleByDateDataGrid
                        data={this.props.attendanceByStyleByDateReport}
                      />
                    )}
                </div>
              )}
            />
            <Route
              path={`${this.props.match.path}/attendance-report/send-email`}
              render={routerProps => <SendEmailTemplate />}
            />
            <Route
              path={`${this.props.match.path}/attendance-report/send-sms`}
              render={routerProps => <SendSMSTemplate />}
            />
            <Route
              path={`${this.props.match.path}/student-attendance`}
              render={() => (
                <DataCard title="Student Attendance by Program">
                  <AttendanceByProgramContainer dispatchFetchParams={schoolId}>
                    <AttendanceByProgram sideNav />
                  </AttendanceByProgramContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/cumulative-attendance`}
              render={() => (
                <DataCard title="Cumulative Attendance">
                  <CumulativeAttendanceContainer dispatchFetchParams={schoolId}>
                    <CumulativeAttendance sideNav />
                  </CumulativeAttendanceContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/no-show`}
              render={() => (
                <DataCard title="No Show">
                  <NoShowContainer dispatchFetchParams={schoolId}>
                    <NoShow sideNav schoolId={schoolId} />
                  </NoShowContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/no-show/send-email`}
              render={routerProps => <SendEmailTemplate schoolId={schoolId} />}
            />
            <Route
              path={`${this.props.match.path}/no-show/send-sms`}
              render={() => <SendSMSTemplate />}
            />
            <Route
              path={`${this.props.match.path}/perfect-attendance-report`}
              render={() => (
                <div>
                  <DataCard title="Perfect Attendance Report">
                    <SchoolStylesContainer dispatchFetchParams={schoolId}>
                      <PerfectAttendanceByStyleByDateReportFormContainer
                        dispatchFetchParams={schoolId}
                      >
                        <PerfectAttendanceByStyleByDate
                          schoolId={schoolId}
                          sideNav
                        />
                      </PerfectAttendanceByStyleByDateReportFormContainer>
                    </SchoolStylesContainer>
                  </DataCard>
                  {this.props.perfectAttendanceByStyleByDateReport &&
                    this.props.perfectAttendanceByStyleByDateReport.payload && (
                      <PerfectAttendanceByStyleByDateDataGrid
                        data={this.props.perfectAttendanceByStyleByDateReport}
                      />
                    )}
                </div>
              )}
            />
            <Route
              path={`${
                this.props.match.path
              }/perfect-attendance-report/send-email`}
              render={() => <SendEmailTemplate />}
            />
            <Route
              path={`${
                this.props.match.path
              }/perfect-attendance-report/send-sms`}
              render={() => <SendSMSTemplate />}
            />
            <Route
              path={`${this.props.match.path}/student-enrollment`}
              render={() => (
                <DataCard title="Student Enrollment by Program">
                  <EnrollmentByProgramContainer dispatchFetchParams={schoolId}>
                    <EnrollmentByProgram sideNav />
                  </EnrollmentByProgramContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/new-student-enrollment`}
              render={() => (
                <DataCard title="New Student Enrollment by Program">
                  <NewEnrollmentByProgramContainer
                    dispatchFetchParams={schoolId}
                  >
                    <NewEnrollmentByProgram sideNav />
                  </NewEnrollmentByProgramContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/student-count`}
              render={() => (
                <DataCard title="Student Count">
                  <StudentCountContainer dispatchFetchParams={schoolId}>
                    <StudentCount sideNav />
                  </StudentCountContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/inquiry-source`}
              render={() => (
                <DataCard title="Leads/Prospects">
                  <InquiryBySourceContainer dispatchFetchParams={schoolId}>
                    <InquiryBySource sideNav />
                  </InquiryBySourceContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/student-location`}
              render={() => (
                <DataCard title="Student Location">
                  <StudentLocationContainer dispatchFetchParams={schoolId}>
                    <StudentLocation
                      schoolId={schoolId}
                      schoolProfile={this.props.schoolProfile}
                    />
                  </StudentLocationContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/birthday-report`}
              render={() => (
                <DataCard title="Students Dates of Birth Report">
                  <SchoolBirthdayContainer dispatchFetchParams={schoolId}>
                    <SchoolBirthdayDataGrid
                      data={this.props.schoolBirthdayReport.payload}
                      schoolId={schoolId}
                      sideNav
                    />
                  </SchoolBirthdayContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/soft-exit`}
              render={() => (
                <DataCard title="Soft Exit Report">
                  <SoftExitContainer dispatchFetchParams={schoolId}>
                    <SoftExitDataGrid
                      data={this.props.softExit.payload}
                      schoolId={schoolId}
                    />
                  </SoftExitContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/renewal`}
              render={() => (
                <DataCard title="Renewal Report">
                  <RenewalContainer dispatchFetchParams={schoolId}>
                    <RenewalDataGrid
                      data={this.props.renewal.payload}
                      schoolId={schoolId}
                    />
                  </RenewalContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/birthday-report/send-email`}
              render={() => <SendEmailTemplate />}
            />
            <Route
              path={`${this.props.match.path}/birthday-report/send-sms`}
              render={() => <SendSMSTemplate />}
            />
            <Route
              path={`${this.props.match.path}/billing-by-date`}
              render={() => (
                <DataCard title="Total Billed in Past Week">
                  <BillingByDateContainer dispatchFetchParams={schoolId}>
                    <BillingByDate sideNav />
                  </BillingByDateContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/declines-by-date`}
              render={() => (
                <DataCard title="Declined Payments in Past Week">
                  <DeclineByDateContainer dispatchFetchParams={schoolId}>
                    <DeclineByDate sideNav />
                  </DeclineByDateContainer>
                </DataCard>
              )}
            />

            <Route
              path={`${this.props.match.path}/deductions`}
              render={() => (
                <DataCard title="Financial Deductions Report">
                  <FinanceDeductionsReportContainer
                    dispatchFetchParams={schoolId}
                  >
                    <DeductionsDataGrid
                      data={
                        this.props.financeDeductions
                          ? this.props.financeDeductions
                          : []
                      }
                      sideNav
                    />
                  </FinanceDeductionsReportContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/disbursements`}
              render={() => (
                <DataCard title="Financial Disbursements Report">
                  <FinanceDisbursementsReportContainer
                    dispatchFetchParams={schoolId}
                  >
                    <DisbursementsDataGrid
                      data={
                        this.props.financeDisbursements
                          ? this.props.financeDisbursements
                          : []
                      }
                      sideNav
                    />
                  </FinanceDisbursementsReportContainer>
                </DataCard>
              )}
            />

            <Route
              path={`${this.props.match.path}/students-unpaid`}
              render={() => (
                <DataCard title="Unpaid Students Report">
                  <StudentUnpaidContainer dispatchFetchParams={schoolId}>
                    <StudentsUnpaid schoolId={schoolId} />
                  </StudentUnpaidContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/eom`}
              render={() => (
                <DataCard title="End of Month Report">
                  <div>
                    <EOMExcelContainer
                      schoolId={schoolId}
                      dispatchFetchParams={schoolId}
                    >
                      <ExportToExcel eomExcel={this.props.eomExcel} />
                    </EOMExcelContainer>
                  </div>
                  <EOMContainer
                    schoolId={schoolId}
                    dispatchFetchParams={schoolId}
                  >
                    {this.props.eom && this.props.eom.payload && (
                      <EndOfMonthGridDisplay eom={this.props.eom.payload} />
                    )}
                  </EOMContainer>
                </DataCard>
              )}
            />
            <Route
              path={`${this.props.match.path}/previous-eom`}
              render={() => (
                <div>
                  <DataCard title="Custom End of Month Report">
                    <EOMByMonthByYearReportFormContainer
                      schoolId={schoolId}
                      dispatchFetchParams={schoolId}
                    >
                      <EOMByMonthByYearForm schoolId={schoolId} />
                    </EOMByMonthByYearReportFormContainer>
                    {this.props.eomByMonthByYear &&
                      this.props.eomByMonthByYear.payload && (
                        <EndOfMonthGridDisplay
                          eom={this.props.eomByMonthByYear.payload}
                        />
                      )}
                  </DataCard>
                </div>
              )}
            />
          </PageBody>
        </Page>
      </Module>
    );
  }
}

function mapStateToProps(state) {
  return {
    attendanceByStyleByDateReport: state.report.attendanceByStyleByDateReport,
    perfectAttendanceByStyleByDateReport:
      state.report.perfectAttendanceByStyleByDateReport,
    schoolBirthdayReport: state.report.schoolBirthday,
    financeDeductions: state.report.financeDeductions,
    financeDisbursements: state.report.financeDisbursements,
    eom: state.report.eom,
    eomExcel: state.report.eomExcel,
    eomByMonthByYear: state.report.eomByMonthByYear,
    schoolProfile: state.school.profile,
    softExit: state.report.softExit,
    renewal: state.report.renewal,
  };
}
export default connect(
  ReportsModule,
  mapStateToProps
);
