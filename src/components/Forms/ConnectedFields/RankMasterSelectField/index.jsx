import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';

type RankMasterSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  rankMaster: {
    payload: Array<{
      Name: string,
      Id: string,
    }>,
  },
};

const RankMasterSelectField = (props: RankMasterSelectFieldProps) => {
  if (props.rankMaster.payload.length > 0) {
    return (
      <SelectField
        {...props}
        className={`${props.className || ''} RankMasterSelectField`}
        options={props.rankMaster.payload.map(item => {
          return {
            label: item.Name,
            value: item.Id,
          };
        })}
      />
    );
  } else {
    return <div>Error: Rank Master not found</div>;
  }
};

const mapStateToProps = state => {
  return {
    rankMaster: state.utility.rankMaster,
  };
};

export default connect(RankMasterSelectField, mapStateToProps);
