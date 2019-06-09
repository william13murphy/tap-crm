import React from 'react';
import connect from 'src/redux/connect';
import NavNavLinkMock from 'components/Nav/SchoolNav/NavNavLinkMock';
import { navUsermenuOpen } from 'src/redux/actionCreators/nav';
import AvatarBlankTransparent from 'assets/images/avatar_blank_transparent.png';
import UserMeContainer from 'src/containers/User/UserMeContainer';
import UserMenu from './UserMenu';
import UserMeFullName from 'components/Nav/_shared/UserMeFullName';

type UserNavLinkProps = {
  usermenuOpen: boolean,
  dispatchNavUsermenuOpen: Function,
  efcNav: boolean,
};

const UserNavLink = (props: UserNavLinkProps) => {
  return (
    <div>
      <div>
        {props.efcNav ? (
          <NavNavLinkMock
            handleClick={() =>
              props.dispatchNavUsermenuOpen(!props.usermenuOpen)
            }
            icon={AvatarBlankTransparent}
            name="User"
          />
        ) : (
          <UserMeContainer
            loading={{ width: 50 }}
            options={{ spinnerSmall: true }}
          >
            <UserMeFullName
              onClick={() => props.dispatchNavUsermenuOpen(!props.usermenuOpen)}
            />
          </UserMeContainer>
        )}
      </div>
      <UserMenu
        open={props.usermenuOpen}
        dispatchNavUsermenuOpen={props.dispatchNavUsermenuOpen}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ...state.nav,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchNavUsermenuOpen: usermenuOpen => {
      dispatch(navUsermenuOpen({ usermenuOpen }));
    },
  };
};

export default connect(
  UserNavLink,
  mapStateToProps,
  mapDispatchToProps
);
