import { Injectable } from '@angular/core';

import { environmetns } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor( private http : HttpClient) { }

  get tagsHistory(): Array<string>{
    //? Usamos spread para mandar una copiar y cortar la referencia en memoria.
    return [...this._tagsHistory];
  }

  public searchTag( tag: string): void{
    // Meter el tag el primero
    if(this.isValidate(tag) ){
      this.organizeArray(tag);
    }

    // this.realizarBusqueda(tag);

  }

  realizarBusqueda(tag: string) {
    let baseUrl  : string = environmetns.baseUrl;
    let endpoint : string = environmetns.endpoint.search;
    // let params : HttpParams;

    //? Al ser un Obrsevable => Esperamos algo de el.
    //? Por eso se hace --> .subscribe( res => { acciones })
    // this.http.get(`${baseUrl}/${endpoint}`)
    //          .subscribe( response => {
    //           console.log(response);
    //          });

  }


  organizeArray(tag : string): void {
    if(this.contain(tag))
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag!=tag.toLowerCase());
    this._tagsHistory.unshift(tag.toLocaleLowerCase());
    this._tagsHistory = this.tagsHistory.splice(0, 12);
  }

  isValidate(tag : string): boolean{
    if(tag.length==0)
      return false;
    return true;
  }


  private contain(tag: string) {
    return this.tagsHistory.includes(tag.toLocaleLowerCase());
  }


}
