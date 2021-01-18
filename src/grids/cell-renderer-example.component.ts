import { Component } from '@angular/core';
import { CellRendererContext } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-cell-renderer-example',
  template: `
    <div>(({{ context.value.toLowerCase() }}))</div>
  `
})
export class CellRendererExampleComponent {
  constructor(public context: CellRendererContext) {}
}
