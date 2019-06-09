import React from 'react';
import SelectField from 'components/Forms/SelectField';
import tempSchoolStaffRoles from 'src/redux/data/tempSchoolStaffRoles';

type SchoolStaffRoleSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  id?: string,
  help?: boolean,
};

const SchoolStaffRoleSelectField = (props: SchoolStaffRoleSelectFieldProps) => (
  <SelectField
    {...props}
    className={`${props.className || ''} SchoolStaffRoleSelectField`}
    options={tempSchoolStaffRoles}
  />
);

export default SchoolStaffRoleSelectField;
