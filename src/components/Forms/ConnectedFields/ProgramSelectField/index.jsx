import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';

type ProgramSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  styles: {
    payload: Array<{
      Name: string,
      Id: string,
    }>,
  },
};

const ProgramSelectField = (props: ProgramSelectFieldProps) => {
  if (props.styles.payload.length > 0) {
    return (
      <SelectField
        {...props}
        className={`${props.className || ''} ProgramSelectField`}
        options={props.styles.payload.map(item => {
          return {
            label: item.Name,
            value: item.Id,
          };
        })}
      />
    );
  } else {
    return <div>Error: Programs not found</div>;
  }
};

const mapStateToProps = state => {
  return {
    styles: state.school.styles,
  };
};

export default connect(ProgramSelectField, mapStateToProps);
