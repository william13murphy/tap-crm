import moment from 'moment';

export const validate = values => {
  const errors = {};
  let currentTimeStamp = moment().valueOf();
  if (!values.Title) {
    errors.Title = 'Please enter a Name.';
  }
  if (!values.Description) {
    errors.Description = 'Please enter a Description.';
  }
  if (!values.AppointmentTypeId) {
    errors.AppointmentTypeId = 'Please select a type.';
  }
  if (!values.StartDate) {
    errors.StartDate = 'Please select a Start Date.';
  } else if (!moment(values.StartDate).isSameOrAfter(moment().startOf('day'))) {
    errors.StartDate = 'Start Date must be in future';
  }

  if (values.AdditionalMembers && values.AdditionalMembers.length > 0) {
    const membersArrayErrors = [];
    values.AdditionalMembers.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.FirstName) {
        memberErrors.FirstName = 'First Name is Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.LastName) {
        memberErrors.LastName = 'Last Name is Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });

    if (membersArrayErrors.length) {
      errors.AdditionalMembers = membersArrayErrors;
    }
  }

  if (values.Staffs && values.Staffs.length === 0) {
    errors.Staffs = 'Please add a Staff.';
  }

  if (values.Students && values.Students.length === 0) {
    errors.Students = 'Please add a Student.';
  }
  let startDate = moment(values.StartDate).startOf('day');
  let currentDate = moment().startOf('day');
  let startTime = moment(values.StartTimeUtc).valueOf();
  if (!values.StartTimeUtc) {
    errors.StartTimeUtc = 'Please select a Start Time';
  } else if (startTime <= currentTimeStamp && startDate.isSame(currentDate)) {
    errors.StartTimeUtc =
      'Start Time can not be less than or equal to current time';
  }
  if (!values.EndTimeUtc) {
    errors.EndTimeUtc = 'Please select a End Time';
  } else if (
    moment(values.EndTimeUtc).valueOf() <= moment(values.StartTimeUtc).valueOf()
  ) {
    errors.EndTimeUtc = 'End Time can not be less than or equal to Start time';
  }
  return errors;
};
