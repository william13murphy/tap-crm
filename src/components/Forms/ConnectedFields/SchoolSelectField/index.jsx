import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';

// Must be wrapped in AllSchoolsContainer.
// Requires state.client.allSchools

type SchoolSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  allSchools: {
    payload: Array<{
      Name: string,
      Id: string,
    }>,
  },
};

const SchoolSelectField = (props: SchoolSelectFieldProps) => {
  if (props.allSchools.payload.length > 0) {
    return (
      <SelectField
        {...props}
        className={`${props.className || ''} SchoolSelectField`}
        options={props.allSchools.payload.map(school => {
          return {
            label: school.Name,
            value: school.Id,
          };
        })}
      />
    );
  } else {
    return <div>Error: Schools not found</div>;
  }
};

const mapStateToProps = state => {
  return {
    allSchools: state.school.allSchools,
  };
};

export default connect(SchoolSelectField, mapStateToProps);
