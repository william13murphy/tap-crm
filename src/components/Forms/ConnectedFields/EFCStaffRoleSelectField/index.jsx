import React from 'react';
import SelectField from 'components/Forms/SelectField';
import tempEFCStaffRoles from 'src/redux/data/tempEFCStaffRoles';

type EFCStaffRoleSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
};

const EFCStaffRoleSelectField = (props: EFCStaffRoleSelectFieldProps) => (
  <SelectField
    {...props}
    className={`${props.className || ''} EFCStaffRoleSelectField`}
    options={tempEFCStaffRoles}
  />
);

export default EFCStaffRoleSelectField;
