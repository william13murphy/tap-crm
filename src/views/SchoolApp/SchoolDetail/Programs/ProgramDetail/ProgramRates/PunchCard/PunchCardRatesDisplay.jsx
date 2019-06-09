import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import moment from 'moment';
import {
  localCurrencyValue,
  localCurrencyZero,
} from 'util/localization/localValues';
import Collapsible from 'components/Collapsible';
import './styles.less';
type PunchCardRatesDisplayProps = {
  item: {},
  match: {
    params: {
      schoolId: string,
      styleId: string,
    },
  },
};

const PunchCardRatesDisplay = (props: PunchCardRatesDisplayProps) => {
  return (
    props.styleRates &&
    props.styleRates.payload &&
    props.styleRates.payload.map((item, index) => {
      if (item.EnrollmentTypeId === 'f5fcc6fb-3e23-4e08-b227-e85978b93553') {
        return (
          <Collapsible
            className="PunchCardDisplay"
            title={item.Name}
            titleIcon="RateTypeIcon pt-icon pt-icon-layers"
            key={index}
          >
            <div>
              <Link
                to={{
                  pathname: `/app/school-app/${
                    props.match.params.schoolId
                  }/school-detail/programs/detail/${
                    props.match.params.styleId
                  }/rates/${item.Id}/punch-card/edit`,
                  state: { initialValues: item },
                }}
                className="ProgramEdit"
              >
                <button className="pt-button pt-intent-primary pt-icon-edit">
                  Edit Rate
                </button>
              </Link>

              <table className="default-table-plain ProgramRatesTable">
                <tbody>
                  <tr>
                    <td>
                      <h2>{item.Name}</h2>
                    </td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td>{item.Description}</td>
                  </tr>
                  <tr>
                    <td>Enrollment Type:</td>
                    <td>
                      <ReferenceOutput
                        id={item.EnrollmentTypeId}
                        listName="LstEnrollmentTypes"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Start Date:</td>
                    <td>{moment(item.StartDate).format('MMMM D, YYYY')}</td>
                  </tr>
                  <tr>
                    <td>End Date:</td>
                    <td>
                      {item.EndDate.indexOf('9999-12-31')
                        ? moment(item.EndDate).format('MMMM D, YYYY')
                        : ''}
                    </td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td>
                      <ReferenceOutput
                        id={item.StatusId}
                        listName="LstStyleRateStatuses"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Default Classes:</td>
                    <td>{item.DefaultClasses}</td>
                  </tr>
                  <tr>
                    <td>Total Cost:</td>
                    <td>
                      {item.TotalCost
                        ? localCurrencyValue(item.TotalCost)
                        : localCurrencyZero()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Collapsible>
        );
      }
    })
  );
};
function mapStateToProps(state) {
  return {
    styleRates: state.school.styleRates,
  };
}

export default connect(
  PunchCardRatesDisplay,
  mapStateToProps
);
