import { NgModule } from '@angular/core';
//import {component} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule as ngRouterModule, Routes } from '@angular/router';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { ExampleActionFactory } from './factories/Action';
import { ExampleBreadcrumbFactory } from './factories/Breadcrumb';
import { ExampleNavigationFactory } from './factories/Navigation';
import { ExampleTabFactory } from './factories/Tab';
import { AwesomeComponent } from './src/awesome/awesome.component';
import { HelloComponent } from './src/hello/hello.component';
import { OutstandingComponent } from './src/outstanding/outstanding.component';
import { SuperheroComponent } from './src/superhero/superhero.component';
import { SuperheroService } from './src/superhero/superhero.service';
import { WorldComponent } from './src/world/world.component';
import { DevicesComponent } from './src/devices/devices.component';
import {
  CoreModule,
  HOOK_ACTION,
  HOOK_BREADCRUMB,
  HOOK_NAVIGATOR_NODES,
  HOOK_TABS,
  BootstrapComponent,
  RouterModule,
  ViewContext,
  HOOK_ONCE_ROUTE,
  HOOK_DOCS
} from '@c8y/ngx-components';

import { DeviceInfoComponent } from './src/devices/device-info.component';
import { DeviceAlarmsComponent } from './src/devices/device-alarms.component';
import { RandomGuard } from './guards/random.guard';
//import { hooks as lazyHooks } from './src/lazy/lazy.hooks';
import { DashboardWidgetDemoModule } from './src/widget/demo-widget.module';
import { CustomDashboardComponent } from './src/dashboard/custom-dashboard.component';
import { WidgetDashboardComponent } from './src/dashboard/widget-dashboard.component';
import { ContextDashboardComponent } from './src/dashboard/context-dashboard.component';
import { SuperheroStepperComponent } from './src/superhero/superhero-stepper.component';
import { DataGridExampleComponent } from './src/grids/data-grid-example.component';
import { CellRendererExampleComponent } from './src/grids/cell-renderer-example.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExampleDocLinkFactory } from './factories/DocLink';
//import {MatTableModule} from '@angular/material/table';

/**
 * Angular Routes.
 * Within this array at least path (url) and components are linked.
 */
const appRoutes: Routes = [
  {
    path: 'hello',
    component: HelloComponent
  },
  {
    path: 'world',
    redirectTo: 'world/awesome'
  },
  { path: 'superhero', component: SuperheroComponent },
  {
    path: 'world/awesome',
    component: AwesomeComponent
  },
  {
    path: 'world/outstanding',
    component: OutstandingComponent
  },
  {
    path: 'device',
    component: DevicesComponent
  },
  {
    path: 'dashboards/custom',
    component: CustomDashboardComponent
  },
  {
    path: 'dashboards/widget',
    component: WidgetDashboardComponent
  },
  {
    path: 'dashboards/context',
    component: ContextDashboardComponent
  },
  {
    path: 'grids/data-grid',
    component: DataGridExampleComponent
  },
  {
    path: 'lazy',
    loadChildren: () => import('./src/lazy/lazy.module').then(m => m.LazyLoadedModule)
  },
  {
    path: '',
    redirectTo: 'hello',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    HelloComponent,
    WorldComponent,
    AwesomeComponent,
    OutstandingComponent,
    SuperheroComponent,
    SuperheroStepperComponent,
    DevicesComponent,
    DeviceInfoComponent,
    DeviceAlarmsComponent,
    CustomDashboardComponent,
    WidgetDashboardComponent,
    ContextDashboardComponent,
    DataGridExampleComponent,
    CellRendererExampleComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    ngRouterModule.forRoot(appRoutes, { enableTracing: false, useHash: true }),
    RouterModule.forRoot(),
    // Import the CoreModule to add c8y functionality
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DashboardWidgetDemoModule,
    ContextDashboardModule.config()
  ],
  /**
   * Use our predefined InjectionTokens and provide your own classes to extend behavior
   * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs
   */
  providers: [
    BsModalRef,
    RandomGuard,
    { provide: HOOK_NAVIGATOR_NODES, useClass: ExampleNavigationFactory, multi: true },
    { provide: HOOK_TABS, useClass: ExampleTabFactory, multi: true },
    { provide: HOOK_ACTION, useClass: ExampleActionFactory, multi: true },
    { provide: HOOK_BREADCRUMB, useClass: ExampleBreadcrumbFactory, multi: true },
    { provide: HOOK_DOCS, useClass: ExampleDocLinkFactory, multi: true },

    /**
     * Route hooks allow you to use routes as child routes on a ViewContext. If used with a context
     * the particular data is resolved automatically and the page is extended by a tab. Contexts
     * are currently Application, Device, Group, Tenant and User. Note: All components used here
     * needs to be used as EntryComponent!
     */
    {
      provide: HOOK_ONCE_ROUTE,
      useValue: [
        {
          path: 'alarms',
          context: ViewContext.Device,
          component: DeviceAlarmsComponent,
          label: 'Alarms',
          priority: 100,
          icon: 'bell'
        },
        {
          path: 'info',
          context: ViewContext.Device,
          component: DeviceInfoComponent,
          label: 'Info',
          priority: 0,
          icon: 'info',
          /**
           * An example of an route guard which randomly activates
           * the child route. See Guards documentation from Angular
           * for more details.
           */
          canActivate: [RandomGuard]
        }
      ],
      multi: true
    },
    SuperheroService,
  //  ...lazyHooks
  ],
  /**
   * Bootstrap your application with the BootstrapComponent which will use the `<c8y-bootstrap>`
   * component to initialize the root application. Alternatively you can bootstrap
   * a component of your choice and include that tag into its template or only reuse the given components
   */
  bootstrap: [BootstrapComponent],
  /**
   * The EntryComponents to allow the HOOK_ONCE_ROUTE to work.
   */
  entryComponents: [
    DeviceInfoComponent,
    DeviceAlarmsComponent,
    SuperheroStepperComponent,
    CellRendererExampleComponent
  ]
})
export class AppModule {}
