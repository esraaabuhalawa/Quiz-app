import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { EmptyStateComponent } from '../../../../../../../shared/components/empty-state/empty-state.component';
import { Loader } from '../../../../../../../shared/components/loader/loader';
import { TableModule } from 'primeng/table';
import { PageLayout } from '../../../../../../../shared/layouts/page-layout/page-layout';
import { AddEditQuestion } from '../add-edit-question/add-edit-question';
import { IQuestion } from '../../interfaces/questions';
import { QuestionsService } from '../../services/questions.service';
import { MessageService } from 'primeng/api';
import { DeleteConfig } from '../../../../../../../shared/components/delete/interfaces/delete';
import { AlertDeleteService } from '../../../../../../../shared/components/delete/services/alert-delete-sevice';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-questions-list',
  imports: [
    PageLayout,
    Paginator,
    TranslatePipe,
    DatePipe,
    Loader,
    FormsModule,
    EmptyStateComponent,
    TableModule,
  //  AddEditQuestion,
  ],
  templateUrl: './questions-list.html',
  styleUrl: './questions-list.scss',
})
export class QuestionsList {
   private questionService= inject(QuestionsService);
  private readonly messageService = inject(MessageService);
  private translate = inject(TranslateService);
  private deleteService = inject(AlertDeleteService);
  allQuestions = signal<IQuestion[]>([]);
  questionsList = signal<IQuestion[]>([]);
  isLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalRecords = signal<number>(0);
  selectedQuestion = signal<IQuestion | null>(null);
  SelectedQuestion = signal<IQuestion | null>(null);

  questionLoading = signal(false);
  visible = signal(false);
  showDialog = false;
  addEditLoad = signal(false);
  groupToDelete = signal<IQuestion | null>(null);
  showDeleteDialog = signal(false);
  deleteConfig = signal<DeleteConfig | null>(null);
  deleteLoading = signal(false);
  ngOnInit(): void {
    this.fetchQuestionsData();
  }

  fetchQuestionsData() {
    this.isLoading.set(true);
    this.questionService.getAllQuestions().subscribe({
      next: (res: IQuestion[]) => {
        this.allQuestions.set(res);
        this.updateDisplayedQuestions();
        this.totalRecords.set(res.length);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message || this.translate.instant('COMMON.SOMETHING_WENT_WRONG'),
        });
        console.log(err);
      },
    });
  }

  viewQuestion(question:IQuestion) {
    this.selectedQuestion.set(null);
    this.questionLoading.set(true);
    this.visible.set(true);

    this.questionService.getQuestionDetails(question._id).subscribe({
      next: (res: IQuestion) => {
        this.SelectedQuestion.set(res);
        this.questionLoading.set(false);
      },
      error: () => {
        this.questionLoading.set(false);
        this.visible.set(false);
      },
    });
  }

  openEditDialog(question: IQuestion): void {
    this.selectedQuestion.set(structuredClone(question));
    this.showDialog = true;
  }

  openAddDialog() {
    this.selectedQuestion.set(null);
    this.showDialog = true;
  }

  //Emit Add And Edit requests to Dialog
  // saveGroup(data: IGroupFormData) {
  //   this.addEditLoad.set(true);
  //   const isEdit = !!this.selectedQuestion();
  //   const request$ = isEdit
  //     ? this.GroupsService.updateGroup(this.selectedQuestion()!._id, data)
  //     : this.GroupsService.createGroup(data);

  //   request$.pipe(finalize(() => this.addEditLoad.set(false))).subscribe({
  //     next: () => {
  //       this.showDialog = false;
  //       this.fetchQuestionsData();
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: this.translate.instant('common.success'),
  //         detail: this.translate.instant(
  //           isEdit ? 'groups.update_success' : 'groups.create_success',
  //         ),
  //       });
  //     },
  //     error: (err) => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: this.translate.instant('common.error'),
  //         detail: err.error.message || this.translate.instant('common.something_went_wrong'),
  //       });
  //       console.error(err);
  //     },
  //   });
  // }

  //Delete Group
  openDeleteDialog(question:IQuestion): void {
    this.deleteService.open({
      config: {
        title: this.translate.instant('groups.delete_title'),
        confirmMessage: this.translate.instant('groups.delete_confirm_message'),
        warningNote: this.translate.instant('groups.delete_warning_note'),
        item: {
          name: question.title,
          subtitle: `${this.translate.instant('groups.students')}: ${question.description}`,
          icon: 'pi pi-users',
          iconBg: 'dark',
        },
      },
      request: () => this.questionService.deleteQuestion(question._id),
      successMessage: this.translate.instant('groups.delete_success'),
      onSuccess: () => this.fetchQuestionsData(),
    });
  }

  //Helper Functions
  private updateDisplayedQuestions() {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();

    this.questionsList.set(this.allQuestions().slice(start, end));
  }

  onPageChange(event: PaginatorState) {
    this.currentPage.set((event.page ?? 0) + 1);
    this.pageSize.set(event.rows ?? 10);
    this.updateDisplayedQuestions();
  }
}
