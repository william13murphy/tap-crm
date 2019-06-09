import React from 'react';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';

import SmartReportsDataGrid from './SmartReportsDataGrid';
import SmartReportsContainer from 'containers/School/SmartReportsContainer';

type LoadReportProps = {
  match: { params: { schoolId: string } },
  allStudentLists: { payload: [] },
};

const LoadReport = (props: LoadReportProps) => {
  return (
    <Modal
      title="Load Smart List Report"
      closeUrl={`/app/school-app/${
        props.match.params.schoolId
      }/students/smart-list/report`}
    >
      <SmartReportsContainer dispatchFetchParams={props.match.params.schoolId}>
        <SmartReportsDataGrid
          schoolId={props.match.params.schoolId}
          history={props.history}
        />
      </SmartReportsContainer>
    </Modal>
  );
};

const mapStateToProps = () => ({});

export default connect(
  LoadReport,
  mapStateToProps
);
