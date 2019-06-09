import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import ClassDisplay from './ClassDisplay';

type StudentClassesDisplayProps = {
  match: { params: { schoolId: string } },
  studentPackage: {
    PackageId: string,
  },
};

const StudentClassesDisplay = (props: StudentClassesDisplayProps) => {
  // Select this student's classes from redux, by their id
  const myStudentClasses = props.classes.payload[props.member.StudentId];

  let selectedStudentPackageClasses = [];
  // Determine if the selected classes are for THIS package:
  if (myStudentClasses && myStudentClasses.length > 0) {
    selectedStudentPackageClasses = myStudentClasses.filter((cV, i) => {
      if (
        cV.StudentPackageStyleRankId ===
        props.member.InitialPackageStyleRank.StudentPackageStyleRankId
      ) {
        return true;
      }
    });
  }
  const schoolId = props.match.params.schoolId;
  return (
    <div className="StudentClassesTable">
      {selectedStudentPackageClasses.length === 0 && (
        <Link
          to={`/app/school-app/${schoolId}/students/enrollments/detail/${
            props.studentPackageId
          }/choose-student-classes/${props.member.StudentId}`}
        >
          <button className="pt-button pt-intent-primary">
            Choose Student Classes
          </button>
        </Link>
      )}
      {selectedStudentPackageClasses.length > 0 &&
        (selectedStudentPackageClasses[0].AuthorizedForAllStyleRankClass ==
        true ? (
          'Selected Classes : Authorized For All Classes.'
        ) : (
          <table className="default-table-plain">
            <tbody>
              <tr>
                <td>
                  <span className="pt-icon pt-icon-tick pt-intent-success" />{' '}
                  <span>
                    Selected Classes :{' '}
                    {selectedStudentPackageClasses.map((item, index) => {
                      if (
                        item.AuthorizedForAllStyleRankClass == true &&
                        item.SchoolClassId
                      ) {
                        return 'Authorized For All Classes.';
                      } else if (item.AuthorizedForAllStyleRankClass == true) {
                        return 'Authorized For All Classes.';
                      }
                      return <ClassDisplay classDetail={item} key={index} />;
                    })}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    classes: state.student.classesByStyleMany,
  };
}

export default connect(StudentClassesDisplay, mapStateToProps);
