import React from 'react';
import connect from 'src/redux/connect';

import { Route } from 'react-router-dom';
import Modal from 'components/Modal';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';

import SchoolStyleClassesManyContainer from 'containers/School/SchoolStyleClassesManyContainer';
import StudentPlanStudentStyleRateClassesFormContainer from 'containers/Student/StudentPlanStudentStyleRateClassesFormContainer';
import ChooseStudentClassesForm from './ChooseStudentClassesForm';

import StudentClassesDisplay from './StudentClassesDisplay';

import StudentPlanStudentStyleRateClassesManyContainer from 'containers/Student/StudentPlanStudentStyleRateClassesManyContainer';
import StyleRateClassesDisplay from './StyleRateClassesDisplay';

import InputBlock from 'components/Forms/InputBlock';
import { localCurrencyValue } from 'util/localization/localValues';

import DataCard from 'components/DataCard';

import './styles.less';

type StyleRateDisplayProps = {
  styleRateId: string,
  schoolStyleRateMany: {},
  studentStyleRate: {},
};

class StyleRateDisplay extends React.Component {
  renderClassesForm() {
    const styleId = this.props.studentStyleRate.SchoolStyleId;
    if (this.props.schoolStyleClassesMany.payload) {
      if (this.props.schoolStyleClassesMany.payload[styleId]) {
        return (
          <StudentPlanStudentStyleRateClassesFormContainer
            dispatchActionOnCloseParams={this.props.studentStyleRate.Id}
            redirectOnSuccess={this.props.match.url}
          >
            <ChooseStudentClassesForm
              totalClasses={
                this.props.studentStyleRate.DefaultClasses +
                this.props.studentStyleRate.AdditionalClasses
              }
              schoolStyleId={styleId}
              schoolStyleClasses={
                this.props.schoolStyleClassesMany.payload[styleId]
              }
              studentPackageStyleRankId={
                this.props.studentStyleRate.InitialStyleRankId
              }
              planStudentStyleRateId={this.props.studentStyleRate.Id}
            />
          </StudentPlanStudentStyleRateClassesFormContainer>
        );
      } else {
        return <div>Error: Classes not found</div>;
      }
    } else {
      return (
        <div>
          Error: There was an error fetching classes, please refresh the page.
        </div>
      );
    }
  }
  render() {
    const studentStyleRate = this.props.studentStyleRate;
    const styleId = this.props.studentStyleRate.SchoolStyleId;
    const schoolStyleRate = this.props.schoolStyleRateMany.payload[
      this.props.studentStyleRate.StyleRateId
    ];
    const fullName =
      this.props.studentDetail.User.Profile.FirstName +
      ' ' +
      this.props.studentDetail.User.Profile.LastName;
    const chooseStudentClassesUrl = `${
      this.props.match.url
    }/choose-student-classes/${this.props.studentStyleRate.Id}`;

    return (
      <div className="StyleRateDisplay">
        <div className="StyleRateDisplay--success">
          <InputBlock>
            <DataCard
              title={`Rate: ${schoolStyleRate.Name.charAt(0).toUpperCase() +
                schoolStyleRate.Name.slice(1)}`}
              className="StyleRateDisplay__Detail"
            >
              <table className="default-table-plain">
                <tbody>
                  <tr>
                    <td className="label">Enrollment Type:</td>
                    <td>
                      <ReferenceOutput
                        listName="LstEnrollmentTypes"
                        id={schoolStyleRate.EnrollmentTypeId}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Annual Price:</td>
                    <td>
                      {localCurrencyValue(
                        studentStyleRate.StyleRateExtendedPrice
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Additional Classes Cost:</td>
                    <td>
                      {localCurrencyValue(
                        studentStyleRate.StyleRateAdditionalClassExtendedPrice
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Signup Fee:</td>
                    <td>
                      {localCurrencyValue(
                        studentStyleRate.StyleRateSignupExtendedPrice
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Cancellation Fee:</td>
                    <td>
                      {localCurrencyValue(
                        studentStyleRate.StyleRateCancellationExtendedPrice
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </DataCard>
            <DataCard
              title="Classes"
              className="StyleRateClassesDisplayDataCard"
            >
              <SchoolStyleClassesManyContainer dispatchFetchParams={styleId}>
                <StudentPlanStudentStyleRateClassesManyContainer
                  dispatchFetchParams={this.props.studentStyleRate.Id}
                >
                  <StyleRateClassesDisplay
                    styleId={styleId}
                    studentStyleRateId={this.props.studentStyleRate.Id}
                    chooseStudentClassesUrl={chooseStudentClassesUrl}
                  />
                </StudentPlanStudentStyleRateClassesManyContainer>
              </SchoolStyleClassesManyContainer>
            </DataCard>
          </InputBlock>
          <Route
            path={chooseStudentClassesUrl}
            render={innerProps => (
              <Modal
                className="ChooseClass"
                title={`Choose Classes for ${fullName}`}
                closeUrl={this.props.match.url}
              >
                {this.renderClassesForm()}
              </Modal>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schoolStyleRateMany: state.school.styleRateMany,
    schoolStyleClassesMany: state.school.styleClassesMany,
  };
};

export default connect(
  StyleRateDisplay,
  mapStateToProps
);
