import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Loader } from '../../../../../../../shared/components/loader/loader';
import { Tag } from 'primeng/tag';
import { TranslatePipe } from '@ngx-translate/core';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { IQuestion } from '../../interfaces/questions';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-question',
  imports: [Dialog, Loader, Tag, CommonModule, TranslatePipe, TitleCasePipe, UpperCasePipe],
  templateUrl: './view-question.html',
  styleUrl: './view-question.scss',
})
export class ViewQuestion {
  @Input() selectedQuestion: IQuestion | null = null;
  @Input() visible = false;
  @Input() loading = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onHide = new EventEmitter<void>();
  handleHide() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onHide.emit();
  }
}
