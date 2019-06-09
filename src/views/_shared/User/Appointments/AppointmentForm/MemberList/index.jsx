import React from 'react';

import SchoolUtilityStaffsContainer from 'containers/School/SchoolUtilityStaffsContainer';
import SchoolUtilityStudentsContainer from 'containers/School/SchoolUtilityStudentsContainer';

import StaffSelectField from 'components/Forms/ConnectedFields/StaffSelectField';
import StudentSelectField from 'components/Forms/ConnectedFields/StudentSelectField';

import './styles.less';

type MemberListProps = {
  schoolId: string,
  title: string,
  fields: [],
  member: string,
  appContext: {
    schoolId: string,
  },
};

const Member = {
  Staff: {
    Container: SchoolUtilityStaffsContainer,
    Field: StaffSelectField,
  },
  Student: {
    Container: SchoolUtilityStudentsContainer,
    Field: StudentSelectField,
  },
};

const MemberList = (props: MemberListProps) => {
  let SelectedMember = props.member === 'Staff' ? Member.Staff : Member.Student;

  return (
    <ul className="MemberList">
      <SelectedMember.Container dispatchFetchParams={props.schoolId}>
        {props.fields.map((item, index) => (
          <li key={index} className="flex align-items-center">
            <SelectedMember.Field className="MemberList__add" name={item} />
            <button
              className="MemberList__remove pt-button"
              type="button"
              onClick={() => props.fields.remove(index)}
            >
              X
            </button>
          </li>
        ))}
      </SelectedMember.Container>
      <li>
        <button
          type="button"
          className="MemberList__add pt-button"
          onClick={() => {
            props.fields.push({});
          }}
        >
          {props.title}
        </button>
      </li>
    </ul>
  );
};

export default MemberList;
