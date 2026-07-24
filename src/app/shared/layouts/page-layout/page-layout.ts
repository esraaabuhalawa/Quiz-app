import { Component, EventEmitter, Input, output, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from "primeng/inputtext";

@Component({
  selector: 'app-page-layout',
  imports: [Button, RouterLink, TranslatePipe,InputIcon,IconField, InputText],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.scss',
})
export class PageLayout {
  @Input() title!: string;
  @Input() showButton = false;
  @Input() linkUrl?: string;
  @Input() linkLabel!: string;
  @Input() buttonLabel!: string;

  @Input() boxTitle!: string;
  @Input() showBoxButton = false;
  @Input() boxLinkUrl?: string;
  @Input() boxButtonLabel!: string;

  @Output() buttonClick = new EventEmitter<void>();
  @Output() boxButtonClick = new EventEmitter<void>();
 // @Output() boxSearch = new EventEmitter<void>();

  searchValue = signal('');


  onButtonClick() { this.buttonClick.emit();}
  onBoxButtonClick() { this.boxButtonClick.emit();}

  boxSearch = output<string>();

  onSearch(value: string): void {
    this.searchValue.set(value);
    this.boxSearch.emit(value);
  }
}
