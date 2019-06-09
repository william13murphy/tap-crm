import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';

type InstructorSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  instructors: {
    payload: Array<{
      Name: string,
      Id: string,
    }>,
  },
  disabled: boolean,
};

const InstructorSelectField = (props: InstructorSelectFieldProps) => {
  if (props.instructors.payload.length > 0) {
    return (
      <SelectField
        {...props}
        className={`${props.className || ''} InstructorSelectField`}
        options={props.instructors.payload.map(instructor => {
          return {
            label:
              instructor.User.Profile.FirstName +
              ' ' +
              instructor.User.Profile.LastName,
            value: instructor.UserId,
          };
        })}
      />
    );
  } else {
    return <div>Error: Instructors not found</div>;
  }
};

const mapStateToProps = state => {
  return {
    instructors: state.school.instructors,
  };
};

export default connect(InstructorSelectField, mapStateToProps);
