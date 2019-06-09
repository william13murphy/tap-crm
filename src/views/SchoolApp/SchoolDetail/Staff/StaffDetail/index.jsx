import React from 'react';
import connect from 'src/redux/connect';
import SchoolStaffProfileCard from 'components/ProfileCard/SchoolStaffProfileCard';
import SchoolContactContainer from 'containers/School/SchoolContactContainer';
import SchoolInstructorStylesContainer from 'containers/School/SchoolInstructorStylesContainer';
import { Link } from 'react-router-dom';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import BackButton from 'components/Buttons/BackButton';
import DataCard from 'components/DataCard';
import StaffStylesGrid from '../StaffStylesGrid';
import './styles.less';

type StaffDetailPageProps = {
  match: {
    params: {
      id: string,
      schoolId: string,
    },
  },
};

const StaffDetailPage = (props: StaffDetailPageProps) => {
  const schoolId = props.match.params.schoolId;
  return (
    <Page className="StaffDetailPage" title="Staff Detail">
      <PageHeader>
        <PageTitle inline>Staff Profile</PageTitle>
        <Link to={`/app/school-app/${schoolId}/school-detail/staff`}>
          <BackButton>All Staff</BackButton>
        </Link>
      </PageHeader>
      <SchoolContactContainer dispatchFetchParams={props.match.params.staffId}>
        <SchoolStaffProfileCard />

        <SchoolInstructorStylesContainer
          dispatchFetchParams={
            props.contact &&
            props.contact.payload &&
            props.contact.payload.UserId
          }
        >
          {props.instructorStyles &&
            props.instructorStyles.payload &&
            props.instructorStyles.payload.length > 0 && (
              <DataCard
                className="InstructorStyles"
                title="Instructor Programs"
              >
                <StaffStylesGrid
                  data={
                    props.instructorStyles && props.instructorStyles.payload
                  }
                  schoolId={props.match.params.schoolId}
                  history={props.history}
                />
              </DataCard>
            )}
        </SchoolInstructorStylesContainer>
      </SchoolContactContainer>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    efcUsers: state.administration.efcUsers,
    instructorStyles: state.school.instructorStyles,
    contact: state.school.contact,
  };
};

export default connect(
  StaffDetailPage,
  mapStateToProps
);
