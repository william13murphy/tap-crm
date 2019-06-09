import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Tab from 'components/Tab';

type NotesSummaryProps = {
  schoolId: string,
  studentId: string,
  studentNotes: {
    CreatedOn: string,
    Detail: string,
  },
};
const NotesSummary = (props: NotesSummaryProps) => {
  return (
    <div>
      {props.studentNotes &&
        props.studentNotes.map((studentNote, i) => {
          return (
            <div className="NotesSummary" key={i}>
              <div className="pt-card">
                <h3>
                  {studentNote.CreatedOn
                    ? moment(studentNote.CreatedOn).format('MMMM Do, YYYY')
                    : 'N/A'}
                </h3>
                <table className="default-table-plain">
                  <tbody>
                    <tr>
                      <td className="value">
                        {studentNote.Detail ? studentNote.Detail : 'N/A'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      <Link
        className="ViewAllLink"
        to={`/app/school-app/${props.schoolId}/students/detail/${
          props.studentId
        }/notes`}
      >
        <button className="pt-button">View All</button>
      </Link>
    </div>
  );
};

export default NotesSummary;
