import { Component, inject, signal } from '@angular/core';
import { PageLayout } from '../../../../../../../shared/layouts/page-layout/page-layout';
import { StudentsService } from '../../services/students.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { IStudents } from '../../interfaces/students';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Loader } from '../../../../../../../shared/components/loader/loader';
import { EmptyStateComponent } from '../../../../../../../shared/components/empty-state/empty-state.component';
import { AlertDeleteService } from '../../../../../../../shared/components/delete/services/alert-delete-sevice';

@Component({
  selector: 'app-student-list',
  imports: [PageLayout, Paginator, TranslatePipe, Loader, EmptyStateComponent],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList {
  private studentsService = inject(StudentsService);
  private readonly messageService = inject(MessageService);
  private translate = inject(TranslateService);
  private deleteService = inject(AlertDeleteService);

  allStudents = signal<IStudents[]>([]);
  studentsList = signal<IStudents[]>([]);
  isLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalRecords = signal<number>(0);

  ngOnInit(): void {}

  //Delete Student
  openDeleteDialog(student: IStudents): void {
    this.deleteService.open({
      config: {
        title: this.translate.instant('students.delete_title'),
        confirmMessage: this.translate.instant('students.delete_confirm_message'),
        warningNote: this.translate.instant('students.delete_warning_note'),
        item: {
          name: `${student.first_name} ${student.last_name}`,
          subtitle: `${student.email} • ${student.group?.name ?? ''}`,
          iconBg: 'dark',
          // لو عند الطالب صورة profile: image: student.photoUrl
        },
      },
      request: () => this.studentsService.deleteStudent(student._id),
      successMessage: this.translate.instant('students.delete_success'),
      // onSuccess: () => this.fetchStudentsData(),
    });
  }

  //Helper Functions
  private updateDisplayedStudents() {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    this.studentsList.set(this.allStudents().slice(start, end));
  }

  onPageChange(event: PaginatorState) {
    this.currentPage.set((event.page ?? 0) + 1);
    this.pageSize.set(event.rows ?? 10);
    this.updateDisplayedStudents();
  }
}
