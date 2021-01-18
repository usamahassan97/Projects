import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { DynamicComponent } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-widget-config-demo',
  template: `
    <div class="form-group">
      <c8y-form-group>
        <label translate>Text</label>
        <textarea style="width:100%" [(ngModel)]="config.text" name="text" [required]="true"></textarea>
      </c8y-form-group>
    </div>
  `,
  // We connect our parent Form to this form (for disabling the save button)
  // you can also enable the button by using ContextServiceDashboard.formDisabled
  // property instead (by default it is enabled).
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class WidgetConfigDemo implements DynamicComponent {
  /**
   * The configuration which is shared between configuration component and display component.
   * Should be searilzabled to allow to save it to the API.
   */
  @Input() config: any = {};
}
