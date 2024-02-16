import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/service/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles:`.bg-oscuro{
    background:#343434;
  }
  #sidebar{
    height: 100vh;
    min-width:18rem;
  }
  `
})
export class SidebarComponent {

  constructor( private gifsService: GifsService){}

  get Listado(): Array<string>{
    return this.gifsService.tagsHistory;
  }

  doSearch(tag: string): void{
    this.gifsService.searchTag(tag);
  }

}
