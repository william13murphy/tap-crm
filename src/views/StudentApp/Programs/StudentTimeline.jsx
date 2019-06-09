import React from 'react';
import connect from 'src/redux/connect';
import DataCard from 'components/DataCard';
import StudentMessagesContainer from 'containers/Student/StudentMessagesContainer';
import moment from 'moment';

type StudentTimelineProps = {
  studentId: string,
  messages: {
    payload: [],
  },
};

const StudentTimeline = (props: StudentTimelineProps) => (
  <DataCard title="My Timeline">
    <StudentMessagesContainer dispatchFetchParams={props.studentId}>
      <table className="TimelineTable">
        <tbody>
          {props.messages.payload &&
            props.messages.payload.map(item => {
              return (
                <tr key={item.Id}>
                  <td>
                    <strong>
                      {moment.utc(item.CreatedOn).format('MMMM DD, YYYY')}
                    </strong>
                  </td>
                  <td>{item.Detail}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </StudentMessagesContainer>
  </DataCard>
);

const mapStateToProps = state => {
  return {
    studentId: state.token.payload.StudentId,
    messages: state.student.messages,
  };
};

export default connect(StudentTimeline, mapStateToProps);
