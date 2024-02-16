import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {

  private _gifsList : Array<Gif>;

  constructor(){
    this._gifsList = [];
  }

  get gifsList(): Array<Gif>{
    return this._gifsList;
  }
  @Input()
  set gifsList(gifsList : Array<Gif>){
    this._gifsList = gifsList;
  }

}
