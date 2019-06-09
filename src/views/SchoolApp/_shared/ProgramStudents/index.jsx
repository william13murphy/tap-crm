import React from 'react';
import connect from 'src/redux/connect';

import SchoolStyleStudentsProgressionContainer from 'containers/School/SchoolStyleStudentsProgressionContainer';
import StudentsDataGrid from './StudentsDataGrid';

type ProgramStudentsProps = {
  schoolId: string,
  history: {},
  match: {
    params: {
      styleId: string,
    },
    path: string,
  },
  schoolContacts: {
    payload: {},
  },
  styleRanks: {
    payload: [],
  },
  studentsByStyle: {
    payload: Array<{}>,
  },
};

const ProgramStudents = (props: ProgramStudentsProps) => {
  return (
    <SchoolStyleStudentsProgressionContainer
      dispatchFetchParams={{
        schoolId: props.schoolId,
        styleId: props.styleId,
      }}
    >
      <StudentsDataGrid
        styleRanks={props.styleRanks}
        history={props.history}
        data={props.styleStudentsProgression.payload || []}
        schoolId={props.schoolId}
        styleId={props.styleId}
        hideActions={props.hideActions}
      />
    </SchoolStyleStudentsProgressionContainer>
  );
};

const mapStateToProps = state => {
  return {
    styleStudentsProgression: state.school.styleStudentsProgression,
  };
};

export default connect(
  ProgramStudents,
  mapStateToProps
);
