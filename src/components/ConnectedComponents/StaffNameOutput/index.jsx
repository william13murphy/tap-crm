import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';

type StaffNameOutputProps = {
  id: string,
  className?: string,
  utilityStaffs: {
    payload: [],
  },
};

/*
  utilityStaffs = Array<{
    m_Item1: Id,
    m_Item2: Full Name
  }>
*/

/* StaffNameOutput must be wrapped in a SchoolUtilityStaffsContainer */

const StaffNameOutput = (props: StaffNameOutputProps) => {
  if (props.utilityStaffs.payload && props.utilityStaffs.payload.length > 0) {
    const staffNameArray = props.utilityStaffs.payload.filter(staff => {
      if (props.id === staff.UserId) {
        return true;
      }
    });
    var staffName = '';
    if (staffNameArray.length > 0) {
      staffName = staffNameArray[0].Name;
    }
    return <span className={props.className || ''}>{staffName}</span>;
  } else {
    return <span>Error: Staff not found</span>;
  }
};

const mapStateToProps = state => {
  return {
    utilityStaffs: state.school.utilityStaffs,
  };
};

export default connect(StaffNameOutput, mapStateToProps);
