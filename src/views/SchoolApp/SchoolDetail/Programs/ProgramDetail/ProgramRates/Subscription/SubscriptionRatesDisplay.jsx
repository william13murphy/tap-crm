import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import moment from 'moment';
import SchoolStyleRateAdditionalClassesManyContainer from 'containers/School/SchoolStyleRateAdditionalClassesManyContainer';
import AdditionalClassRatesDisplay from './AdditionalClassRatesDisplay';
import Collapsible from 'components/Collapsible';
import {
  localCurrencyValue,
  localCurrencyZero,
} from 'util/localization/localValues';
import './styles.less';
type SubscriptionRatesDisplayProps = {
  styleRateAdditionalClassesMany: [{}],
  screen: {
    sizeDesktopLarge: any,
    sizeTabletSmall: any,
  },
};

const SubscriptionRatesDisplay = (props: SubscriptionRatesDisplayProps) => {
  {
    return (
      props.styleRates &&
      props.styleRates.payload.map((item, index) => {
        if (item.EnrollmentTypeId === '98aa6452-1ff2-4c4d-ad7b-c184cd96f8d2') {
          return (
            <Collapsible
              className="SubscriptionDisplay"
              title={item.Name}
              titleIcon="RateTypeIcon pt-icon pt-icon-repeat"
              key={index}
            >
              <div>
                <SchoolStyleRateAdditionalClassesManyContainer
                  dispatchFetchParams={{
                    styleRateId: item.Id,
                  }}
                >
                  <div className="ProgramRates pt-card">
                    <Link
                      to={{
                        pathname: `/app/school-app/${
                          props.match.params.schoolId
                        }/school-detail/programs/detail/${
                          props.match.params.styleId
                        }/rates/${item.Id}/subscription/edit`,
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
                          <td>
                            {moment(item.StartDate).format('MMMM D, YYYY')}
                          </td>
                        </tr>
                        <tr>
                          <td>End Date:</td>
                          <td>
                            {item.EndDate.includes('9999-12-31')
                              ? 'None'
                              : moment(item.EndDate).format('MMMM D, YYYY')}
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
                          <td>
                            {item.DefaultClasses === 100
                              ? 'Unlimited'
                              : item.DefaultClasses}
                          </td>
                        </tr>
                        <tr>
                          <td>Signup Cost:</td>
                          <td>
                            {item.SignupCost
                              ? localCurrencyValue(item.SignupCost)
                              : localCurrencyZero()}
                          </td>
                        </tr>
                        <tr>
                          <td>Cancellation Cost:</td>
                          <td>
                            {item.CancellationCost
                              ? localCurrencyValue(item.CancellationCost)
                              : localCurrencyZero()}
                          </td>
                        </tr>
                        <tr>
                          <td>Annual Cost:</td>
                          <td>
                            {item.AnnualCost
                              ? localCurrencyValue(item.AnnualCost)
                              : localCurrencyZero}
                          </td>
                        </tr>
                        <tr>
                          <td>Total Cost (Signup + Annual Cost):</td>
                          <td>
                            {item.TotalCost
                              ? localCurrencyValue(item.TotalCost)
                              : localCurrencyZero()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <AdditionalClassRatesDisplay styleRateId={item.Id} />
                    <Link
                      to={`/app/school-app/${
                        props.match.params.schoolId
                      }/school-detail/programs/detail/${
                        props.match.params.styleId
                      }/rates/${item.Id}/additional-classes`}
                    >
                      <button className="pt-button pt-intent-primary pt-icon-plus">
                        Add Additional Class Cost
                      </button>
                    </Link>
                  </div>
                </SchoolStyleRateAdditionalClassesManyContainer>
              </div>
            </Collapsible>
          );
        }
      })
    );
  }
};

function mapStateToProps(state) {
  return {
    styleRates: state.school.styleRates,
    screen: state.screen,
  };
}

export default connect(
  SubscriptionRatesDisplay,
  mapStateToProps
);
