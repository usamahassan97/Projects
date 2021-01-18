import { _ } from '@c8y/ngx-components';
import { Component } from '@angular/core';
import { InventoryService, IManagedObject, IResultList } from '@c8y/client';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The DevicesComponent defines a few methods that can be
 * used to get, add and delete managedObjects as devices.
 * You can also create a deviceService (this would be a cleaner way)
 * that handles all these things and more. Then inject the new service
 * via constructor into this component.
 * For simple demonstration purpose we went without a service !
 */
@Component({
  selector: 'devices',
  templateUrl: './devices.component.html'
})
export class DevicesComponent {
  devices: IResultList<IManagedObject>;
  informationText: string;
  filterPipe;
  pattern = '';
  selected = {id: null, name: ''};

  // The filter object will add query parameters
  // to the request which is made by the service.
  private filter: object = {
    fragmentType: 'c8y_IsDevice',
    // paging information will be a part of the response now
    withTotalPages: true,
    pageSize: 10
  };

  constructor(private inventory: InventoryService) {
    // _ annotation to mark this string as translatable string.
    this.informationText = _('Ooops! It seems that there is no device to display.');
    this.loadDevices();
  }

  // Promise-based usage of InventoryService.
  async loadDevices() {
    this.devices = await this.inventory.list(this.filter);
  }

  // Add a managedObject (as device) to the database.
  async addDevice(name: string) {
    let device = {
      c8y_IsDevice: {}
    };

    if (name && name.length > 0) {
      device = Object.assign({ name }, device);
    }

    await this.inventory.create(device);
    this.loadDevices();
  }

  // Delete a managedObject (as device) with given id from database.
  async deleteDevice(id: string) {
    if (id && id.length > 0) {
      await this.inventory.delete(id);
      this.loadDevices();
    }
  }

  // Sets a rxjs pipe on the list to filter for it.
  setPipe(filterStr: string) {
    this.pattern = filterStr;
    this.filterPipe = pipe(
      map((data: []) => {
        return data.filter(
          (mo: any) => mo.name && mo.name.toLowerCase().indexOf(filterStr.toLowerCase()) > -1
        );
      })
    );
  }

  // triggered if a device is selected
  updateSelected(checked, device) {
    console.log(checked, device);
  }
}
