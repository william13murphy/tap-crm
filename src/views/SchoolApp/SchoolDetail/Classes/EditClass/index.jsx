import React from 'react';
import Modal from 'components/Modal';
import connect from 'src/redux/connect';

import SchoolStylesContainer from 'containers/School/SchoolStylesContainer';
import SchoolClassFormContainer from 'containers/School/SchoolClassFormContainer';
import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import SchoolClassDetailContainer from 'containers/School/SchoolClassDetailContainer';
import EditClassForm from '../../../_shared/EditClassForm';
import {
  getTimeZoneLabel,
  calculateLocalDateTimeFromUTCDateAndTime,
} from 'src/util/localization/timezone';

type EditClassProps = {
  history: {},
  schoolId: string,
  classes: {
    payload: [],
  },
  match: {
    path: string,
    url: string,
  },
};

class EditClass extends React.Component {
  props: EditClassProps;

  componentWillMount() {
    this.setSchoolTimeZone();
  }

  setSchoolTimeZone() {
    let schoolTimeZone = getTimeZoneLabel(
      this.props.references,
      this.props.schoolProfile.payload.TimeZoneId
    );

    this.setState({
      schoolTimeZone,
    });
  }

  render() {
    let StartTimeUtc;
    let EndTimeUtc;
    if (this.props.classDetail.payload) {
      StartTimeUtc = calculateLocalDateTimeFromUTCDateAndTime(
        this.state.schoolTimeZone,
        this.props.classDetail.payload.StartDate,
        this.props.classDetail.payload.StartTimeUtc
      );

      //Use StartDate here, because if there is no EndDate, it will throw off the time conversion:
      EndTimeUtc = calculateLocalDateTimeFromUTCDateAndTime(
        this.state.schoolTimeZone,
        this.props.classDetail.payload.StartDate,
        this.props.classDetail.payload.EndTimeUtc
      );
    }
    return (
      <SchoolClassDetailContainer
        dispatchFetchParams={this.props.match.params.classId}
      >
        <Modal
          title="Edit Class"
          closeUrl={`/app/school-app/${
            this.props.schoolId
          }/school-detail/classes/class-detail/${
            this.props.match.params.classId
          }`}
        >
          <SchoolUtilityStaffsContainer
            dispatchFetchParams={this.props.schoolId}
          >
            <SchoolStylesContainer dispatchFetchParams={this.props.schoolId}>
              <SchoolClassFormContainer
                dispatchActionOnCloseParams={{
                  classId: this.props.match.params.classId,
                  schoolId: this.props.schoolId,
                }}
                redirectOnSuccess={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/classes/class-detail/${
                  this.props.match.params.classId
                }`}
              >
                <EditClassForm
                  schoolId={this.props.schoolId}
                  initialValues={{
                    ...this.props.classDetail.payload,
                    StartTimeUtc: StartTimeUtc,
                    EndTimeUtc: EndTimeUtc,
                  }}
                />
              </SchoolClassFormContainer>
            </SchoolStylesContainer>
          </SchoolUtilityStaffsContainer>
        </Modal>
      </SchoolClassDetailContainer>
    );
  }
}
function mapStateToProps(state) {
  return {
    classes: state.school.classes,
    classDetail: state.school.classDetail,
    references: state.utility.references,
    schoolProfile: state.school.profile,
  };
}

export default connect(
  EditClass,
  mapStateToProps
);
