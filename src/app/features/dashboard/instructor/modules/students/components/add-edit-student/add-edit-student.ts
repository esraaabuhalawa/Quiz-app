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
import { GroupsService } from '../../../group/services/groups.service';
import { IGroupData } from '../../../group/interfaces/groups';
@Component({
  selector: 'app-add-edit-student',
  imports: [DialogModule, ReactiveFormsModule, TranslatePipe, SelectModule, InputTextModule],
  templateUrl: './add-edit-student.html',
  styleUrl: './add-edit-student.scss',
})
export class AddEditStudent {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentsService);
  private groupService = inject(GroupsService);

  @Input() visible = false;
  @Input() loading = false;
  @Input() selectedStudent: IStudents | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<{
    student: string;
    group: string;
  }>();

  form!: FormGroup;

  loadingStudents = false;

  allStudents = signal<IStudents[]>([]);
  availableStudents = signal<IStudents[]>([]);
  groups = signal<IGroupData[]>([]);
  loadingGroups = false;

  constructor() {
    this.formInit();
  }

  //  students dropdown depending on Add/Edit mode
  studentOptions = computed(() => {
    const available = this.availableStudents();

    if (!this.selectedStudent) {
      return available.map((student) => ({
        ...student,
        fullName: `${student.first_name} ${student.last_name}`,
      }));
    }

    const current = this.allStudents().find((s) => s._id === this.selectedStudent!._id);

    const result = current
      ? [current, ...available.filter((s) => s._id !== current._id)]
      : available;

    return result.map((student) => ({
      ...student,
      fullName: `${student.first_name} ${student.last_name}`,
    }));
  });

  ngOnInit() {
    this.getStudentsWithoutGroup();
    this.getGroups();

    if (this.selectedStudent) {
      this.getAllStudents();
    }

    // Auto-fill email
    this.form.get('student')?.valueChanges.subscribe((studentId) => {
      const student = this.studentOptions().find((s) => s._id === studentId);

      this.form.patchValue(
        {
          email: student?.email ?? '',
        },
        { emitEvent: false },
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedStudent']) {
      if (this.selectedStudent) {
        this.form.get('student')?.disable();

        this.getAllStudents();

        this.form.patchValue({
          student: this.selectedStudent._id,
          email: this.selectedStudent.email,
          group: this.selectedStudent.group?._id,
        });
      } else {
        this.form.get('student')?.enable();

        this.form.reset({
          student: '',
          group: '',
          email: '',
        });
      }
    }
  }

  get isEditMode(): boolean {
    return !!this.selectedStudent;
  }

  formInit() {
    this.form = this.fb.group({
      student: ['', Validators.required],
      group: ['', Validators.required],
      email: [{ value: '', disabled: true }],
    });
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (res) => {
        this.allStudents.set(res);

        if (this.selectedStudent) {
          this.form.patchValue({
            student: this.selectedStudent._id,
            email: this.selectedStudent.email,
            group: this.selectedStudent.group?._id,
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
            group: this.selectedStudent.group?._id,
          });
        }
      },
      error: () => {
        this.loadingStudents = false;
      },
    });
  }

  getGroups() {
    this.loadingGroups = true;

    this.groupService.getAllGroups().subscribe({
      next: (res) => {
        console.log('Groups =>', res);

        this.groups.set(res);

        this.loadingGroups = false;
      },
      error: () => {
        this.loadingGroups = false;
      },
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitForm.emit(
      this.form.getRawValue() as {
        student: string;
        group: string;
      },
    );
  }

  close() {
    this.form.reset({
      student: '',
      group: '',
      email: '',
    });
    this.form.get('student')?.enable();

    this.visibleChange.emit(false);
  }
}
