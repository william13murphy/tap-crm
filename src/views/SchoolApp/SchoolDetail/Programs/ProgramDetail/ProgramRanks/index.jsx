import React from 'react';
import Page from 'components/Layout/Page';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import SchoolStyleRanksContainer from 'containers/School/SchoolStyleRanksContainer';
import SchoolStyleRankFormContainer from 'containers/School/SchoolStyleRankFormContainer';
import Modal from 'components/Modal';
import AddSchoolStyleRankForm from './AddSchoolStyleRankForm';
import AddSkillForm from './AddSkillForm';
import BackButton from 'components/Buttons/BackButton';
import SchoolRankRequirementsContainer from 'containers/School/SchoolRankRequirementsContainer';
import ColorDisplay from 'components/ColorDisplay';
import ProgramDetailFormWrapper from '../ProgramDetailFormWrapper';
import AllBeltMasterContainer from 'containers/Utility/AllBeltMasterContainer';

import SchoolRankRequirementFormContainer from 'containers/School/SchoolRankRequirementFormContainer';

import AddSchoolStyleRankPage from './AddSchoolStyleRankPage';
import './styles.less';

type ProgramRankDetailProps = {
  schoolId: string,
  history: {},
  match: {
    params: {
      styleId: string,
    },
    path: string,
  },
  schoolContacts: {
    payload: {},
  },
  styleRanks: {
    payload: [],
  },
  schoolStyles: [{}],
};

function validateJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const ProgramRankDetail = (props: ProgramDetailPageProps) => {
  return (
    <Page className="ProgramRankDetailPage" title="Program Detail">
      <Route
        path={
          '/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rank/add-rank'
        }
        render={() => {
          return <AddSchoolStyleRankPage schoolId={props.schoolId} />;
        }}
      />

      <Route
        path="/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rank/edit-rank"
        render={routerProps => {
          const CLOSE_URL = `/app/school-app/${
            props.match.params.schoolId
          }/school-detail/programs/detail/${
            routerProps.match.params.styleId
          }/rank`;
          let initialValues = routerProps.location.state.initialValues;

          let parsedRule = validateJSON(initialValues.PromotionRule)
            ? JSON.parse(initialValues.PromotionRule)
            : [];
          let skills =
            parsedRule &&
            parsedRule.map(item => {
              return item.Id;
            });
          skills.splice(0, 2);

          return (
            <Modal title="Edit Program Rank" closeUrl={CLOSE_URL}>
              <AllBeltMasterContainer>
                <SchoolStyleRankFormContainer
                  dispatchActionOnCloseParams={routerProps.match.params.styleId}
                  redirectOnSuccess={CLOSE_URL}
                  initialValues={{
                    ...initialValues,
                    Skills: skills,
                  }}
                >
                  <AddSchoolStyleRankForm
                    schoolId={routerProps.match.params.schoolId}
                    styleId={routerProps.match.params.styleId}
                  />
                </SchoolStyleRankFormContainer>
              </AllBeltMasterContainer>
            </Modal>
          );
        }}
      />

      <Route
        exact
        path="/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rank/edit-rank/add-skill"
        render={routerProps => (
          <Modal title="Add Skill" closeUrl={props.match.url}>
            <SchoolRankRequirementFormContainer
              dispatchActionOnCloseParams={routerProps.match.params.schoolId}
              redirectOnSuccess={props.match.url}
            >
              <AddSkillForm schoolId={routerProps.match.params.schoolId} />
            </SchoolRankRequirementFormContainer>
          </Modal>
        )}
      />

      <Route
        exact
        path="/app/school-app/:schoolId/school-detail/programs/detail/:styleId/rank"
        render={() => {
          return (
            <div>
              <PageHeader>
                <PageTitle />
              </PageHeader>
              <PageBody>
                <ProgramDetailFormWrapper>
                  <SchoolStyleRanksContainer
                    dispatchFetchParams={props.match.params.styleId}
                  >
                    <SchoolRankRequirementsContainer
                      dispatchFetchParams={props.match.params.schoolId}
                    >
                      <div className="ProgramRankDetail">
                        <div className="AddNewRankWrapper pt-card">
                          <Link
                            to={`/app/school-app/${
                              props.match.params.schoolId
                            }/school-detail/programs/detail/${
                              props.match.params.styleId
                            }/rank/add-rank`}
                          >
                            <button className="pt-button pt-intent-primary pt-icon-double-chevron-up">
                              Add New Rank
                            </button>
                          </Link>
                        </div>
                        {props.styleRanks.payload &&
                          props.styleRanks.payload.length > 0 &&
                          props.styleRanks.payload
                            .sort(
                              (style1, style2) => style1.Order - style2.Order
                            )
                            .map((style, i) => {
                              let promotionRule = validateJSON(
                                style.PromotionRule
                              )
                                ? JSON.parse(style.PromotionRule)
                                : [];
                              let classes = promotionRule[0]
                                ? promotionRule[0].Value
                                : 0;
                              let weeks = promotionRule[1]
                                ? promotionRule[1].Value
                                : 0;
                              let initialValues = {
                                ...style,
                                Classes: classes,
                                Weeks: weeks,
                              };
                              return (
                                <div
                                  className="SchoolRank__card SchoolRank pt-card"
                                  key={i}
                                >
                                  <Link
                                    to={{
                                      pathname: `/app/school-app/${
                                        props.match.params.schoolId
                                      }/school-detail/programs/detail/${
                                        props.match.params.styleId
                                      }/rank/edit-rank`,
                                      state: { initialValues: initialValues },
                                    }}
                                    className="EditRank"
                                  >
                                    <button className="pt-button pt-intent-primary pt-icon-edit">
                                      Edit Rank
                                    </button>
                                  </Link>
                                  <table className="default-table-plain">
                                    <tbody>
                                      <tr>
                                        <td className="label">Name:</td>
                                        <td className="value">{style.Name}</td>
                                      </tr>
                                      <tr>
                                        <td className="label">Order:</td>
                                        <td className="value">{style.Order}</td>
                                      </tr>
                                      <tr>
                                        <td className="label">Belt Image:</td>
                                        <td className="value">
                                          {style.LogoBlobUrl && (
                                            <img
                                              className="BeltImage"
                                              src={style.LogoBlobUrl}
                                            />
                                          )}
                                        </td>
                                      </tr>
                                      {style.PromotionRule &&
                                      style.PromotionRule != null &&
                                      validateJSON(style.PromotionRule) &&
                                      JSON.parse(style.PromotionRule).length >
                                        0 ? (
                                        JSON.parse(style.PromotionRule).map(
                                          (cV, i) => {
                                            if (cV.Operator === 'equal') {
                                              return (
                                                <tr key={i}>
                                                  <td className="label">
                                                    Proficient in:
                                                  </td>
                                                  <td className="Proficient__skillvalue">
                                                    {cV.Color ? (
                                                      <ColorDisplay
                                                        small
                                                        color={cV.Color}
                                                      />
                                                    ) : (
                                                      ''
                                                    )}
                                                    {cV.Field ? cV.Field : ''}
                                                  </td>
                                                </tr>
                                              );
                                            } else {
                                              return (
                                                <tr key={i}>
                                                  <td className="label">
                                                    Required{' '}
                                                    {cV.Field ? cV.Field : ''}:
                                                  </td>
                                                  <td className="value">
                                                    {cV.Value}
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          }
                                        )
                                      ) : (
                                        <tr>
                                          <td className="label">Skills</td>
                                          <td className="value">
                                            <div className="pt-callout pt-intent-danger">
                                              <strong>Error</strong>: The Skills
                                              for this rank cannot be displayed.
                                              Please notify your administrator
                                              of an "Invalid Promotion Rule".
                                            </div>
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              );
                            })}
                      </div>
                    </SchoolRankRequirementsContainer>
                  </SchoolStyleRanksContainer>
                </ProgramDetailFormWrapper>
              </PageBody>
            </div>
          );
        }}
      />
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    schoolStyles: state.school.styles,
    styleRanks: state.school.styleRanks,
  };
};

export default connect(
  ProgramRankDetail,
  mapStateToProps
);
