import React from 'react';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import { Link } from 'react-router-dom';
import Tab from 'components/Tab';

type ContactsSummaryProps = {
  schoolId: string,
  studentContacts: {
    FirstName: string,
    LastName: string,
    RelationshipTypeId: string,
    PhoneNumber: string,
    Email: string,
  },
};
const ContactsSummary = props => {
  return (
    <div>
      {props.studentContacts &&
        props.studentContacts.length > 0 &&
        props.studentContacts.map((studentContact, i) => {
          return (
            <div className="ContactsSummary" key={i}>
              <div className="pt-card">
                <h3>
                  <Link
                    to={`/app/school-app/${
                      props.schoolId
                    }/students/student-contact/${studentContact.ContactId}`}
                  >
                    {studentContact.FirstName
                      ? studentContact.FirstName
                      : 'N/A'}{' '}
                    {studentContact.LastName ? studentContact.LastName : 'N/A'}
                  </Link>
                </h3>
                <table className="default-table-plain">
                  <tbody>
                    <tr>
                      <td className="label">Relationship</td>
                      <td className="value">
                        {studentContact.RelationshipTypeId ? (
                          <ReferenceOutput
                            listName="LstRelationshipTypes"
                            id={studentContact.RelationshipTypeId}
                          />
                        ) : (
                          'N/A'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Phone</td>
                      <td className="value">
                        <Link
                          to={`/app/school-app/${
                            props.schoolId
                          }/students/detail/${
                            props.studentDetail.Id
                          }/summary/send-sms-contact/${
                            studentContact.ContactId
                          }`}
                        >
                          {studentContact.PhoneNumber
                            ? studentContact.PhoneNumber
                            : 'N/A'}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Email</td>
                      <td className="value">
                        <Link
                          to={`/app/school-app/${
                            props.schoolId
                          }/students/detail/${
                            props.studentDetail.Id
                          }/summary/send-email-contact/${
                            studentContact.ContactId
                          }`}
                        >
                          {studentContact.Email ? studentContact.Email : 'N/A'}
                        </Link>
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
        }/contacts`}
      >
        <button className="pt-button">View All</button>
      </Link>
    </div>
  );
};

export default ContactsSummary;
