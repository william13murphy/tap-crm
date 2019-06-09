import React from 'react';
import Page from 'components/Layout/Page';
import PageBody from 'components/Layout/PageBody';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import connect from 'src/redux/connect';
import NotesCard from 'views/SchoolApp/Students/StudentDetail/Notes/NotesCard';
import InternalEFCUserFlaggedNotesContainer from 'containers/Student/InternalEFCUserFlaggedNotesContainer';
import StudentNotesContainer from 'containers/Student/StudentNotesContainer';
import StudentNoteFormContainer from 'containers/Student/StudentNoteFormContainer';

import './styles.less';

type InternalEFCUserFlaggedNotesPageProps = {
  allClients: {
    payload: Array<{}> | {},
  },
  history: {},
  notes: [{}],
  internalEFCUserFlaggedNotes: [{}],
  userId: string,
  studentId: string,
  token: {
    payload: { UserId: string },
  },
};

const InternalEFCUserFlaggedNotesPage = (
  props: InternalEFCUserFlaggedNotesPageProps
) => {
  return (
    <Page className="AllClientsPage" title="All Clients">
      <PageHeader>
        <PageTitle>Flagged Notes</PageTitle>
      </PageHeader>
      <PageBody>
        <InternalEFCUserFlaggedNotesContainer
          dispatchFetchParams={props.token.payload.UserId}
        >
          {props.internalEFCUserFlaggedNotes &&
            props.internalEFCUserFlaggedNotes.payload &&
            props.internalEFCUserFlaggedNotes.payload.length == 0 && (
              <div>Notes Not Found</div>
            )}
          {props.internalEFCUserFlaggedNotes &&
            props.internalEFCUserFlaggedNotes.payload &&
            props.internalEFCUserFlaggedNotes.payload
              .filter((item, index, array) => {
                // Filter all orphan notes and notes without ParentId
                let matchedParentIndex = array.findIndex(innerItem => {
                  return item.ParentId === innerItem.Id;
                });
                if (!item.ParentId || matchedParentIndex === -1) return true;
                return false;
              })
              .map((item, index) => {
                return (
                  <StudentNoteFormContainer
                    key={index}
                    dispatchActionOnSuccessParams={{
                      studentId: item.StudentId,
                    }}
                  >
                    <NotesCard
                      studentId={item.StudentId}
                      data={item}
                      key={index}
                      allNotes={props.internalEFCUserFlaggedNotes}
                    />
                  </StudentNoteFormContainer>
                );
              })}
        </InternalEFCUserFlaggedNotesContainer>
      </PageBody>
    </Page>
  );
};

function mapStateToProps(state) {
  return {
    token: state.token,
    internalEFCUserFlaggedNotes: state.student.internalEFCUserFlaggedNotes,
  };
}

export default connect(
  InternalEFCUserFlaggedNotesPage,
  mapStateToProps
);
