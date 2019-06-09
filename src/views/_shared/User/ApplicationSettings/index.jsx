import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import ProfileCard from 'components/ProfileCard';
import Modal from 'components/Modal';

import ReleaseNotes from './ReleaseNotes';
import './styles.less'

import {
  localRegion,
  localCurrencySymbol,
  localCurrencyName,
} from 'util/localization/localValues';

import { getEnvironmentVariables } from 'util/environment';

// import './styles.less';

type ApplicationSettingsPageProps = {};

class ApplicationSettingsPage extends React.Component {
  props: ApplicationSettingsPageProps;
  render() {
    return (
      <Page className="UserAccountPage" title="Application Settings">
        <Route
          path={`${this.props.match.path}/release-notes`}
          render={() => (
            <Modal title="Release Notes" closeUrl={this.props.match.url}>
              <ReleaseNotes />
            </Modal>
          )}
        />
        <PageHeader>
          <PageTitle>Application Settings</PageTitle>
        </PageHeader>
        <PageBody>
          <ProfileCard className="ApplicationSettingsCard">
            <h2>About</h2>
            <table className="default-table-plain">
              <tbody>
                <tr>
                  <td className="label">Version:</td>
                  <td className="value">
                    <Link to={`${this.props.match.url}/release-notes`}>
                      {getEnvironmentVariables().versionNumber}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <h2>Locale</h2>
            <table className="default-table-plain">
              <tbody>
                <tr>
                  <td className="label">Region:</td>
                  <td className="value">{localRegion()}</td>
                </tr>
                <tr>
                  <td className="label">Currency Symbol:</td>
                  <td className="value">{localCurrencySymbol()}</td>
                </tr>
                <tr>
                  <td className="label">Currency Name:</td>
                  <td className="value">{localCurrencyName()}</td>
                </tr>
              </tbody>
            </table>
          </ProfileCard>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  ApplicationSettingsPage,
  mapStateToProps
);
