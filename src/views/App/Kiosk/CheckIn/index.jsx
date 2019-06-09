import React from 'react';
import { Redirect } from 'react-router';
import connect from 'src/redux/connect';
import AvatarBlank from 'assets/images/avatar_blank.png';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

import { authenticateReset } from 'src/redux/actionCreators/kiosk/authenticate';
import { checkinReset } from 'src/redux/actionCreators/kiosk/checkin';

import AvailableClassesDataGrid from './AvailableClassesDataGrid';
import CurrentRankGrid from './CurrentRankGrid';
import MessageModal from './MessageModal';
import './styles.less';

type CheckInPageProps = {
  authenticate: any,
  checkin: any,
  dispatchFormPost: Function,
  dispatchAuthenticateReset: Function,
  dispatchCheckinReset: Function,
  timeZone: string,
  history: {
    push: Function,
  },
  kioskStudents: any,
};

class CheckInPage extends React.Component {
  props: CheckInPageProps;
  state = { userFirstName: ' ', userImage: '' };
  componentDidMount() {
    this.initTimer();

    this.props.kioskStudents.payload.map(item => {
      if (item.StudentId === this.props.authenticate.payload.StudentId) {
        this.setState({
          userFirstName: item.FirstName,
          userImage: item.PictureBlobUrl,
        });
      }
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.idleTimer);
  }

  initTimer() {
    this.idleTimer = window.setInterval(this.CheckIdleTime, 2000);

    this.lastActiveTime = new Date();
    window.onclick = () => {
      this.lastActiveTime = new Date();
    };
    window.onmousemove = () => {
      this.lastActiveTime = new Date();
    };
    window.onkeypress = () => {
      this.lastActiveTime = new Date();
    };
    window.onscroll = () => {
      this.lastActiveTime = new Date();
    };
  }

  CheckIdleTime = () => {
    let dateNowTime = new Date().getTime();
    let lastActiveTime = new Date(this.lastActiveTime).getTime();
    let remTime = Math.floor((dateNowTime - lastActiveTime) / 1000);

    if (remTime >= 10) {
      this.checkout();
    }
  };

  checkout = () => {
    this.props.dispatchAuthenticateReset();
    this.props.dispatchCheckinReset();
    this.props.history.push('/kiosk/authenticate');
  };

  render() {
    if (!this.props.authenticate.payload) {
      return <Redirect to={'/kiosk/authenticate'} />;
    }
    return (
      <Page className="CheckInPage" title="Welcome">
        <PageHeader>
          <PageTitle>Welcome, {this.state.userFirstName}!</PageTitle>

          <button
            className="KioskLogOutButton pt-button pt-intent-danger"
            onClick={this.checkout}
          >
            Log Out
          </button>
        </PageHeader>
        <PageBody>
          <div className="WelcomeMessage">
            <MessageModal messages={this.props.authenticate.payload.Messages} />
          </div>
          {this.props.authenticate.payload.StudentProgression.Progressions
            .length ? (
            <div>
              <CurrentRankGrid
                profilePicture={this.state.userImage || AvatarBlank}
                data={
                  this.props.authenticate.payload.StudentProgression
                    .Progressions
                }
              />
            </div>
          ) : (
            <NoDataMessage errorMessage="No Grading Summary Found" />
          )}
          {this.props.authenticate.payload.Classes.length ? (
            <AvailableClassesDataGrid
              data={this.props.authenticate.payload}
              dispatchFormPost={this.props.dispatchFormPost}
              dispatchAuthenticateReset={this.props.dispatchAuthenticateReset}
              dispatchCheckinReset={this.props.dispatchCheckinReset}
              timeZone={this.props.timeZone}
            />
          ) : (
            <NoDataMessage errorMessage="No Classes Found" />
          )}
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.kiosk.token,
    timeZone: state.kiosk.token.payload.TimeZone,
    authenticate: state.kiosk.authenticate,
    kioskStudents: state.kiosk.findByName,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchAuthenticateReset: () => {
      dispatch(authenticateReset());
    },
    dispatchCheckinReset: () => {
      dispatch(checkinReset());
    },
  };
};

export default connect(
  CheckInPage,
  mapStateToProps,
  mapDispatchToProps
);
