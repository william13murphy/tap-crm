import { roles } from 'util/auth/roles';

const routes: Array<{}> = [
  {
    name: 'My Profile',
    path: '/app/user/profile',
    icon: 'pt-icon-user',
    allow: roles.all,
  },
  {
    name: 'Account Settings',
    path: '/app/user/account',
    icon: 'pt-icon-lock',
    allow: roles.all,
  },
  {
    name: 'App Settings',
    path: '/app/user/application-settings',
    icon: 'pt-icon-cog',
    allow: roles.all,
  },
  {
    name: 'Help Desk',
    path: '/app/user/help-desk',
    icon: 'pt-icon-help',
    allow: roles.all,
  },
  {
    name: 'Task History',
    path: '/app/user/all-tasks',
    icon: 'pt-icon-manually-entered-data',
    allow: roles.SUBSET_SCHOOL_STAFF,
  },
  /*{
    name: 'Clock History',
    path: '/app/user/clock-history',
    icon: 'pt-icon-history',
    allow: roles.SUBSET_SCHOOL_STAFF,
  },*/
];

export default routes;
