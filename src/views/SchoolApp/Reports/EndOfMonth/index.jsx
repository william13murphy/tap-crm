import React from 'react';
import connect from 'src/redux/connect';

import LeadsInterestedIdDataGrid from './LeadsInterestedIdDataGrid';
import LeadsStatusDataGrid from './LeadsStatusDataGrid';
import LeadsByMarketingTypeDataGrid from './LeadsByMarketingTypeDataGrid';
import POSRevenuByCustomerTypeDataGrid from './POSRevenuByCustomerTypeDataGrid';
import POSRevenuByPaymentTypeDataGrid from './POSRevenuByPaymentTypeDataGrid';
import RevenuByProgramTypeDataGrid from './RevenuByProgramTypeDataGrid';
import TotalRevenueDataGrid from './TotalRevenueDataGrid';
import StudentsByStatusDataGrid from './StudentsByStatusDataGrid';
import StudentsExitDataGrid from './StudentsExitDataGrid';
import StudentsNewDataGrid from './StudentsNewDataGrid';
import StudentsAgeingDataGrid from './StudentsAgeingDataGrid';
import StudentsActiveByProgramDataGrid from './StudentsActiveByProgramDataGrid';
import StudentsExitProgramDataGrid from './StudentsExitProgramDataGrid';

type EndOfMonthProps = {
  eom: {},
  columns: number,
  chartType: string,
  sideNav?: boolean,
};

const EndOfMonthGridDisplay = props => {
  return (
    <div>
      {props.eom ? (
        <div>
          <h2 className="grid-title">Leads Interested</h2>
          <LeadsInterestedIdDataGrid data={props.eom.LeadsInterestedId} />
          &nbsp;
          <h2 className="grid-title">Leads Status</h2>
          <LeadsStatusDataGrid data={props.eom.LeadsStatus} />
          &nbsp;
          <h2 className="grid-title">Leads By Marketing Type</h2>
          <LeadsByMarketingTypeDataGrid data={props.eom.LeadsByMarketingType} />
          &nbsp;
          <h2 className="grid-title">POS Revenue By Customer Type</h2>
          <POSRevenuByCustomerTypeDataGrid
            data={props.eom.POSRevenuByCustomerType}
          />
          &nbsp;
          <h2 className="grid-title">POS Revenue By Payment Type</h2>
          <POSRevenuByPaymentTypeDataGrid
            data={props.eom.POSRevenuByPaymentType}
          />
          &nbsp;
          <h2 className="grid-title">Revenue By Program Type</h2>
          <RevenuByProgramTypeDataGrid data={props.eom.RevenuByProgramType} />
          &nbsp;
          <h2 className="grid-title">Total Revenue</h2>
          <TotalRevenueDataGrid data={props.eom.TotalRevenue} />
          &nbsp;
          <h2 className="grid-title">Students By Status</h2>
          <StudentsByStatusDataGrid data={props.eom.StudentsByStatus} />
          &nbsp;
          <h2 className="grid-title">Students New</h2>
          <StudentsNewDataGrid data={props.eom.StudentsNew} />
          &nbsp;
          <h2 className="grid-title">Students Ageing</h2>
          <StudentsAgeingDataGrid data={props.eom.StudentsAgeing} />
          &nbsp;
          <h2 className="grid-title">Students Active By Program</h2>
          <StudentsActiveByProgramDataGrid
            data={props.eom.StudentsActiveByProgram}
          />
          &nbsp;
          <h2 className="grid-title">Students Exit</h2>
          <StudentsExitDataGrid data={props.eom.StudentsExit} />
          &nbsp;
          <h2 className="grid-title">Students Exit By Program</h2>
          <StudentsExitProgramDataGrid data={props.eom.StudentsExitByProgram} />
          &nbsp;
        </div>
      ) : (
        <div>No Reports Found</div>
      )}
    </div>
  );
};

export default connect(EndOfMonthGridDisplay);
