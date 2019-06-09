import React from 'react';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';

import SaveReportForm from './SaveReportForm';
import SmartReportFormContainer from 'containers/School/SmartReportFormContainer';

type SaveReportProps = {
  match: { params: { schoolId: string } },
  allStudentLists: { payload: [] },
};

const SaveReport = (props: SaveReportProps) => {
  return (
    <Modal
      title="Save Smart List Report"
      closeUrl={`/app/school-app/${
        props.match.params.schoolId
      }/students/smart-list/report`}
    >
      <SmartReportFormContainer
        dispatchActionOnCloseParams={props.match.params.schoolId}
        redirectOnSuccess={`/app/school-app/${
          props.match.params.schoolId
        }/students/smart-list/report`}
      >
        <SaveReportForm />
      </SmartReportFormContainer>
    </Modal>
  );
};

const mapStateToProps = () => ({});

export default connect(
  SaveReport,
  mapStateToProps
);
