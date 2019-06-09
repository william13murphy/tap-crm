import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import connect from 'src/redux/connect';

import Modal from 'components/Modal';
import BackButton from 'components/Buttons/BackButton';
import ConfirmDialog from 'components/ConfirmDialog';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import PercentBar from 'components/PercentBar';
import Check from 'components/Check';
import CheckBar from 'components/CheckBar';

import StudentRankRequirementsByStyleContainer from 'containers/Student/StudentRankRequirementsByStyleContainer';
import RankRequirementsDataGrid from '../RankRequirementsDataGrid';
import SchoolStyleRanksContainer from 'containers/School/SchoolStyleRanksContainer';
import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import StudentProgressionFormContainer from 'containers/Student/StudentProgressionFormContainer';
import StudentProgressionDeleteContainer from 'containers/Student/StudentProgressionDeleteContainer';
import AddStudentRankProgressionForm from '../AddStudentRankProgressionForm';

import StudentPromotionStatefulFormContainer from 'containers/Student/StudentPromotionStatefulFormContainer';
import SingleButtonForm from 'components/Forms/SingleButtonForm';
import SubmitButton from 'components/Forms/SubmitButton';

import _ from 'lodash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import styleVariables from 'styles/_variables';
import './styles.less';

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';

type ProgressionsGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  programName: string,
  UserId: string,
  references: {},
  studentId: string,
  schoolId: string,
  schoolStyleId: string,
  dispatchFormPost: string,
  styles: {
    payload: Array<{}>,
  },
  progressions: {
    payload: Array<{}>,
  },
  styleRanks: {
    payload: Array<{}>,
  },
};

