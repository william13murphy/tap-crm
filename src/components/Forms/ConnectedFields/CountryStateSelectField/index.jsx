import React from 'react';
import connect from 'src/redux/connect';
import SelectField from 'components/Forms/SelectField';

//Form needs to be wrapped with StateProvinceMasterContainer
//Do not need to mapStateToProps in form as it is handled here

type CountryStateSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  country?: any,
};

const CountryStateSelectField = (props: CountryStateSelectFieldProps) => {
  const localStates =
    props.stateProvinces &&
    props.stateProvinces.payload &&
    props.stateProvinces.payload
      .filter(item => item.CountryId === props.countryId)
      .map(item => {
        return {
          label: item.Name,
          value: item.Code,
        };
      });

  return (
    <SelectField
      {...props}
      className={`${props.className || ''} StateSelectField`}
      options={localStates}
    />
  );
};

const mapStateToProps = state => {
  return {
    stateProvinces: state.utility.stateProvinceMaster,
  };
};

export default connect(
  CountryStateSelectField,
  mapStateToProps
);
