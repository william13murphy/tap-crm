import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';

type ProgramSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  styleRanks: {
    payload: Array<{
      Name: string,
      Id: string,
    }>,
  },
  disabled: boolean,
};

const ProgramRankSelectField = (props: ProgramSelectFieldProps) => {
  if (props.styleRanks.payload.length > 0) {
    return (
      <SelectField
        {...props}
        className={`${props.className || ''} ProgramRankSelectField`}
        options={props.styleRanks.payload.map(item => {
          return {
            label: item.Name,
            value: item.Id,
          };
        })}
      />
    );
  } else {
    return <div>Error: Program Ranks not found</div>;
  }
};

const mapStateToProps = state => {
  return {
    styleRanks: state.school.styleRanks,
  };
};

export default connect(ProgramRankSelectField, mapStateToProps);
