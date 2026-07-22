import { Component, computed, inject, signal } from '@angular/core';
import { PageLayout } from '../../../../../../../shared/layouts/page-layout/page-layout';
import { StudentsService } from '../../services/students.service';
import { MessageService } from 'primeng/api';
import { IStudents } from '../../interfaces/students';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Loader } from '../../../../../../../shared/components/loader/loader';
import { EmptyStateComponent } from '../../../../../../../shared/components/empty-state/empty-state.component';
import { AlertDeleteService } from '../../../../../../../shared/components/delete/services/alert-delete-sevice';
import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { GroupsService } from '../../../group/services/groups.service';
import { IGroupData } from '../../../group/interfaces/groups';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-student-list',
  imports: [PageLayout, Loader, EmptyStateComponent, Paginator, Button, Avatar, TranslatePipe],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList {
  private studentsService = inject(StudentsService);
  private readonly messageService = inject(MessageService);
  private translate = inject(TranslateService);
  private deleteService = inject(AlertDeleteService);
  private groupsService = inject(GroupsService);

  selectedGroupId = signal<string | null>(null);
  groupsList = signal<IGroupData[]>([]);
  allStudents = signal<IStudents[]>([]);
  isLoading = signal<boolean>(true);

  first = signal(0);
  pageSize = signal<number>(10);

  //students after selecting group
  filteredStudents = computed(() => {
    const groupId = this.selectedGroupId();
    if (!groupId) return this.allStudents();
    return this.allStudents().filter((s) => s.group?._id === groupId);
  });

  //student after pagination
  studentsList = computed(() => {
    const start = this.first();
    const end = start + this.pageSize();
    return this.filteredStudents().slice(start, end);
  });

  totalRecords = computed(() => this.filteredStudents().length);

  ngOnInit(): void {
    this.loadGroups();
    this.loadStudents();
  }

  loadGroups(): void {
    this.groupsService.getAllGroups().subscribe({
      next: (groups) => {
        this.groupsList.set(groups);
      },
    });
  }

  loadStudents(): void {
    this.isLoading.set(true);
    this.studentsService.getAllStudents().subscribe({
      next: (students) => {
        this.allStudents.set(students);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
  selectAllGroups(): void {
    this.selectedGroupId.set(null);
    this.first.set(0);
  }
  selectGroup(groupId: string): void {
    this.selectedGroupId.set(groupId);
    this.first.set(0);
  }

  onPageChange(event: PaginatorState): void {
    this.first.set(event.first ?? 0);
    this.pageSize.set(event.rows ?? 10);
  }

  openEditDialog(student: IStudents): void {
    //  this.router.navigate();
  }
  //view student
  viewStudent(student: IStudents): void {}

  //delete student & remove from group
  openDeleteDialog(student: IStudents): void {
    const groupId = student.group?._id;

    if (groupId) {
      this.deleteService.open({
        config: {
          title: this.translate.instant('students.remove_from_group_title'),
          confirmMessage: this.translate.instant('students.remove_from_group_confirm_message'),
          warningNote: this.translate.instant('students.remove_from_group_warning_note'),
          item: {
            name: `${student.first_name} ${student.last_name}`,
            subtitle: `${student.email} | ${this.translate.instant('students.group')}: ${student.group?.name}`,
            iconBg: 'dark',
          },
        },
        request: () => this.studentsService.removeFromGroup(student._id, groupId),
        successMessage: this.translate.instant('students.remove_from_group_success'),
        onSuccess: () => this.loadStudents(),
      });
    } else {
      this.deleteService.open({
        config: {
          title: this.translate.instant('students.delete_title'),
          confirmMessage: this.translate.instant('students.delete_confirm_message'),
          warningNote: this.translate.instant('students.delete_warning_note'),
          item: {
            name: `${student.first_name} ${student.last_name}`,
            subtitle: `${student.email} | ${this.translate.instant('students.group')}: ${this.translate.instant('students.not_assigned')}`,
            iconBg: 'dark',
          },
        },
        request: () => this.studentsService.deleteStudent(student._id),
        successMessage: this.translate.instant('students.delete_success'),
        onSuccess: () => this.loadStudents(),
      });
    }
  }
}
