import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: 'my/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: ''
    }
  },
  {
    title: true,
    name: 'Menu'
  },
  {
    name: 'My Projects',
    url: 'my/projects',
    iconComponent: { name: 'cil-Tags' }
  },
  {
    name: 'Applied funding',
    url: 'my/funding/applied',
    iconComponent: { name: 'cil-Tags' }
  },
  // {
  //   name: 'Funds',
  //   url: '/lok',
  //   linkProps: { fragment: 'headings' },
  //   iconComponent: { name: 'cil-dollar' }
  // }
  // ,
  {
    title: true,
    name: 'Settings'
  },
  {
    name: 'My Account',
    url: 'my/account',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Settings',
        url: 'my/account',
        icon: 'nav-icon-bullet'
      },
      // {
      //   name: 'Register',
      //   url: '/register',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Error 404',
      //   url: '/404',
      //   icon: 'nav-icon-bullet'
      // },
      // {
      //   name: 'Error 500',
      //   url: '/500',
      //   icon: 'nav-icon-bullet'
      // }
    ]
  },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto'
  },
  {
    name: 'Logout',
    url: 'my/account/logout',
    iconComponent: { name: 'cil-AccountLogout' },
  }
];
