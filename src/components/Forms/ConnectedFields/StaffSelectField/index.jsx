import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';

type StaffSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  utilityStaffs: {
    payload: [],
  },
};

const StaffSelectField = (props: StaffSelectFieldProps) => {
  if (props.utilityStaffs.payload.length > 0) {
    return (
      <SelectField
        {...props}
        className={`${props.className || ''} StaffSelectField`}
        options={props.utilityStaffs.payload.map(staff => {
          return {
            label: staff.Name,
            value: staff.UserId,
          };
        })}
      />
    );
  } else {
    return <div>Error: Staffs not found</div>;
  }
};

const mapStateToProps = state => {
  return {
    utilityStaffs: state.school.utilityStaffs,
  };
};

export default connect(
  StaffSelectField,
  mapStateToProps
);
