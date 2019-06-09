import React from 'react';

import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import SchoolUtilityStudentsContainer from 'containers/School/SchoolUtilityStudentsContainer';

import StaffSelectField from 'components/Forms/ConnectedFields/StaffSelectField';
import StudentSelectField from 'components/Forms/ConnectedFields/StudentSelectField';
import TextField from 'components/Forms/TextField';

import InputBlock from 'components/Forms/InputBlock';
import ValidatedInput from 'components/Forms/ValidatedInput';

import './styles.less';

type AdditionalMembersProps = {
  schoolId: string,
  title: string,
  fields: [],
  member: string,
  appContext: {
    schoolId: string,
  },
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const AdditionalMembers = (
  // props: MemberListProps,
  { fields, meta: { error, submitFailed } }
) => {
  return (
    <div className="AdditionalMembers__container">
      <button
        type="button"
        className="AddMembers__button pt-button pt-icon pt-icon-add"
        onClick={() => {
          fields.push({});
        }}
      >
        <span className="AddMembers__title">Add Members</span>
      </button>

      {fields.map((item, index) => (
        <div key={index} className="AdditionalMembers__display">
          <InputBlock key={index}>
            <TextField
              label="First Name*"
              name={`${item}.FirstName`}
              component={ValidatedInput}
              placeholder="First Name"
              required={true}
              help={true}
            />
            <TextField
              label="Last Name*"
              name={`${item}.LastName`}
              component={ValidatedInput}
              placeholder="Last Name"
              required={true}
              help={true}
            />
            <TextField
              label="Email*"
              name={`${item}.Email`}
              component={ValidatedInput}
              placeholder="Email"
              required={true}
              help={true}
            />
          </InputBlock>
          <button
            className="AdditionalMembers__delete pt-button pt-icon pt-icon-trash"
            type="button"
            onClick={() => fields.remove(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default AdditionalMembers;
