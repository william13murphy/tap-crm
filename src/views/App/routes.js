import { roles } from 'util/auth/roles';

const routes: Array<{}> = [
  {
    name: 'Login',
    path: '/login',
    routes: [
      {
        name: 'Request Password',
        path: '/login/request-password',
      },
    ],
  },
  {
    name: 'Create Password',
    path: '/password/create',
  },
];

export default routes;
