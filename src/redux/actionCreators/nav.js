import { createAction } from 'redux-actions';

// Action type constants
export const NAV_SIDENAV_OPEN = 'nav/SIDENAV_OPEN';
export const NAV_USERMENU_OPEN = 'nav/USERMENU_OPEN';
export const NAV_MOBILE = 'nav/MOBILE';
export const NAV_MOBILE_OPEN = 'nav/MOBILE_OPEN';

export const NAV_SUBNAV_ADD = 'nav/SUBNAV_ADD';
export const NAV_SUBNAV_REMOVE = 'nav/SUBNAV_REMOVE';
export const NAV_SUBNAV_HEIGHT = 'nav/SUBNAV_HEIGHT';
export const NAV_SCHOOLNAV_HEIGHT = 'nav/SCHOOLNAV_HEIGHT';
export const NAV_EFCNAV_HEIGHT = 'nav/EFCNAV_HEIGHT';
export const NAV_MOBILENAV_HEIGHT = 'nav/MOBILENAV_HEIGHT';

// Action objects
export const navSidenavOpen = createAction(NAV_SIDENAV_OPEN);
export const navUsermenuOpen = createAction(NAV_USERMENU_OPEN);
export const navMobile = createAction(NAV_MOBILE);
export const navMobileOpen = createAction(NAV_MOBILE_OPEN);

export const navSubNavHeight = createAction(NAV_SUBNAV_HEIGHT);

export const navSchoolNavHeight = createAction(NAV_SCHOOLNAV_HEIGHT);
export const navEfcNavHeight = createAction(NAV_EFCNAV_HEIGHT);
export const navMobileNavHeight = createAction(NAV_MOBILENAV_HEIGHT);
