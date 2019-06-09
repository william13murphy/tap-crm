import { roles } from 'util/auth/roles';
import IconCompass from 'assets/images/icon_compass2.svg';
import IconGear from 'assets/images/icon_gear.svg';
import IconClients2 from 'assets/images/icon_clients2.svg';
import IconGates from 'assets/images/icon_gates.svg';
import IconBowing from 'assets/images/icon_bowing.svg';
import IconBilling from 'assets/images/icon_billing.svg';

// SchoolApp icons:
import IconCharts from 'assets/images/icon_charts.svg';
import IconCoinFill from 'assets/images/icon_coin_fill.svg';

const routes: Array<{}> = [
  {
    name: 'EFC Dashboard',
    path: '/app/efc-dashboard',
    icon: IconCompass,
    allow: roles.SUBSET_EFC_STAFF,
  },
  {
    name: 'Admin',
    path: '/app/admin',
    icon: IconGear,
    allow: roles.SUBSET_EFC_STAFF,
  },
  {
    name: 'Clients',
    path: '/app/clients',
    icon: IconClients2,
    allow: roles.SUBSET_EFC_STAFF,
  },
  {
    name: 'Schools',
    path: '/app/school-app',
    icon: IconGates,
    allow: roles.SUBSET_EFC_STAFF,
  },
  {
    name: 'User Search',
    path: '/app/students',
    icon: IconGates,
    allow: roles.SUBSET_EFC_STAFF,
  },
  // {
  //   name: 'Billing',
  //   path: '/app/billing',
  //   // icon: 'pt-icon-credit-card',
  //   icon: IconBilling,
  //   allow: roles.LEVEL_EFCBILL,
  // },
];

export default routes;
