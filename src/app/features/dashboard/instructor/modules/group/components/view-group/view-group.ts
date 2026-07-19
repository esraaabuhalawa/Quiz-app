import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGroupDetails } from '../../interfaces/groups';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Tag } from 'primeng/tag';
import { CommonModule, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Loader } from "../../../../../../../shared/components/loader/loader";
import { AvatarModule } from 'primeng/avatar';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-view-group',
  imports: [DialogModule, AvatarModule ,
    InputTextModule, ButtonModule, TranslatePipe,Tag,
     UpperCasePipe, TitleCasePipe, Loader,ProgressBarModule,CommonModule],
  templateUrl: './view-group.html',
  styleUrl: './view-group.scss',
})
export class ViewGroup {
  @Input() selectedGroup: IGroupDetails | null = null;
  @Input() visible = false;
  @Input() loading = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  onHide() {
    this.visibleChange.emit(false);
  }
}
