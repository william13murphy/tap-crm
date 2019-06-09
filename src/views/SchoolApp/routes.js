import { roles } from 'util/auth/roles';
import IconCompass from 'assets/images/icon_compass2.svg';
import IconGates from 'assets/images/icon_gates.svg';
import IconGi from 'assets/images/icon_gi.svg';
import IconBowing from 'assets/images/icon_bowing.svg';
import IconCharts from 'assets/images/icon_charts.svg';
import IconBilling from 'assets/images/icon_billing.svg';
import IconCoinFill from 'assets/images/icon_coin_fill.svg';

const routes: Array<{}> = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: IconCompass,
    allow: roles.LEVEL_INSTRUCT,
  },
  {
    name: 'School',
    path: '/school-detail',
    icon: IconGates,
    allow: roles.LEVEL_SCHUSER,
  },
  {
    name: 'Programs',
    path: '/programs',
    icon: IconGi,
    allow: roles.INSTRUCT,
  },
  {
    name: 'Students',
    path: '/students',
    // icon: 'fa-users',
    icon: IconBowing,
    allow: roles.LEVEL_INSTRUCT,
  },
  {
    name: 'Reports',
    path: '/reports',
    // icon: 'pt-icon-chart',
    icon: IconCharts,
    allow: roles.LEVEL_SCHUSER,
  },
  {
    name: 'Billing',
    path: '/billing',
    // icon: 'pt-icon-credit-card',
    icon: IconBilling,
    allow: roles.LEVEL_SCHUSER,
  },
  {
    name: 'Store',
    path: '/pos',
    icon: IconCoinFill,
    // icon: 'pt-icon-shopping-cart',
    // icon: 'fa-shopping-cart',
    allow: roles.LEVEL_INSTRUCT,
  },
];

export default routes;
