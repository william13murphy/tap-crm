import React from 'react';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import FormWrapper from 'components/Layout/FormWrapper';
import BackButton from 'components/Buttons/BackButton';
import SkuFormContainer from 'containers/PointOfSale/SkuFormContainer';
import SchoolRankRequirementsContainer from 'containers/School/SchoolRankRequirementsContainer';
import SchoolRankRequirementFormContainer from 'containers/School/SchoolRankRequirementFormContainer';
import SchoolRankRequirementDeleteContainer from 'containers/School/SchoolRankRequirementDeleteContainer';
import SkillsGrid from './SkillsGrid';

import ConfirmDialog from 'components/ConfirmDialog';
import AddSkillForm from './AddSkillForm';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';

type SkillsProps = {
  match: {
    url: string,
    path: string,
    params: {
      schoolId: string,
    },
  },
  rankRequirements: {
    payload: {
      Id: string,
    },
  },
  schoolId: string,
};

const Skills = (props: SkillsProps) => (
  <Page className="SkillsPage" title="Skills">
    <Route
      exact
      path={`${props.match.path}/add`}
      render={() => {
        return (
          <Modal title="Add Skill" closeUrl={props.match.url}>
            <SchoolRankRequirementFormContainer
              dispatchActionOnCloseParams={props.schoolId}
              redirectOnSuccess={props.match.url}
            >
              <AddSkillForm schoolId={props.schoolId} />
            </SchoolRankRequirementFormContainer>
          </Modal>
        );
      }}
    />
    <div>
      <PageHeader>
        <PageTitle inline>Skills</PageTitle>
        <Link to={`${props.match.url}/add`}>
          <button className="pt-button pt-intent-primary pt-icon-series-add">
            Add New Skill
          </button>
        </Link>
      </PageHeader>
      <PageBody>
        <SchoolRankRequirementsContainer dispatchFetchParams={props.schoolId}>
          {props.rankRequirements &&
          props.rankRequirements.payload &&
          props.rankRequirements.payload.length > 0 ? (
            <SkillsGrid
              data={props.rankRequirements.payload}
              schoolId={props.schoolId}
              match={props.match}
            />
          ) : (
            <div>No Skills Found</div>
          )}
        </SchoolRankRequirementsContainer>
      </PageBody>
    </div>
    <Route
      path={`${props.match.path}/:SkillsId/edit`}
      render={innerProps => {
        return (
          <Modal title="Edit Skill" closeUrl={props.match.url}>
            <SchoolRankRequirementFormContainer
              update
              initialValues={innerProps.location.state.initialValues}
              redirectOnSuccess={props.match.url}
              dispatchActionOnCloseParams={props.schoolId}
            >
              <AddSkillForm schoolId={props.schoolId} />
            </SchoolRankRequirementFormContainer>
          </Modal>
        );
      }}
    />
    <Route
      path={`${props.match.path}/:SkillsId/delete`}
      render={innerProps => {
        return (
          <Modal title="Delete Skill" closeUrl={props.match.url}>
            <SchoolRankRequirementDeleteContainer
              redirectOnSuccess={props.match.url}
              dispatchActionOnCloseParams={props.schoolId}
            >
              <ConfirmDialog
                title="Are you sure you want to delete?"
                closeUrl={`/app/school-app/${
                  props.schoolId
                }/school-detail/skills`}
                id={innerProps.match.params.SkillsId}
              />
            </SchoolRankRequirementDeleteContainer>
          </Modal>
        );
      }}
    />
  </Page>
);

const mapStateToProps = state => {
  return {
    rankRequirements: state.school.rankRequirements,
  };
};

export default connect(
  Skills,
  mapStateToProps
);
