import {
  NAV_SUBNAV_ADD,
  NAV_SUBNAV_REMOVE,
  NAV_EFCNAV_HEIGHT,
  NAV_SCHOOLNAV_HEIGHT,
  NAV_MOBILENAV_HEIGHT,
  NAV_SUBNAV_HEIGHT,
  NAV_SIDENAV_OPEN,
  NAV_USERMENU_OPEN,
  NAV_MOBILE,
  NAV_MOBILE_OPEN,
} from 'src/redux/actionCreators/nav';

import { SCREEN_SIZE_TABLET_LARGE } from 'src/redux/actionCreators/screen';

export const navInitialState = {
  height: 0, // Paired with: /App/_base.less/@nav-height
  sidenavOpen: false,
  sideNavWidth: 0,
  usermenuOpen: false,
  mobile: false,
  mobileOpen: false,
  subNavHeight: 0,
  schoolNavHeight: 0,
  efcNavHeight: 0,
  mobileNavHeight: 0,
};

export const navReducer = (state, action) => {
  switch (action.type) {
    case NAV_SCHOOLNAV_HEIGHT:
      return Object.assign({}, state, {
        schoolNavHeight: action.payload,
      });
    case NAV_EFCNAV_HEIGHT:
      return Object.assign({}, state, {
        efcNavHeight: action.payload,
      });
    case NAV_MOBILENAV_HEIGHT:
      return Object.assign({}, state, {
        mobileNavHeight: action.payload,
      });
    case NAV_SUBNAV_HEIGHT:
      return Object.assign({}, state, {
        subNavHeight: action.payload,
      });

    case NAV_SIDENAV_OPEN:
      return Object.assign({}, state, {
        sidenavOpen: action.payload.sidenavOpen,
      });
    case NAV_USERMENU_OPEN:
      return Object.assign({}, state, {
        usermenuOpen: action.payload.usermenuOpen,
      });
    // case NAV_MOBILE:
    //   return Object.assign({}, state, {
    //     mobile: action.mobile,
    //   });
    case NAV_MOBILE_OPEN:
      return Object.assign({}, state, {
        mobileOpen: action.payload.mobileOpen,
      });
    case SCREEN_SIZE_TABLET_LARGE:
      return Object.assign({}, state, {
        mobile: !action.payload.sizeTabletLarge,
      });
    default:
      return state;
  }
};
