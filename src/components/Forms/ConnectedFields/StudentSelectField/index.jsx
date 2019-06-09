import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';

type StudentSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  utilityStudents: {
    payload: [],
  },
};

const StudentSelectField = (props: StudentSelectFieldProps) => {
  if (props.utilityStudents.payload.length > 0) {
    return (
      <SelectField
        {...props}
        className={`${props.className || ''} StudentSelectField`}
        options={props.utilityStudents.payload.map(student => {
          return {
            label: student.Name,
            value: props.loadStudentId ? student.StudentId : student.UserId,
          };
        })}
      />
    );
  } else {
    return <div>Error: Students not found</div>;
  }
};

const mapStateToProps = state => {
  return {
    utilityStudents: state.school.utilityStudents,
  };
};

export default connect(
  StudentSelectField,
  mapStateToProps
);
