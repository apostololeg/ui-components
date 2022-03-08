type RouteLoader = () => Promise<any>;
export type RouteItem = {
  slug: string;
  loader: RouteLoader;
  items?: RouteLoader; // sub navigation
};

export default [
  {
    slug: 'button',
    loader: () => import('./examples/Button'),
  },
  {
    slug: 'checkbox',
    loader: () => import('./examples/Checkbox'),
  },
  // {
  //   slug: 'input',
  //   loader: () => import('./examples/Input/Input'),
  // },
  // {
  //   slug: 'icon',
  //   loader: () => import('./examples/Icon/Icon'),
  // },
  // // {
  // //   slug: 'menu',
  // //   loader: () => import('./examples/Menu/Menu'),
  // // },
  {
    slug: 'popup',
    loader: () => import('./examples/Popup'),
  },
  {
    slug: 'select',
    loader: () => import('./examples/Select/Select'),
    // items: () => import('./examples/Select/navigation'),
  },
  // {
  //   slug: 'scroll',
  //   loader: () => import('./examples/Scroll/Scroll'),
  // },
  // {
  //   slug: 'virtualized',
  //   loader: () => import('./examples/Virtualized/Virtualized'),
  // },
  // {
  //   slug: 'notifications',
  //   loader: () => import('./examples/Notifications/Notifications'),
  // },
] as RouteItem[];
