import React from 'react';
import DataCard from 'components/DataCard';
import './styles.less';

type InstructorContactInfoCardProps = {
  data: [],
};

const InstructorContactInfoCard = (props: InstructorContactInfoCardProps) => (
  <div className="InfoCard">
    <div className="InfoCard__header">
      <h3>Instructor Contact Information</h3>
    </div>
    <div className="InfoCard__body">
      {props.data.map((item, index) => {
        return (
          <DataCard key={index} title={`${item.FirstName} ${item.LastName}`}>
            <table className="TimelineTable">
              <tbody>
                <tr>
                  <td>
                    <strong>Program</strong>
                  </td>
                  <td>{item.StyleName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phone</strong>
                  </td>
                  <td>{item.PhoneNumber}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email</strong>
                  </td>
                  <td>{item.Email && item.Email.toLowerCase()}</td>
                </tr>
              </tbody>
            </table>
          </DataCard>
        );
      })}
    </div>
  </div>
);

export default InstructorContactInfoCard;
