import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../service/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInpunt>

  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInpunt')
  tagInput! : ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  searchTag( ): void{
    let newTagRaw = this.tagInput.nativeElement.value;
    const newTag = newTagRaw.trim();;
    this.gifsService.searchTag(newTag);
    this.limpiarCampo();
  }

  private limpiarCampo(): void{
    this.tagInput.nativeElement.value='';
  }

}
