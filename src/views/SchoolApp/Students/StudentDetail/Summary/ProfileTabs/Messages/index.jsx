import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Tab from 'components/Tab';

type MessagesSummaryProps = {
  schoolId: string,
  studentMessages: {
    CreatedBy: string,
  },
  schoolContacts: {
    UserId: string,
  },
  createdBy: Object,
};

const MessagesSummary = props => {
  return (
    <div>
      {props.studentMessages &&
        props.schoolContacts &&
        props.studentMessages.map((studentMessage, i) => {
          let createdBy = props.schoolContacts.find(
            messageItem => messageItem.UserId === studentMessage.CreatedBy
          );
          return (
            <div className="MessagesSummary" key={i}>
              <div className="pt-card">
                <h3>
                  {studentMessage.CreatedOn
                    ? moment(studentMessage.CreatedOn).format('MMMM Do, YYYY')
                    : 'N/A'}
                </h3>
                <table className="default-table-plain">
                  <tbody>
                    <tr>
                      <td className="label">From</td>
                      <td className="value">
                        {createdBy
                          ? `${createdBy.User.Profile.FirstName} ${
                              createdBy.User.Profile.LastName
                            }`
                          : 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Description</td>
                      <td className="value">
                        {studentMessage.Detail ? studentMessage.Detail : 'N/A'}
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
        }/messages`}
      >
        <button className="pt-button">View All</button>
      </Link>
    </div>
  );
};
export default MessagesSummary;
