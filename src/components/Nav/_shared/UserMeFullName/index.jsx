import React from 'react';
import connect from 'src/redux/connect';
import './styles.less';

type UserMeFullNameProps = {
  onClick: Function,
  me: object,
};

// Functional Component that gets and displays the loggedIn user's full name.
const UserMeFullName = (props: UserMeFullNameProps) => (
  <div
    className={`UserMeFullName ${props.className || ''}`}
    onClick={props.onClick}
  >
    {props.me.payload.Profile.FirstName} {props.me.payload.Profile.LastName}
  </div>
);

const mapStateToProps = state => {
  return {
    me: state.user.me,
  };
};

export default connect(
  UserMeFullName,
  mapStateToProps
);
