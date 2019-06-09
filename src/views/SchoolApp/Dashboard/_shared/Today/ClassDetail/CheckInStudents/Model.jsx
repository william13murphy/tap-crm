import React from 'react';
import connect from 'src/redux/connect';

const StudentAttendanceModel = Component => {
  type StudentAttendanceModelComponentProps = {
    classScheduleAuthorized: { payload: Array<{}> },
    classScheduleStudents: { payload: Array<{}> },
  };

  class StudentAttendanceModelComponent extends React.Component {
    props: StudentAttendanceModelComponentProps;

    constructor() {
      super();
      this.state = { options: [] };
    }
    getAttendanceData() {
      const students = this.props.classScheduleAuthorized.payload;
      const attendingStudents = this.props.classScheduleStudents.payload;
      const notAttendingStudents = students.filter(cV => {
        let attending = false;
        for (var i of attendingStudents) {
          if (i.StudentId === cV.StudentId) {
            attending = true;
          }
        }
        if (!attending) {
          return true;
        }
      });
      return notAttendingStudents;
    }
    transformDataToOptions(data) {
      return data.map(cV => {
        const authorizedLabel = cV.Authorized ? '' : 'Not Authorized. ';
        const classesLeft =
          cV.AllowedClassesPerWeek - cV.AttendedClassesPerWeek;
        const classesLeftLabel = classesLeft.toString() + ' classes left.';
        const label = `${cV.FirstName} ${
          cV.LastName
        } - ${authorizedLabel} ${classesLeftLabel}`;
        return {
          label,
          value: cV.StudentId,
        };
      });
    }
    componentWillMount() {
      const data = this.getAttendanceData();
      const options = this.transformDataToOptions(data);
      this.setState({ options });
    }
    render() {
      return <Component name="StudentId" options={this.state.options} />;
    }
  }

  const mapStateToProps = state => {
    return {
      classScheduleAuthorized: state.school.classScheduleAuthorized,
      classScheduleStudents: state.school.classScheduleStudents,
    };
  };

  return connect(
    StudentAttendanceModelComponent,
    mapStateToProps
  );
};

export default StudentAttendanceModel;
