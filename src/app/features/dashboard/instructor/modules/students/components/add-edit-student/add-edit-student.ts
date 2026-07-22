import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { StudentsService } from '../../services/students.service';
import { IStudents } from '../../interfaces/students';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-add-edit-student',
  imports: [DialogModule, ReactiveFormsModule, TranslatePipe, SelectModule, InputTextModule],
  templateUrl: './add-edit-student.html',
  styleUrl: './add-edit-student.scss',
})
export class AddEditStudent {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentsService);

  @Input() visible = false;
  @Input() loading = false;
  @Input() selectedStudent: IStudents | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<{ student: string }>();

  form!: FormGroup;

  loadingStudents = false;



  allStudents = signal<IStudents[]>([]);
  availableStudents = signal<IStudents[]>([]);

  studentOptions = computed(() => {
    const current = this.selectedStudent
      ? this.allStudents().filter((s) => s._id === this.selectedStudent!._id)
      : [];

    const available = this.availableStudents().filter((s) => s._id !== this.selectedStudent?._id);

      console.log({
    selected: this.selectedStudent,
    current,
    available
  });

    return [...current, ...available].map((student) => ({
      ...student,
      fullName: `${student.first_name} ${student.last_name}`,
    }));
  });

  constructor() {
    this.formInit();
  }

  ngOnInit() {
    this.getStudentsWithoutGroup();
    this.getAllStudents();

    this.form.get('student')?.valueChanges.subscribe((studentId) => {
     const student = this.studentOptions().find(
  s => s._id === studentId
);

      this.form.patchValue({
        email: student?.email ?? '',
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedStudent']) {
      if (this.selectedStudent) {
        this.form.patchValue({
          student: this.selectedStudent._id,
          email: this.selectedStudent.email,
        });
      } else {
        this.form.reset({
          student: '',
          email: '',
        });
      }
    }
  }

  formInit() {
    this.form = this.fb.group({
      student: ['', Validators.required],
      email: [{ value: '', disabled: true }],
    });
  }

  get isEditMode(): boolean {
    return !!this.selectedStudent;
  }

 getAllStudents() {
  this.studentService.getAllStudents().subscribe({
    next: (res) => {
      this.allStudents.set(res);

       console.log('All Students Loaded', this.allStudents());
      console.log('Student Options', this.studentOptions());

      if (this.selectedStudent) {
        this.form.patchValue({
          student: this.selectedStudent._id,
          email: this.selectedStudent.email,
        });
      }
    },
  });
}

  getStudentsWithoutGroup() {
    this.loadingStudents = true;

    this.studentService.getStudentsWithoutGroup().subscribe({
  next: (res: IStudents[]) => {
  this.availableStudents.set(res);
  this.loadingStudents = false;

  if (this.selectedStudent) {
    this.form.patchValue({
      student: this.selectedStudent._id,
      email: this.selectedStudent.email,
    });
  }
},
      error: () => {
        this.loadingStudents = false;
      },
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitForm.emit(this.form.getRawValue() as { student: string });
  }

  close() {
    this.form.reset({
      student: '',
    });

    this.visibleChange.emit(false);
  }
}
