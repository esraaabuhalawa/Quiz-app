import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from "primeng/dialog";
import { IStudents } from '../../interfaces/students';
import { TranslatePipe } from '@ngx-translate/core';
import { Loader } from "../../../../../../../shared/components/loader/loader";
import { AvatarModule } from "primeng/avatar";
import { Tag } from "primeng/tag";
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-student',
  imports: [DialogModule, TranslatePipe, Loader, AvatarModule, Tag,UpperCasePipe,
    TitleCasePipe,CommonModule
  ],
  templateUrl: './view-student.html',
  styleUrl: './view-student.scss',
})
export class ViewStudent {
  @Input() visible = false;
@Input() loading = false;
@Input() selectedStudent: IStudents | null = null;

@Output() visibleChange = new EventEmitter<boolean>();


onHide() {
  this.visibleChange.emit(false);
  
}

}
