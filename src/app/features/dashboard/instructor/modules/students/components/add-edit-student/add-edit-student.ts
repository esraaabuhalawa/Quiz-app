import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { StudentsService } from '../../services/students.service';
import { IStudents } from '../../interfaces/students';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-add-edit-student',
  imports: [ DialogModule,
    ReactiveFormsModule,
    TranslatePipe,
  SelectModule,
InputTextModule],
  templateUrl: './add-edit-student.html',
  styleUrl: './add-edit-student.scss',
})
export class AddEditStudent {

 private fb = inject(FormBuilder);
  private studentService = inject(StudentsService);

  @Input() visible = false;
  @Input() loading = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<{ student: string }>();

  form!: FormGroup;

  loadingStudents = false;

  students = signal<IStudents[]>([]);

  studentOptions = computed(() =>
    this.students().map(student => ({
      ...student,
      fullName: `${student.first_name} ${student.last_name}`,
    }))
  );

  constructor() {
    this.formInit();
  }

 ngOnInit() {
  this.getStudentsWithoutGroup();

  this.form.get('student')?.valueChanges.subscribe((studentId) => {
    const student = this.students().find(s => s._id === studentId);

    this.form.patchValue({
      email: student?.email ?? ''
    });
  });
}

  formInit() {
    this.form = this.fb.group({
      student: ['', Validators.required],
      email: [{ value: '', disabled: true }],
    });
  }

  getStudentsWithoutGroup() {
  this.loadingStudents = true;

  this.studentService.getStudentsWithoutGroup().subscribe({
    next: (res: IStudents[]) => {
      this.students.set(res);
      this.loadingStudents = false;
    },
    error: () => {
      this.loadingStudents = false;
    }
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
