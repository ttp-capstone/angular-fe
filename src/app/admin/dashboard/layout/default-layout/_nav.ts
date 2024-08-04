import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/admin/dashboard',
  //   iconComponent: { name: 'cil-speedometer' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Menu'
  // },
  {
    name: 'Projects',
    url: '/applications',
    iconComponent: { name: 'cil-list' }
  },
  {
    name: 'Funds',
    url: '/theme/typography',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-dollar' }
  },
  {
    name: 'Users',
    url: '/users',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-user' }
  },
  // {
  //   title: true,
  //   name: 'Settings'
  // },
  // {
  //   name: 'My Account',
  //   url: '/login',
  //   iconComponent: { name: 'cil-user' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto'
  },
  {
    name: 'Logout',
    url: '/logout',  
    iconComponent: { name: 'cil-AccountLogout' },
    attributes: { target: '_self' }  
  }
];


