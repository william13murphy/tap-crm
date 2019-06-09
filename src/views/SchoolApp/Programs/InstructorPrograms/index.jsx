import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import DataCard from 'components/DataCard';
import ButtonColumn from 'components/ButtonColumn';
import ProgramDetail from './ProgramDetail';

import SchoolInstructorStylesContainer from 'containers/School/SchoolInstructorStylesContainer';

type InstructorProgramsProps = {
  token: {
    payload: {
      UserId: string,
    },
  },
  match: {
    url: string,
  },
  instructorStyles: { payload: [] },
};

const InstructorPrograms = (props: InstructorProgramsProps) => {
  return (
    <Page className="InstructorProgramsPage" title="Programs">
      <PageHeader>
        <PageTitle>My Programs</PageTitle>
      </PageHeader>
      <PageBody>
        <SchoolInstructorStylesContainer
          dispatchFetchParams={props.token.payload.UserId}
        >
          <ButtonColumn className="SchoolProgramsList">
            {props.instructorStyles.payload &&
              props.instructorStyles.payload.map((style, i) => {
                return (
                  <Link
                    to={{
                      pathname: `${props.match.url}/detail/${style.m_Item1}`,
                      state: {
                        programName: style.m_Item2,
                      },
                    }}
                    className="SchoolProgram pt-button pt-intent-primary"
                    key={i}
                  >
                    {style.m_Item2}
                    <span className="pt-icon pt-icon-double-chevron-right pt-align-right" />
                  </Link>
                );
              })}
          </ButtonColumn>
        </SchoolInstructorStylesContainer>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    token: state.token,
    instructorStyles: state.school.instructorStyles,
  };
};

export default connect(
  InstructorPrograms,
  mapStateToProps
);
