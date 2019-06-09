import { roles } from 'util/auth/roles';
import IconCompass from 'assets/images/icon_compass2.svg';
import IconGates from 'assets/images/icon_gates.svg';
import IconGi from 'assets/images/icon_gi.svg';
import IconBilling from 'assets/images/icon_billing.svg';

//StudentApp routes are prepended with "/app" because they do not require :schoolId

const routes: Array<{}> = [
  {
    name: 'Dashboard',
    path: '/app/dashboard',
    icon: IconCompass,
    allow: roles.STUDENT,
  },
  {
    name: 'Programs',
    path: '/app/programs',
    icon: IconGi,
    allow: roles.STUDENT,
  },
  {
    name: 'School',
    path: '/app/school',
    icon: IconGates,
    allow: roles.STUDENT,
  },
  {
    name: 'Account',
    path: '/app/account',
    icon: IconBilling,
    allow: roles.STUDENT,
  },
];

export default routes;
