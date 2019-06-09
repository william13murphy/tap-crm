import React from 'react';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import DataCard from 'components/DataCard';
import BackButton from 'components/Buttons/BackButton';
import Modal from 'components/Modal';
import CheckIntoClassForm from './CheckIntoClassForm';
import './styles.less';

type ClassDetailModuleProps = {};

const tempStudentProfile = {
  User: {
    Profile: {
      // PictureHeader: string,
      // Picture: string,
      Prefix: 'Ms.',
      FirstName: 'Vanessa',
      LastName: 'Dai',
      Suffix: '',
      PrefferedName: 'Cat Mommy',
    },
    PhoneNumber: '(301) 555-5555',
    Email: 'vdai@kittycats4lyfe.com',
    Rank: 'Blue',
  },
};

const ClassDetailModule = (props: ClassDetailModuleProps) => {
  return (
    <Page className="ClassDetailPage" title="Class Detail">
      <PageHeader>
        <PageTitle paddingNone inline>
          Intermediate Karate
        </PageTitle>
        <Link to="/app/dashboard">
          <BackButton>Back to Dashboard</BackButton>
        </Link>
      </PageHeader>
      <div>
        <DataCard title="Class Details">
          <h4>
            <strong>Start:</strong>{' '}
            {new moment()
              .startOf('day')
              .add(12, 'hours')
              .calendar()}
          </h4>
          <h4>
            <strong>End:</strong>{' '}
            {new moment()
              .startOf('day')
              .add(13.5, 'hours')
              .calendar()}
          </h4>
          <h4>
            <strong>Teacher:</strong> Grandmaster Dai
          </h4>
          <h4>
            <strong>Program:</strong> Karate
          </h4>
          <h4>
            <strong>12</strong> Students Attending
          </h4>

          <CheckIntoClassForm />
        </DataCard>
      </div>
    </Page>
  );
};

const mapStateToProps = function(state) {
  return {
    token: state.token,
  };
};

export default connect(ClassDetailModule, mapStateToProps);
