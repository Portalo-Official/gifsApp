import { Injectable } from '@angular/core';

import { environmetns } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory : Array<string>;

  private gifsList     : Array<Gif>;

  constructor( private http : HttpClient) {
    this._tagsHistory = [];
    this.gifsList     = [];
    this.loadLocalStorage();
   }

  get tagsHistory(): Array<string>{
    //? Usamos spread para mandar una copiar y cortar la referencia en memoria.
    return [...this._tagsHistory];
  }

  public searchTag( tag: string): void{
    // Meter el tag el primero
    if(this.isValidate(tag) ){
      this.organizeArray(tag);
      this.realizarBusqueda(tag);
    }

  }

  private realizarBusqueda(tag: string):void {
    let baseUrl  : string = environmetns.baseUrl;
    let endpoint : string = environmetns.endpoint.search;
    let params : HttpParams = new HttpParams()
                                  .set('api_key', environmetns.apiKey)
                                  .set('limit', 10)
                                  .set('q',tag);

    // ? Al ser un Obrsevable => Esperamos algo de el.
    // ? Por eso se hace --> .subscribe( res => { acciones })
    this.http.get<SearchResponse>(`${baseUrl}/${endpoint}`, { params : params})
             .subscribe( (resp) => {
              this.gifs = resp.data;
             });

  }

  private set gifs( gifsList: Array<Gif>){
    this.gifsList = gifsList;
  }

  public get gifs(): Array<Gif>{
    return this.gifsList;
  }

  organizeArray(tag : string): void {
    if(this.contain(tag))
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag!=tag.toLowerCase());
    this._tagsHistory.unshift(tag.toLocaleLowerCase());

    this._tagsHistory = this.tagsHistory.splice(0, 12);
    this.saveLocalStorage();
  }

  isValidate(tag : string): boolean{
    if(tag.length==0)
      return false;
    return true;
  }

  private contain(tag: string): boolean {
    return this.tagsHistory.includes(tag.toLocaleLowerCase());
  }

  private saveLocalStorage(): void{
    /* this._tagsHistory es una Array, pero localstroage necesita un string, hay que seriealizarlo
      JSON.stringify() --> serializa los objetos en string
    */
    localStorage.setItem('historyTags',  JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void{
    if(!localStorage.getItem('historyTags')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('historyTags')!) ;
    if(this.tagsHistory.length != 0)
      this.realizarBusqueda(this._tagsHistory[0]);
  }
}
