import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Modal from 'components/Modal';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import ButtonColumn from 'components/ButtonColumn';
import FormChoice from 'components/FormChoice';
import ConfirmDialog from 'components/ConfirmDialog';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import SchoolStyleFormContainer from 'containers/School/SchoolStyleFormContainer';
import SchoolStyleDeleteContainer from 'containers/School/SchoolStyleDeleteContainer';
import ImportSchoolProgramsFormContainer from 'containers/School/ImportSchoolProgramsFormContainer';

import ProgramDetail from './ProgramDetail';
import AddSchoolStyleForm from './AddSchoolStyleForm';
import ProgramsGrid from './ProgramsGrid';
import './styles.less';
import ImportPrograms from './ImportPrograms';
import ImportProgramSampleCSV from './ImportProgramSampleCSV';

type SchoolProgramsPageProps = {
  schoolId: string,
  history: {},
  match: {
    path: string,
    url: string,
  },
  schoolStyles: {
    payload: [{}],
  },
  stylePost: {
    payload: [{}],
  },
};

const SchoolProgramsPage = (props: SchoolProgramsPageProps) => {
  return (
    <Page className="SchoolProgramsPage" title="Programs">
      <Route
        exact
        path={props.match.path}
        render={() => (
          <div className="SchoolPrograms">
            <PageHeader>
              <PageTitle>Programs</PageTitle>
              <div className="SchoolProgramsPage__container">
                <div className="SchoolProgramsPage__item">
                  <Link to={`${props.match.url}/add`}>
                    <button className="pt-button pt-intent-primary pt-icon-list">
                      <span className="SchoolProgramsPage__title">
                        Add New Program
                      </span>
                    </button>
                  </Link>
                </div>
                <div className="SchoolProgramsPage__item">
                  <Link to={`${props.match.url}/import`}>
                    <button className="pt-button pt-intent-primary pt-icon-import">
                      <span className="SchoolProgramsPage__title">
                        Import Programs
                      </span>
                    </button>
                  </Link>
                </div>
                <div className="SchoolProgramsPage__item">
                  <ImportProgramSampleCSV />
                </div>
              </div>
            </PageHeader>
            <PageBody>
              <SchoolStylesContainer dispatchFetchParams={props.schoolId}>
                {props.schoolStyles.payload &&
                props.schoolStyles.payload.length > 0 ? (
                  <ProgramsGrid
                    data={props.schoolStyles.payload}
                    schoolId={props.schoolId}
                    match={props.match}
                  />
                ) : (
                  <div>No Programs Found</div>
                )}
              </SchoolStylesContainer>
            </PageBody>
          </div>
        )}
      />

      <Route
        path={`${props.match.path}/detail/:styleId`}
        render={() => (
          <SchoolStylesContainer dispatchFetchParams={props.schoolId}>
            <ProgramDetail schoolId={props.schoolId} />
          </SchoolStylesContainer>
        )}
      />

      <Route
        exact
        path={`${props.match.path}/add`}
        render={() => {
          return (
            <Modal title="Add School Program" closeUrl={props.match.url}>
              <SchoolStyleFormContainer
                dispatchActionOnCloseParams={props.schoolId}
                redirectOnSuccess={`/app/school-app/${
                  props.schoolId
                  }/school-detail/programs/detail/${
                  props.stylePost.payload
                  }/program`}
              >
                <AddSchoolStyleForm id={props.schoolId} />
              </SchoolStyleFormContainer>
            </Modal>
          );
        }}
      />

      <Route
        exact
        path={`${props.match.path}/import`}
        render={() => {
          return (
            <Modal title="Import Program" closeUrl={props.match.url}>
              <ImportSchoolProgramsFormContainer
                dispatchActionOnCloseParams={props.schoolId}
                redirectOnSuccess={`/app/school-app/${
                  props.schoolId
                }/school-detail/programs`}
              >
                <ImportPrograms schoolId={props.schoolId} />
              </ImportSchoolProgramsFormContainer>
            </Modal>
          );
        }}
      />

      <Route
        path={`${props.match.path}/delete/:styleId`}
        render={innerProps => {
          return (
            <Modal title="Delete School Program" closeUrl={props.match.url}>
              <SchoolStyleDeleteContainer
                redirectOnSuccess={props.match.url}
                dispatchActionOnCloseParams={innerProps.match.params.schoolId}
              >
                <ConfirmDialog
                  title="Are you sure you want to delete?"
                  closeUrl={props.match.url}
                  id={innerProps.match.params.styleId}
                />
              </SchoolStyleDeleteContainer>
            </Modal>
          );
        }}
      />
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    schoolStyles: state.school.styles,
    stylePost: state.school.stylePost,
  };
};

export default connect(
  SchoolProgramsPage,
  mapStateToProps
);
