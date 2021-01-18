import { Injectable } from '@angular/core';
import { DocLinkFactory, DocLink } from '@c8y/ngx-components';
import { SuperheroService } from '../src/superhero/superhero.service';

/**
 * Extend the right-drawer with custom Quicklinks or Doclinks.
 * The only differnce between both is the type: 'doc' | 'quicklink'.
 * To disable or exclude documentation links which are resolved from
 * Cumulocity use the package.json of your app.
 */
@Injectable()
export class ExampleDocLinkFactory implements DocLinkFactory {
  constructor(private heroService: SuperheroService) {}

  get() {
    const docLinks: DocLink[] = [];
    docLinks.push({
      icon: 'c8y-icon c8y-icon-atom',
      label: 'Factory QLink',
      type: 'quicklink',
      url: '',
      click: () => this.customClick()
    });

    return docLinks;
  }

  customClick() {
    this.heroService.modalCreateHero();
  }
}
