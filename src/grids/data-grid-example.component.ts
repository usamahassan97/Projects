import { Component, OnInit } from '@angular/core';
import { getFakeData } from './fake-data';
import { CellRendererExampleComponent } from './cell-renderer-example.component';
import {
  ActionControl,
  BuiltInActionType,
  BulkActionControl,
  Column,
  ColumnDataRecordClassName,
  Pagination
} from '@c8y/ngx-components';

@Component({
  selector: 'c8y-data-grid-example',
  templateUrl: './data-grid-example.component.html'
})
export class DataGridExampleComponent implements OnInit {
  columns: Column[] = [
    { name: 'id', header: 'ID', path: 'id' },
    {
      name: 'name',
      header: 'Name',
      path: 'name',
      cellCSSClassName: ColumnDataRecordClassName.Header,
      filterable: true,
      cellRendererComponent: CellRendererExampleComponent
    },
    {
      name: 'type',
      header: 'Type',
      path: 'type',
      filterable: true,
      cellRendererComponent: CellRendererExampleComponent
    },
    { name: 'creationTime', header: 'Creation time', path: 'creationTime' },
    { name: 'lastUpdated', header: 'Last updated', path: 'lastUpdated' },
    { name: 'owner', header: 'Owner', path: 'owner' }
  ];
  pagination: Pagination = {
    pageSize: 30,
    currentPage: 1
  };
  actionControls: ActionControl[] = [
    { type: BuiltInActionType.Delete, callback: item => console.dir(item) },
    { type: BuiltInActionType.Edit, callback: item => console.dir(item) },
    { type: BuiltInActionType.Delete, callback: item => console.dir(item) }
  ];
  bulkActionControls: BulkActionControl[] = [
    { type: BuiltInActionType.Export, callback: selectedItemIds => console.dir(selectedItemIds) },
    { type: BuiltInActionType.Delete, callback: selectedItemIds => console.dir(selectedItemIds) }
  ];
  fakeData: any[];

  ngOnInit() {
    this.fakeData = getFakeData();
  }

  handleItemsSelect(selectedItemIds) {
    console.log('selected item ids:');
    console.dir(selectedItemIds);
  }

  handleClick() {
    this.fakeData[0].id = Math.random();
  }
}
