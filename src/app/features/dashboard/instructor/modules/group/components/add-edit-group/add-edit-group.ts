import { Component, EventEmitter, inject, Input, Output, signal, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IGroupData } from '../../interfaces/groups';
import { StudentsService } from '../../../students/services/students.service';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-add-edit-group',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './add-edit-group.html',
  styleUrl: './add-edit-group.scss',
})
export class AddEditGroup {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentsService);
  private translate = inject(TranslateService)
  @Input() visible = false;
  @Input() groupData: IGroupData | null = null;
  @Input() loading = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<any>();
  form!: FormGroup;

  allStudents = signal([]);

  page = 1;
  size = 20;
  totalRecords = 0;
  loadingStudents = false;
  search = '';


  formInit() {
    this.form = this.fb.group({
      students: [[], Validators.required],
      name: [null as number | null, [Validators.required, Validators.min(1), Validators.max(100)],],
    });
  }

  constructor() {
    this.formInit();
  }

  ngOnInit(): void {
    this.getStudents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupData']) {
      if (this.groupData) {
        this.form.patchValue({
          name: this.groupData.name,
          students: this.groupData.students,
        });
      } else {
        this.form.reset({
          name: '',
          students: [],
        });
      }
    }
  }


  get isEditMode(): boolean {
    return !!this.groupData;
  }

  // Submitting Form Data
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.isEditMode) {
      const payload = {
        name: this.form.value.name,
        students: this.form.value.students,
      };
      this.submitForm.emit(payload);
    } else {
      this.submitForm.emit(this.form.value);
    }
  }

  //Get students Data For Select
  getStudents() {
    this.loadingStudents = true;

    this.studentService.getAllStudents().subscribe({
      next: (res: any) => {
        this.allStudents.set(res);
        this.loadingStudents = false;
      },
      error: () => {
        this.loadingStudents = false;
      },
    });
  }

  close() {
    this.visibleChange.emit(false);
  }
}
