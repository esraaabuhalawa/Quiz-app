import { Component, EventEmitter, inject, Input, Output, signal, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatePipe} from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IGroupData, IGroupFormData } from '../../interfaces/groups';
import { StudentsService } from '../../../students/services/students.service';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { IStudents } from '../../../students/interfaces/students';

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
  // private translate = inject(TranslateService)
  @Input() visible = false;
  @Input() groupData: IGroupData | null = null;
  @Input() loading = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<IGroupFormData>();
  form!: FormGroup;

  allStudents = signal<IStudents[]>([]);
  filteredStudents = signal<IStudents[]>([]);
  loadingStudents = false;
  search = '';

  formInit() {
    this.form = this.fb.group({
      students: [[], Validators.required],
      name: ['',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],],
    });
  }

  constructor() {
    this.formInit();
  }

  ngOnInit(): void {
    this.getStudents();
    this.getStudentswithoutGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupData']) {
      if (this.groupData) {
        // console.log(this.groupData)
        // console.log(this.allStudents());
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

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.getRawValue());
  }

  getStudentswithoutGroup() {
    this.loadingStudents = true;
    this.studentService.getStudentsWithoutGroup().subscribe({
      next: (res: IStudents[]) => {
        this.filteredStudents.set(res)
        this.loadingStudents = false;
      },
      error: () => {
        this.loadingStudents = false;
      },
    });
  }

  //Get students Data For Select
  getStudents() {
    this.loadingStudents = true;
    this.studentService.getAllStudents().subscribe({
      next: (res: IStudents[]) => {
        this.allStudents.set(res);
        this.loadingStudents = false;
      },
      error: () => {
        this.loadingStudents = false;
      },
    });
  }

  close() {
    this.form.reset({
      name: '',
      students: [],
    });

    this.visibleChange.emit(false);
  }
}
