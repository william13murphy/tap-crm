import React from 'react';
import connect from 'src/redux/connect';
import SchoolStyleRateAdditionalClassesDeleteStatefulFormContainer from 'containers/School/SchoolStyleRateAdditionalClassesDeleteStatefulFormContainer';
import SingleButtonForm from 'components/Forms/SingleButtonForm';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import {
  localCurrencyValue,
  localCurrencyZero,
} from 'util/localization/localValues';
import './styles.less';

type AdditionalClassRatesDisplayProps = {
  styleRateAdditionalClassesMany: [{}],
  styleRateId: string,
  match: {
    params: {
      schoolId: string,
      styleId: string,
    },
  },
};

const AdditionalClassRatesDisplay = (
  props: AdditionalClassRatesDisplayProps
) => {
  // Select this student's classes from redux, by their id
  const additionalClassRates =
    props.styleRateAdditionalClassesMany &&
    props.styleRateAdditionalClassesMany.payload &&
    props.styleRateAdditionalClassesMany.payload[props.styleRateId];
  return (
    <div className="AdditionalClassRatesDisplay">
      {additionalClassRates && additionalClassRates.length > 0 ? (
        <table className="default-table-plain">
          <thead>
            <tr>
              <th>Additional Classes</th>
              <th>Annual Cost</th>
            </tr>
          </thead>
          <tbody>
            {additionalClassRates &&
              additionalClassRates.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <ReferenceOutput
                        id={item.AdditionalClassId}
                        listName="LstAdditional Classes"
                      />
                    </td>
                    <td>
                      {item.ClassesCost
                        ? localCurrencyValue(item.ClassesCost)
                        : localCurrencyZero()}
                    </td>
                    <td>
                      {/* <Link
                      to={`/app/schools/detail/${
                        props.match.params.schoolId
                      }/programs/detail/${props.match.params.styleId}/rates/${
                        props.styleRateId
                      }/${item.Id}/delete`}
                    >
                      X
                    </Link> */}
                      <SchoolStyleRateAdditionalClassesDeleteStatefulFormContainer
                        dispatchActionOnSuccessParams={{
                          styleRateId: item.StyleRateId,
                        }}
                      >
                        <SingleButtonForm
                          title="Remove"
                          formData={{
                            Id: item.Id,
                          }}
                        />
                      </SchoolStyleRateAdditionalClassesDeleteStatefulFormContainer>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    styleRateAdditionalClassesMany: state.school.styleRateAdditionalClassesMany,
  };
}

export default connect(
  AdditionalClassRatesDisplay,
  mapStateToProps
);
