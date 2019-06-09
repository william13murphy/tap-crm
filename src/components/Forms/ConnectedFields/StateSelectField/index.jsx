import React from 'react';
import SelectField from 'components/Forms/SelectField';
import locales from 'src/util/localization/locales';
import localValue from 'util/localization/localValue';

import statesUnitedStates from 'src/redux/data/localized/unitedStates/states';
import statesAustralia from 'src/redux/data/localized/australia/states';
import statesUnitedKingdom from 'src/redux/data/localized/unitedKingdom/states';
import statesCanada from 'src/redux/data/localized/canada/states';
import statesNewZealand from 'src/redux/data/localized/newZealand/states';
import statesIreland from 'src/redux/data/localized/ireland/states';

type StateSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  countryId?: any,
};

const StateSelectField = (props: StateSelectFieldProps) => {
  const localStatesArrays = {
    [locales.UnitedStates]: statesUnitedStates,
    [locales.Australia]: statesAustralia,
    [locales.UnitedKingdom]: statesUnitedKingdom,
    [locales.Canada]: statesCanada,
    [locales.NewZealand]: statesNewZealand,
    [locales.Ireland]: statesIreland,
  };

  let countryName;

  {
    switch (props.countryId) {
      case 'c78227a5-ca89-4b9d-aa6a-e5d779b94b20':
        countryName = 'Canada';
        break;
      case '70efb18e-b531-4acd-a784-70e91ee89d4c':
        countryName = 'Australia';
        break;
      case 'd05a9aef-40a0-4470-9c6c-7f45516dea78':
        countryName = 'UnitedKingdom';
        break;
      case 'ca1bdee0-7e69-40e4-a9b4-274690d9494b':
        countryName = 'NewZealand';
        break;
      case '6555afe5-dd6b-4dcc-b58a-f32ce1ca6d89':
        countryName = 'Ireland';
        break;
      default:
        countryName = 'UnitedStates';
        break;
    }
  }

  const localStates = localValue(localStatesArrays, countryName);

  return (
    <SelectField
      {...props}
      className={`${props.className || ''} StateSelectField`}
      options={localStates}
    />
  );
};

export default StateSelectField;
