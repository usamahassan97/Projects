import { Injectable } from '@angular/core';
import { NavigatorNode, NavigatorNodeFactory, gettext } from '@c8y/ngx-components';

@Injectable()
export class ExampleNavigationFactory implements NavigatorNodeFactory {
  // Implement the get()-method, otherwise the ExampleNavigationFactory
  // implements the NavigatorNodeFactory interface incorrectly (!)
  get() {
    const navs: NavigatorNode[] = [];

    /**
     * mandantory for a NavigatorNode is:
     *  - label (string)
     *  - path (string)
     * A click on the NavigatorNode will load the given path and therefore angular loads the
     * specified component (check: ../app.modules.ts)
     */
    navs.push(
      new NavigatorNode({
        label: gettext('Home'),
        icon: 'home',
        path: '/hello',
        priority: 100
      })
    );
    navs.push(
      new NavigatorNode({
        label: gettext('Courses'),
        icon: 'book',
        path: '/world',
        priority: 99,
        routerLinkExact: false
      })
    );
    navs.push(
      new NavigatorNode({
        label: gettext('Event'),
        icon: 'calendar-o',
        path: '/superhero',
        priority: 98
      })
    );
    navs.push(
      new NavigatorNode({
        label: gettext('Contact'),
        //icon: 'c8y-device',
        icon: 'phone',
        path: '/device',
        priority: 97,
        routerLinkExact: false
      })
    );

    const dashboards = new NavigatorNode({
      label: gettext('Addmission'),
      icon: 'th'
    });
    // dashboards.add(
    //   new NavigatorNode({
    //     label: gettext('Context dashboard'),
    //     path: '/dashboards/context',
    //     icon: 'list-alt',
    //     priority: 10
    //   })
    // );
    // dashboards.add(
    //   new NavigatorNode({
    //     label: gettext('Widget dashboard'),
    //     path: '/dashboards/widget',
    //     icon: 'th-list',
    //     priority: 5
    //   })
    // );
    // dashboards.add(
    //   new NavigatorNode({
    //     label: gettext('Custom dashboard'),
    //     path: '/dashboards/custom',
    //     icon: 'th-large',
    //     priority: 0
    //   })
    // );
    navs.push(dashboards);
    // TODO: uncomment when "How to" for data-grid is ready (MTM-31787).
    // navs.push(this.getGridNavs());
    return navs;
  }

  private getGridNavs(): NavigatorNode {
    const grids = new NavigatorNode({
      label: gettext('Grids'),
      icon: 'table'
    });
    grids.add(
      new NavigatorNode({
        label: gettext('Data grid'),
        path: '/grids/data-grid',
        icon: 'table'
      })
    );
    return grids;
  }
}
