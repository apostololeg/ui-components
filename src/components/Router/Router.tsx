import { Component, cloneElement, ReactNode } from 'react';
import { withStore } from 'justorm/react';

import './store';
import { parseRouteParams } from './Router.helpers';

type Props = {
  store?: any;
  children: ReactNode;
};

@withStore({ router: ['path'] })
export class Router extends Component<Props> {
  store;
  routes;

  constructor(props) {
    super(props);
    this.rebuildRoutes(props.children);
  }

  shouldComponentUpdate(nextProps) {
    this.rebuildRoutes(nextProps.children);
    return true;
  }

  rebuildRoutes(items) {
    this.routes = parseRouteParams(items);
  }

  getRoute() {
    let params;
    const { router } = this.props.store;
    const notExactRoutes = [];
    const route =
      this.routes.find(route => {
        const { path, exact, parsed } = route;

        if (exact) {
          if (path === router.path) return true;
        } else {
          notExactRoutes.push(route);
        }

        if (parsed) params = parsed.test(router.path);

        return Boolean(params);
      }) || notExactRoutes[0];

    return [route, params];
  }

  render() {
    const { router } = this.props.store;
    const [route, params] = this.getRoute();

    if (!route) return null;

    return cloneElement(route.Elem, { ...params, router });
  }
}

export * from './Link/Link';
export * from './Redirect';