class ProgressionsGrid extends React.Component {
  props: ProgressionsGridProps;

  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          Header: 'Program',
          accessor: 'StyleName',
        },
        {
          Header: 'Rank',
          accessor: 'RankName',
          sortable: true,
        },
        {
          Header: 'Promotion Date',
          accessor: 'EnrollmentDate',
          Cell: row => (
            <span className="date">
              {row.value && moment(row.value).format('YYYY-MM-DD')}
            </span>
          ),
        },
        {
          Header: 'Progress',
          accessor: 'PercentageCompleted',
          Cell: row => (
            <PercentBar
              percent={parseInt(row.original.PercentageCompleted) || 0}
              rainbow
            />
          ),
        },
        {
          Header: 'Classes',
          accessor: 'ClassesAttended',
          Cell: row => (
            <PercentBar
              percent={
                parseInt(
                  (row.original.ClassesAttended /
                    row.original.ClassesRequired) *
                    100
                ) || 0
              }
              label={`${row.original.ClassesAttended || 0}/${
                row.original.ClassesRequired
              }`}
              backgroundColor={styleVariables.blue3}
              center
            />
          ),
        },
        {
          Header: 'Weeks',
          accessor: 'WeeksAttended',
          Cell: row => (
            <PercentBar
              percent={
                parseInt(
                  (row.original.WeeksAttended / row.original.WeeksRequired) *
                    100
                ) || 0
              }
              label={`${row.original.WeeksAttended || 0}/${
                row.original.WeeksRequired
              }`}
              backgroundColor={styleVariables.forest2}
              center
            />
          ),
        },
        {
          Header: 'Skills',
          accessor: 'SkillsAttained',
          Cell: row => {
            let skillsToBeAttained = _.differenceWith(
              row.original.SkillsRequiredDetailList,
              row.original.SkillsAttainedDetailList,
              _.isEqual
            );
            return (
              <div className="Skill_Cell">
                {row.original.SkillsAttainedDetailList.map((element, i) => (
                  <CheckBar
                    key={i}
                    checkedColor={element.Value}
                    title={element.Key}
                    checked={1}
                    unchecked={0}
                  />
                ))}
                {skillsToBeAttained.map((element, index) => {
                  return (
                    <Check
                      key={index}
                      checkedColor={element.Value}
                      title={element.Key}
                    />
                  );
                })}
              </div>
            );
          },
        },
        {
          Header: 'Actions',
          accessor: 'Actions',
          Cell: row => {
            const ProgressionOrder = row.original.Order;
            let StyleRanksData = this.props.data.payload;
            let OrderValue;

            for (let i = StyleRanksData.length - 1; i >= 0; i--) {
              if (StyleRanksData[i].EnrollmentDate != null) {
                OrderValue = StyleRanksData[i].Order;
                break;
              }
            }
            return (
              <div className="Action__cell">
                {OrderValue === ProgressionOrder ? (
                  <div className="Action__cell_items">
                    <div>
                      <StudentPromotionStatefulFormContainer
                        dispatchActionOnSuccessParams={{
                          studentId: props.studentId,
                          schoolId: props.schoolId,
                          schoolStyleId: EMPTY_GUID,
                        }}
                      >
                        <SingleButtonForm
                          title="Promote"
                          formData={{
                            Id: row.original.ProgressionId,
                            StudentId: this.props.studentId,
                            SchoolStyleId: EMPTY_GUID,
                            StyleRankId: row.original.RankId,
                            EnrollmentDate: moment
                              .utc()
                              .startOf('day')
                              .format(),
                            CreatedBy: this.props.UserId,
                            ProgressionDate: moment
                              .utc()
                              .startOf('day')
                              .format(),
                          }}
                        />
                      </StudentPromotionStatefulFormContainer>
                    </div>
                    <div>
                      <Link
                        to={{
                          pathname: `${this.props.match.url}/rank-requirements`,
                          state: { initialValues: row.original },
                        }}
                      >
                        <button className="pt-button pt-intent-primary">
                          Skills
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          },
          width: 200,
        },
      ],
      data: [],
      defaultHeaderSortValue: true,
    };
  }

  componentDidMount() {
    let set = false;
    if (this.props.data.payload) {
      let promoteCount = this.props.data.payload.length;
      let data = this.props.data.payload.map((item, index) => {
        if (promoteCount !== index + 1) {
          if (!item.ProgressionDate && !set) {
            set = true;
            return {
              ...item,
              Promote: set,
            };
          }
        }
        return item;
      });

      this.setState({
        data,
      });
    }
  }

  toggleHeaderSort = () => {
    this.setState({
      defaultHeaderSortValue: !this.state.defaultHeaderSortValue,
    });
  };

  handlePdfExport = e => {
    e.preventDefault();
    html2canvas(document.querySelector('#studentProgressionsPrintable')).then(
      canvas => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        const pageHeight = (contentWidth / 592.28) * 841.89;

        const leftHeight = contentHeight;
        //Page offset
        const position = 0;
        //a4 paper size [595.28, 841.89], html page generated canvas in pdf picture width
        const imgWidth = 445.28;
        const imgHeight = (592.28 / contentWidth) * contentHeight;
        const imgData = canvas.toDataURL('image/jpg');
        const pdf = new jsPDF('p', 'px', 'a4');
        pdf.addImage(imgData, 'JPG', 5, 5, imgWidth, imgHeight);
        pdf.save('StudentGrading.pdf');
      }
    );
  };

  render() {
    if (this.state.data && this.state.data.length === 0) {
      return (
        <div className="ProgressionsGrid">
          <h4>No Rank Progressions Found</h4>
        </div>
      );
    }

    return (
      <Page className="ProgressionsGrid" title="Progressions">
        <Route
          path={`${this.props.match.path}/rank-requirements`}
          render={routerProps => {
            let initialValues = routerProps.location.state.initialValues;
            let studentDetail =
              this.props.studentDetail && this.props.studentDetail.payload;
            return (
              <Modal
                title={`Rank Requirements for ${
                  studentDetail.User.Profile.FirstName
                }
            ${studentDetail.User.Profile.LastName}`}
                closeUrl={`/app/school-app/${
                  this.props.schoolId
                }/students/detail/${this.props.studentId}/grading/${
                  this.props.schoolStyleId
                }`}
              >
                <StudentRankRequirementsByStyleContainer
                  dispatchFetchParams={{
                    StudentId: this.props.studentId,
                    SchoolStyleId: this.props.schoolStyleId,
                    StyleRankId: initialValues.RankId,
                  }}
                >
                  <RankRequirementsDataGrid
                    classId={this.props.classId}
                    data={this.props.rankRequirementsByStyle.payload}
                    schoolId={this.props.schoolId}
                  />
                </StudentRankRequirementsByStyleContainer>
              </Modal>
            );
          }}
        />
        <Route
          path={`/app/school-app/:schoolId/students/detail/${
            this.props.studentId
          }/grading/:schoolStyleId/add`}
          render={innerProps => (
            <Modal
              title="Add Student Progression"
              closeUrl={`/app/school-app/${
                this.props.schoolId
              }/students/detail/${this.props.studentId}/grading/${
                this.props.schoolStyleId
              }`}
            >
              <SchoolStyleRanksContainer
                dispatchFetchParams={this.props.schoolStyleId}
              >
                <StudentProgressionFormContainer
                  initialValues={innerProps.location.state.initialValues}
                  dispatchActionOnCloseParams={{
                    studentId: this.props.studentId,
                    schoolStyleId: this.props.schoolStyleId,
                    schoolId: this.props.schoolId,
                  }}
                  redirectOnSuccess={`/app/school-app/${
                    this.props.schoolId
                  }/students/detail/${this.props.studentId}/grading/${
                    this.props.schoolStyleId
                  }`}
                >
                  <AddStudentRankProgressionForm
                    studentId={this.props.studentId}
                  />
                </StudentProgressionFormContainer>
              </SchoolStyleRanksContainer>
            </Modal>
          )}
        />
        <Route
          path={`/app/school-app/:schoolId/students/detail/${
            this.props.studentId
          }/grading/:schoolStyleId/edit`}
          render={innerProps => (
            <Modal
              title="Edit Student Rank Progression"
              closeUrl={`/app/school-app/${
                this.props.schoolId
              }/students/detail/${this.props.studentId}/grading/${
                this.props.schoolStyleId
              }`}
            >
              <SchoolStyleRanksContainer
                dispatchFetchParams={this.props.schoolStyleId}
              >
                <StudentProgressionFormContainer
                  update={true}
                  initialValues={innerProps.location.state.initialValues}
                  dispatchActionOnCloseParams={{
                    studentId: this.props.studentId,
                    schoolStyleId: this.props.schoolStyleId,
                    schoolId: this.props.schoolId,
                  }}
                  redirectOnSuccess={`/app/school-app/${
                    this.props.schoolId
                  }/students/detail/${this.props.studentId}/grading/${
                    this.props.schoolStyleId
                  }`}
                >
                  <AddStudentRankProgressionForm
                    studentId={this.props.studentId}
                  />
                </StudentProgressionFormContainer>
              </SchoolStyleRanksContainer>
            </Modal>
          )}
        />
        <Route
          path={`/app/school-app/:schoolId/students/detail/${
            this.props.studentId
          }/grading/:progressionId/delete`}
          render={innerProps => (
            <Modal
              title="Delete Student Rank Progression"
              closeUrl={`/app/school-app/${
                this.props.schoolId
              }/students/detail/${this.props.studentId}/grading/${
                this.props.schoolStyleId
              }`}
            >
              <StudentProgressionDeleteContainer
                dispatchActionOnCloseParams={{
                  studentId: this.props.studentId,
                  schoolStyleId: this.props.schoolStyleId,
                  schoolId: this.props.schoolId,
                }}
                redirectOnSuccess={`/app/school-app/${
                  this.props.schoolId
                }/students/detail/${this.props.studentId}/grading/${
                  this.props.schoolStyleId
                }`}
              >
                <ConfirmDialog
                  title="Are you sure you want to delete?"
                  closeUrl={`/app/school-app/${
                    this.props.schoolId
                  }/students/detail/${this.props.studentId}/grading/${
                    this.props.schoolStyleId
                  }`}
                  id={
                    innerProps.location.state.initialValues &&
                    innerProps.location.state.initialValues.Id
                  }
                />
              </StudentProgressionDeleteContainer>
            </Modal>
          )}
        />
        <PageHeader>
          <PageTitle inline> Grading Summary </PageTitle>
          <Link
            to={`/app/school-app/${this.props.schoolId}/students/detail/${
              this.props.studentId
            }/summary`}
          >
            <BackButton>Back</BackButton>
          </Link>
          &nbsp;&nbsp;
          <SubmitButton
            className="pt-icon-export"
            size="small"
            intent="primary"
          >
            {' '}
            <a onClick={this.handlePdfExport} href="#">
              <span style={{ marginLeft: '8px' }} /> Export as PDF
            </a>
          </SubmitButton>
          {/* <PrivateRoute
            allow={roles.LEVEL_SCHADMIN}
            component={() => (
              <Link
                to={{
                  pathname: `/app/school-app/${this.props.schoolId}/students/detail/${
                    this.props.studentId
                  }/grading/${this.props.schoolStyleId}/add`,
                  state: {
                    initialValues: { SchoolStyleId: this.props.schoolStyleId },
                  },
                }}
              >
                <button className="pt-button pt-intent-primary">
                  Add New Progression
                </button>
              </Link>
            )}
          /> */}
        </PageHeader>
        <PageBody>
          <div id="studentProgressionsPrintable">
            <DynamicHeightReactTable
              pageSize={this.state.data.length}
              className="linked-row"
              data={this.state.data}
              columns={this.state.columns}
              getTdProps={(state, rowInfo, column, instance) => ({
                onClick: () => {
                  if (column.id !== 'Actions') {
                    this.props.history.push(
                      `/app/school-app/${
                        this.props.schoolId
                      }/dashboard/school-overview`
                    );
                  }
                },
              })}
              onSortedChange={this.toggleHeaderSort}
              sorted={[
                {
                  id: 'PercentageCompleted',
                  desc: this.state.defaultHeaderSortValue,
                },
              ]}
            />
          </div>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
    styles: state.school.styles,
    styleRanks: state.school.styleRanks,
    progressions: state.student.progressions,
    UserId: state.token.payload.UserId,
    rankRequirementsByStyle: state.student.rankRequirementsByStyle,
    studentDetail: state.student.detail,
  };
};

export default connect(
  ProgressionsGrid,
  mapStateToProps
);
