import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-page-layout',
  imports: [Button, RouterLink, TranslatePipe],
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

  onButtonClick() { this.buttonClick.emit();}
  onBoxButtonClick() { this.boxButtonClick.emit();}
}
