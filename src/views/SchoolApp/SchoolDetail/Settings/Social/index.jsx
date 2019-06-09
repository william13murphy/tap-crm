import React from 'react';
import connect from 'src/redux/connect';
import { Link, Route } from 'react-router-dom';

import Modal from 'components/Modal';
import EditSchoolSocialForm from './EditSchoolSocialForm';
import UpdateSchoolProfileFormContainer from 'containers/School/UpdateSchoolProfileFormContainer';

type SchoolMediaProps = {
  schoolId: string,
  schoolProfile: {
    payload: {},
  },
  match: {
    path: string,
    url: string,
  },
};

const SchoolMedia = (props: SchoolMediaProps) => {
  return (
    <div className="SchoolMedia">
      <div>
        {props.schoolProfile.payload && (
          <div>
            <Route
              path={`${props.match.path}/edit`}
              render={() => {
                return (
                  <Modal
                    title="Edit Third Party Accounts"
                    closeUrl={props.match.url}
                  >
                    <UpdateSchoolProfileFormContainer
                      dispatchActionOnCloseParams={props.schoolId}
                      redirectOnSuccess={props.match.url}
                    >
                      <EditSchoolSocialForm
                        schoolId={props.schoolId}
                        initialValues={props.schoolProfile.payload}
                      />
                    </UpdateSchoolProfileFormContainer>
                  </Modal>
                );
              }}
            />
            <Link to={`${props.match.url}/edit`}>
              <button className="pt-button">
                <span className="Icon IconEdit fa fa-pencil" />
                &nbsp;Edit Account
              </button>
            </Link>
            <table className="default-table-plain">
              <tbody>
                <tr>
                  <td className="label">Active Campaign Key:</td>
                  <td className="value">
                    {props.schoolProfile.payload.ActiveCampaignKey}
                  </td>
                  <td className="label">Twilio Key:</td>
                  <td className="value">
                    {props.schoolProfile.payload.TwilioKey}
                  </td>
                </tr>
                <tr>
                  <td className="label">Active Campaign Secret:</td>
                  <td className="value">
                    {props.schoolProfile.payload.ActiveCampaignSecret}
                  </td>

                  <td className="label">Twilio Other:</td>
                  <td className="value">
                    {props.schoolProfile.payload.TwilioOther}
                  </td>
                </tr>
                <tr>
                  <td className="label">Active Campaign Url:</td>
                  <td className="value">
                    {props.schoolProfile.payload.ActiveCampaignUrl}
                  </td>

                  <td className="label">Twilio User:</td>
                  <td className="value">
                    {props.schoolProfile.payload.TwilioUser}
                  </td>
                </tr>
                <tr>
                  <td className="label">Active Campaign User:</td>
                  <td className="value">
                    {props.schoolProfile.payload.ActiveCampaignUser}
                  </td>
                  <td className="label">Twitter Key:</td>
                  <td className="value">
                    {props.schoolProfile.payload.TwitterKey}
                  </td>
                </tr>
                <tr>
                  <td className="label">Mind Me Key:</td>
                  <td className="value">
                    {props.schoolProfile.payload.MindMeKey}
                  </td>
                  <td className="label">Twitter Other:</td>
                  <td className="value">
                    {props.schoolProfile.payload.TwitterOther}
                  </td>
                </tr>
                <tr>
                  <td className="label">Mind Me Secret:</td>
                  <td className="value">
                    {props.schoolProfile.payload.MindMeSecret}
                  </td>
                  <td className="label">Twitter User:</td>
                  <td className="value">
                    {props.schoolProfile.payload.TwitterUser}
                  </td>
                </tr>
                <tr>
                  <td className="label">Mind Me Url:</td>
                  <td className="value">
                    {props.schoolProfile.payload.MindMeUrl}
                  </td>

                  <td className="label">Facebook Key:</td>
                  <td className="value">
                    {props.schoolProfile.payload.FacebookKey}
                  </td>
                </tr>
                <tr>
                  <td className="label">Mind Me User:</td>
                  <td className="value">
                    {props.schoolProfile.payload.MindMeUser}
                  </td>
                  <td className="label">Facebook User:</td>
                  <td className="value">
                    {props.schoolProfile.payload.FacebookUser}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(
  SchoolMedia,
  mapStateToProps
);
