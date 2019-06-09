import React from 'react';
import { Route, Link } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import BackButton from 'components/Buttons/BackButton';
import PageBody from 'components/Layout/PageBody';

import Modal from 'components/Modal';

import SchoolStyleRankFormContainer from 'containers/School/SchoolStyleRankFormContainer';
import AddSchoolStyleRankForm from './AddSchoolStyleRankForm';
import AllBeltMasterContainer from 'containers/Utility/AllBeltMasterContainer';
import FormWrapper from 'components/Layout/FormWrapper';

import AddSkillForm from './AddSkillForm';
import SchoolRankRequirementFormContainer from 'containers/School/SchoolRankRequirementFormContainer';
import SchoolRankRequirementsContainer from 'containers/School/SchoolRankRequirementsContainer';

type AddSchoolStyleRankPageProps = {
  token: {
    payload: {
      UserId: string,
    },
  },
  match: { params: { schoolId: string, styleId: string } },
  rankRequirements: {
    payload: {
      Id: string,
    },
  },
};

class AddSchoolStyleRankPage extends React.Component {
  props: AddSchoolStyleRankPageProps;
  render() {
    const schoolId = this.props.match.params.schoolId;
    return (
      <Page className="AddSchoolStyleRankPage" title="Add Student">
        <PageHeader>
          <PageTitle inline>Add New Program Rank</PageTitle>
          <div>
            <Link
              to={`/app/school-app/${
                this.props.match.params.schoolId
              }/school-detail/programs/detail/${
                this.props.match.params.styleId
              }/rank`}
            >
              <BackButton>Back to All Program Ranks</BackButton>
            </Link>
          </div>
        </PageHeader>
        <PageBody center>
          <FormWrapper>
            <AllBeltMasterContainer>
              <SchoolStyleRankFormContainer
                dispatchActionOnCloseParams={this.props.match.params.styleId}
                redirectOnSuccess={`/app/school-app/${
                  this.props.match.params.schoolId
                }/school-detail/programs/detail/${
                  this.props.match.params.styleId
                }/rank`}
              >
                <AddSchoolStyleRankForm
                  schoolId={this.props.match.params.schoolId}
                  styleId={this.props.match.params.styleId}
                />
              </SchoolStyleRankFormContainer>
            </AllBeltMasterContainer>
            <Route
              exact
              path={`${this.props.match.path}/add-skill`}
              render={() => (
                <Modal title="Add Skill" closeUrl={this.props.match.url}>
                  <SchoolRankRequirementFormContainer
                    dispatchActionOnClose
                    dispatchActionOnCloseParams={schoolId}
                    redirectOnSuccess={this.props.match.url}
                  >
                    <AddSkillForm schoolId={schoolId} />
                  </SchoolRankRequirementFormContainer>
                </Modal>
              )}
            />
          </FormWrapper>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    rankRequirements: state.school.rankRequirements,
  };
};

export default connect(
  AddSchoolStyleRankPage,
  mapStateToProps
);
