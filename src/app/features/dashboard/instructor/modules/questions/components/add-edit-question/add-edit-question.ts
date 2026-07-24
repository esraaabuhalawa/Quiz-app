import { Component, EventEmitter, inject, Input, Output, signal, SimpleChanges } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { ICreateQuestionData, IQuestion } from '../../interfaces/questions';
import { TranslatePipe } from '@ngx-translate/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { QuestionType } from '../../../../../../../shared/enums/question.enum';

@Component({
  selector: 'app-add-edit-question',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
    TranslatePipe,
    Select
  ],
  templateUrl: './add-edit-question.html',
  styleUrl: './add-edit-question.scss',
})
export class AddEditQuestion {
  private fb = inject(FormBuilder);
  @Input() visible = false;
  @Input() question: IQuestion | null = null;
  @Input() loading = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<ICreateQuestionData>();
  form!: FormGroup;

  loadingStudents = false;
  questionTypes = [
    { label: QuestionType.FE, value: QuestionType.FE },
    { label: QuestionType.BE, value: QuestionType.BE },
    { label: QuestionType.DO, value: QuestionType.DO },
  ];

  answerOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
  ];

  constructor() {
    this.formInit();
  }

  ngOnInit(): void {

  }

  formInit(): void {
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
        ],
      ],
      options: this.fb.group({
        A: ['', Validators.required],
        B: ['', Validators.required],
        C: ['', Validators.required],
        D: ['', Validators.required],
      }),
      answer: ['A', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.form.get('answer')?.setValue('A');
    this.form.get('type')?.setValue(QuestionType.BE)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      if (this.question) {
        this.form.patchValue({
          title: this.question.title,
          description: this.question.description,
          options: {
            A: this.question.options.A,
            B: this.question.options.B,
            C: this.question.options.C,
            D: this.question.options.D,
          },
          answer: this.question.answer,
          type: this.question.type,
        });
      } else {
        this.form.reset();
      }
    }
  }

  get isEditMode(): boolean {
    return !!this.question;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.getRawValue());
  }

  close() {
    this.visibleChange.emit(false);
  }
}
