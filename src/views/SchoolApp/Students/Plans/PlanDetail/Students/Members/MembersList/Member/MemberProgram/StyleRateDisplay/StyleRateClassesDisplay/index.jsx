import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import DataCard from 'components/DataCard';
import ClassDisplay from '../ClassDisplay';
import './styles.less';
import { getTimeZoneLabel } from 'src/util/localization/timezone';

type StyleRateClassesDisplayProps = {
  styleId: string,
  studentStyleRateId: string,
  schoolStyleClassesMany: Array<{}>,
  studentPlanStudentStyleRateClassesMany: Array<{}>,
};

class StyleRateClassesDisplay extends React.Component {
  props: StyleRateClassesDisplayProps;

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
    const schoolStyleClasses =
      this.props.schoolStyleClassesMany.payload &&
      this.props.schoolStyleClassesMany.payload[this.props.styleId];

    if (schoolStyleClasses) {
      const styleRateClasses = this.props.studentPlanStudentStyleRateClassesMany
        .payload[this.props.studentStyleRateId];
      return (
        <div className="StyleRateClassesDisplay">
          {styleRateClasses.length > 0 ? (
            styleRateClasses.map((styleRateClass, i) => {
              if (styleRateClass.AuthorizedForAllStyleRankClass === true) {
                return (
                  <div key={i}>
                    <strong>Authorized for All Classes</strong>
                  </div>
                );
              } else {
                return schoolStyleClasses.map((schoolStyleClass, i) => {
                  if (schoolStyleClass.Id === styleRateClass.SchoolClassId) {
                    return (
                      <ClassDisplay
                        key={i}
                        timeZone={this.state.schoolTimeZone}
                        classDetail={schoolStyleClass}
                      />
                    );
                  }
                });
              }
            })
          ) : (
            <Link to={this.props.chooseStudentClassesUrl}>
              <button className="pt-button pt-intent-primary">
                Choose Classes
              </button>
            </Link>
          )}
        </div>
      );
    } else {
      return <div>No available classes found for this program.</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    schoolStyleClassesMany: state.school.styleClassesMany,
    studentPlanStudentStyleRateClassesMany:
      state.student.planStudentStyleRateClassesMany,
    schoolProfile: state.school.profile,
    references: state.utility.references,
  };
};

export default connect(
  StyleRateClassesDisplay,
  mapStateToProps
);
