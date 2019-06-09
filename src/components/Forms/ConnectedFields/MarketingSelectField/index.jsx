import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';

type MarketingSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  marketings: {
    payload: Array<{
      Detail: string,
      Id: string,
    }>,
  },
};

const MarketingSelectField = (props: MarketingSelectFieldProps) => {
  if (props.marketings.payload.length > 0) {
    return (
      <SelectField
        {...props}
        className={`${props.className || ''} MarketingSelectField`}
        options={props.marketings.payload.map(item => {
          return {
            label: item.Detail,
            value: item.Id,
          };
        })}
      />
    );
  } else {
    return <div>Error: Marketings not found</div>;
  }
};

const mapStateToProps = state => {
  return {
    marketings: state.school.marketings,
  };
};

export default connect(MarketingSelectField, mapStateToProps);
