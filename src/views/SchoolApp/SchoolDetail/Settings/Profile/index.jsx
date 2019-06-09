import SchoolLogoBlank from 'assets/images/school_logo_blank.png';
import PrivateComponent from 'components/Auth/PrivateComponent';
import PrivateRoute from 'components/Auth/PrivateRoute';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import Modal from 'components/Modal';
import SchoolClientContainer from 'containers/School/SchoolClientContainer';
import UpdateSchoolProfileFormContainer from 'containers/School/UpdateSchoolProfileFormContainer';
import moment from 'moment';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import { roles } from 'util/auth/roles';
import AddSchoolForm from 'views/EFCApp/AllSchools/AddSchool/AddSchoolForm';
import EditSchoolPictureForm from './EditSchoolPicture';
import EditSchoolProfileForm from './EditSchoolProfile';
import './styles.less';
import { MenuDivider } from '@blueprintjs/core';
import Toggle from 'react-toggle'







type SchoolProfileProps = {
  schoolId: string,

  schoolProfile: {
    payload: {},
  },
  schoolClient: {
    payload: {},
  },
  role: string,
  match: {
    path: string,
    url: string,
  },
};


class MonitorSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: localStorage.getItem('monitoringOn') || false
    }
  }

  handleCheckboxChange = (e, value) => {
    const isMonitoringOn = e.currentTarget.checked;
    if(isMonitoringOn) {
      this.setState({
        isOn: true
      }, () => {
        localStorage.setItem('monitoringOn', true);
        window.location.reload();
      })

    } else {
      this.setState({
        isOn: false,
      }, () => {
        localStorage.removeItem('monitoringOn');   
        window.location.reload();     
      })
    }
  }

  render() {
    return (
      <div style={{textAlign: 'center', marginTop: '12px'}}>
        <label>
          <Toggle checked={this.state.isOn} onChange={this.handleCheckboxChange} />
          <h3 className='label-text'>{`Remote Monitoring is ${this.state.isOn ? 'ON' : 'OFF'}`}</h3>
        </label>
      </div>
    )
  }

}

const SchoolProfile = (props: SchoolProfileProps) => {
  let Logo = SchoolLogoBlank;
  let TaxRate = 0;

  if (props.schoolProfile.payload && props.schoolProfile.payload.LogoBlobUrl) {
    Logo = props.schoolProfile.payload.LogoBlobUrl;
  }

  const isMonitoringOn = localStorage.getItem('monitoringOn') || false;

  return (
    <div className="SchoolProfile">
      <Route
        path={`${props.match.path}/edit`}
        render={() => {
          return (
            <Modal title="Edit School Settings" closeUrl={props.match.url}>
              <UpdateSchoolProfileFormContainer
                dispatchActionOnCloseParams={props.schoolId}
                redirectOnSuccess={props.match.url}
              >
                <AddSchoolForm initialValues={props.schoolProfile.payload} />
              </UpdateSchoolProfileFormContainer>
            </Modal>
          );
        }}
      />
      <Route
        path={`${props.match.path}/edit-picture`}
        render={() => (
          <Modal title="Edit School Picture" closeUrl={props.match.url}>
            <UpdateSchoolProfileFormContainer
              dispatchActionOnCloseParams={props.schoolId}
              redirectOnSuccess={props.match.url}
            >
              <EditSchoolPictureForm
                initialValues={props.schoolProfile.payload}
              />
            </UpdateSchoolProfileFormContainer>
          </Modal>
        )}
      />
      <Route
        path={`${props.match.url}/edit-profile`}
        render={() => (
          <PrivateComponent allow={roles.LEVEL_SCHADMIN}>
            <Modal title="Edit School Profile" closeUrl={props.match.url}>
              <UpdateSchoolProfileFormContainer
                dispatchActionOnCloseParams={props.schoolId}
                redirectOnSuccess={props.match.url}
              >
                <EditSchoolProfileForm
                  schoolId={props.schoolId}
                  initialValues={props.schoolProfile.payload}
                />
              </UpdateSchoolProfileFormContainer>
            </Modal>
          </PrivateComponent>
        )}
      />
      {props.schoolProfile.payload && (
        <div className="SchoolProfileCard">
          <div className="one-third-two-third">
            <div className="one-third">
              <div className="ProfileCard__picture__container">
                <img className="ProfileCard__picture" src={Logo} />
                <Link to={`${props.match.url}/edit-picture`}>
                  <button className="ProfileCard__picture__edit pt-button pt-icon-style" />
                </Link>
              </div>
            </div>
            <div className="two-third">
              <div className="Edit__profile">
                <Link
                  to={`${props.match.url}/edit-profile`}
                  className="Edit__profile pt-button pt-icon-edit"
                >
                  Edit Profile
                </Link>
              </div>
              <table className="default-table-shaded">
                <tbody>
                  <SchoolClientContainer
                    dispatchFetchParams={props.schoolId}
                    options={{ spinner: false }}
                  >
                    <PrivateRoute
                      allow={roles.SUBSET_EFC_STAFF}
                      component={() => (
                        <tr>
                          <td className="label">Owner:</td>
                          <td className="value">
                            <Link
                              to={`/app/clients/detail/${
                                props.schoolClient.payload.Id
                              }/summary`}
                            >
                              {props.schoolProfile.payload &&
                                props.schoolProfile.payload.Name}
                            </Link>
                          </td>
                        </tr>
                      )}
                    />
                    <PrivateRoute
                      allow={roles.SUBSET_SCHOOL_STAFF}
                      component={() => (
                        <tr>
                          <td className="label">Owner:</td>
                          <td className="value">
                            {props.schoolProfile.payload &&
                              props.schoolProfile.payload.Name}
                          </td>
                        </tr>
                      )}
                    />
                  </SchoolClientContainer>
                  <tr>
                    <td className="label">Primary Phone:</td>
                    <td className="value">
                      {props.schoolProfile.payload.PrimaryPhone}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Secondary Phone:</td>
                    <td className="value">
                      {props.schoolProfile.payload.SecondaryPhone}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Email:</td>
                    <td className="value">
                      {props.schoolProfile.payload.Email}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Fax:</td>
                    <td className="value">{props.schoolProfile.payload.Fax}</td>
                  </tr>
                  <tr>
                    <td className="label">Website:</td>
                    <td className="value">
                      {props.schoolProfile.payload.Website}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Country:</td>
                    <td className="value">
                      <ReferenceOutput
                        id={props.schoolProfile.payload.CountryId}
                        listName="LstCountries"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Created On:</td>
                    <td className="value">
                      {moment(props.schoolProfile.payload.CreatedOn).format(
                        'MMMM D, YYYY'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Disbursement Frequency:</td>
                    <td className="value">
                      <ReferenceOutput
                        id={props.schoolProfile.payload.DisbursmentFrequencyId}
                        listName="LstFrequencyTypes"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Tax Rate:</td>
                    <td className="value">
                      {props.schoolProfile.payload.TaxRate}%
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Time Zone:</td>
                    <td className="value">
                      <ReferenceOutput
                        id={props.schoolProfile.payload.TimeZoneId}
                        listName="LstTimeZones"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>
        )}
      <MenuDivider />
      <MonitorSetting />
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(
  SchoolProfile,
  mapStateToProps
);
