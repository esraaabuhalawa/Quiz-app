import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { EmptyStateComponent } from '../../../../../../../shared/components/empty-state/empty-state.component';
import { Loader } from '../../../../../../../shared/components/loader/loader';
import { TableModule } from 'primeng/table';
import { PageLayout } from '../../../../../../../shared/layouts/page-layout/page-layout';
import { AddEditQuestion } from '../add-edit-question/add-edit-question';
import { ICreateQuestionData, IQuestion } from '../../interfaces/questions';
import { QuestionsService } from '../../services/questions.service';
import { MessageService } from 'primeng/api';
import { DeleteConfig } from '../../../../../../../shared/components/delete/interfaces/delete';
import { AlertDeleteService } from '../../../../../../../shared/components/delete/services/alert-delete-sevice';
import { DatePipe } from '@angular/common';
import { ViewQuestion } from '../view-question/view-question';
import { Button } from 'primeng/button';
import { finalize } from 'rxjs';
import { QuestionType } from '../../../../../../../shared/enums/question.enum';
//import { Select } from 'primeng/select';
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
    ViewQuestion,
    Button,
    AddEditQuestion,
  ],
  templateUrl: './questions-list.html',
  styleUrl: './questions-list.scss',
})
export class QuestionsList {
  private questionService = inject(QuestionsService);
  private readonly messageService = inject(MessageService);
  private translate = inject(TranslateService);
  private deleteService = inject(AlertDeleteService);
  allQuestions = signal<IQuestion[]>([]);
  questionsList = signal<IQuestion[]>([]);
  isLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  pageSize = signal<number>(3);
  totalRecords = signal<number>(0);
  selectedQuestionForEdit = signal<IQuestion | null>(null);
  selectedQuestionForView = signal<IQuestion | null>(null);

  questionLoading = signal(false);
  visible = signal(false);
  showDialog = false;
  addEditLoad = signal(false);
  groupToDelete = signal<IQuestion | null>(null);
  showDeleteDialog = signal(false);
  deleteConfig = signal<DeleteConfig | null>(null);
  deleteLoading = signal(false);
  searchValue = signal('');
  selectedType = signal<QuestionType | null>(null);
  filteredQuestions = signal<IQuestion[]>([]);

  questionTypes = [
    { label: 'FrontEnd', value: QuestionType.FE },
    { label: 'Backend', value: QuestionType.BE },
    { label: 'Dev Ops', value: QuestionType.DO },
  ];

  ngOnInit(): void {
    this.fetchQuestionsData();
  }

  fetchQuestionsData() {
    this.isLoading.set(true);
    this.questionService.getAllQuestions().subscribe({
      next: (res: IQuestion[]) => {
        this.allQuestions.set(res);
        this.filteredQuestions.set(this.allQuestions())
        this.totalRecords.set(this.filteredQuestions().length);
        this.updateDisplayedQuestions();
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

  onSearch(value: string): void {
    this.searchValue.set(value);

    const search = value.trim().toLowerCase();

    if (!search) {
      this.filteredQuestions.set(this.allQuestions());
      return;
    }

    this.filteredQuestions.set(
      this.allQuestions().filter(question =>
        question.title.toLowerCase().includes(search) ||
        question.description.toLowerCase().includes(search)
      )
    );
  }

  viewQuestion(question: IQuestion) {
    this.visible.set(false);
    this.selectedQuestionForView.set(null);
    this.questionLoading.set(true);
    this.visible.set(true);
    this.questionService.getQuestionDetails(question._id).subscribe({
      next: (res: IQuestion) => {
        this.selectedQuestionForView.set(res);
        this.questionLoading.set(false);
      },
      error: () => {
        this.questionLoading.set(false);
        this.visible.set(false);
      },
    });
  }

  onHideViewDialog() {
    this.visible.set(false);
    this.selectedQuestionForView.set(null);
  }

  openEditDialog(question: IQuestion): void {
    this.selectedQuestionForEdit.set(structuredClone(question));
    this.showDialog = true;
  }

  openAddDialog() {
    this.selectedQuestionForEdit.set(null);
    this.showDialog = true;
  }

  //Emit Add And Edit requests to Dialog
  saveQuestion(data: ICreateQuestionData) {
    this.addEditLoad.set(true);
    const isEdit = !!this.selectedQuestionForEdit();
    const request$ = isEdit
      ? this.questionService.updateQuestion(this.selectedQuestionForEdit()!._id, data)
      : this.questionService.createQuestion(data);

    request$.pipe(finalize(() => this.addEditLoad.set(false))).subscribe({
      next: () => {
        this.showDialog = false;
        this.fetchQuestionsData();
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('common.success'),
          detail: this.translate.instant(
            isEdit ? 'groups.update_success' : 'groups.create_success',
          ),
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('common.error'),
          detail: err.error.message || this.translate.instant('common.something_went_wrong'),
        });
        console.error(err);
      },
    });
  }

  //Delete Question
  openDeleteDialog(question: IQuestion): void {
    this.deleteService.open({
      config: {
        title: this.translate.instant('questions.delete_title'),
        confirmMessage: this.translate.instant('questions.delete_confirm_message'),
        warningNote: this.translate.instant('questions.delete_warning_note'),
        item: {
          name: question.title,
          subtitle: `${question.type} | ${question.difficulty}`,
          icon: 'pi pi-question-circle',
          iconBg: 'dark',
        },
      },
      request: () => this.questionService.deleteQuestion(question._id),
      successMessage: this.translate.instant('questions.delete_success'),
      onSuccess: () => this.fetchQuestionsData(),
    });
  }

  //Helper Functions
  private updateDisplayedQuestions() {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    this.questionsList.set(this.filteredQuestions().slice(start, end));
  }

  onPageChange(event: PaginatorState) {
    this.currentPage.set((event.page ?? 0) + 1);
    this.pageSize.set(event.rows ?? 10);
    this.updateDisplayedQuestions();
  }
}
