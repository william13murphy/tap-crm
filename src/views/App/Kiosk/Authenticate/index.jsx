import React from 'react';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';

import KioskAnemicSchoolDetailContainer from 'containers/Kiosk/KioskAnemicSchoolDetailContainer';
import AuthenticateForm from './AuthenticateForm';
import AuthenticateFormContainer from 'containers/Kiosk/AuthenticateFormContainer';
import FindByNameContainer from 'containers/Kiosk/FindByNameContainer';
import './styles.less';

type CheckinModuleProps = {
  history: {
    push: Function,
  },
  token: {
    status: any,
  },
  anemicDetail: {
    payload: {
      Logo: any,
    },
  },
  authenticate: any,
};

class CheckinModule extends React.Component {
  props: CheckinModuleProps;
  constructor() {
    super();
  }

  render() {
    const logo =
      this.props.kioskAnemicSchoolDetail.payload &&
      this.props.kioskAnemicSchoolDetail.payload.Logo;
    return (
      <Page className="AuthenticatePage" title="Check In">
        <KioskAnemicSchoolDetailContainer
          dispatchFetchParams={this.props.token.payload.SchoolId}
        >
          {logo && <img src={logo} className="Logo" />}
        </KioskAnemicSchoolDetailContainer>
        <PageHeader>
          <PageTitle>Kiosk Checkin</PageTitle>
        </PageHeader>
        <PageBody>
          <div className="FormContainer">
            <FindByNameContainer
              dispatchFetchParams={this.props.token.payload.SchoolId}
            >
              <AuthenticateFormContainer redirectOnSuccess="/kiosk/checkin">
                <AuthenticateForm
                  history={this.props.history}
                  token={this.props.token}
                  schoolId={this.props.token.payload.SchoolId}
                  kioskStudents={this.props.kioskStudents}
                />
              </AuthenticateFormContainer>
            </FindByNameContainer>
          </div>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.kiosk.token,
    authenticate: state.kiosk.authenticate,
    kioskAnemicSchoolDetail: state.kiosk.anemicSchoolDetail,
    kioskStudents: state.kiosk.findByName,
  };
}

export default connect(
  CheckinModule,
  mapStateToProps
);
