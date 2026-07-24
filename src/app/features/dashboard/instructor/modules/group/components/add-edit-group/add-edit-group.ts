import { Component, computed, EventEmitter, inject, Input, Output, signal, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatePipe} from '@ngx-translate/core';
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
    TranslatePipe
  ],
  templateUrl: './add-edit-group.html',
  styleUrl: './add-edit-group.scss',
})
export class AddEditGroup {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentsService);
  @Input() visible = false;
  @Input() groupData: IGroupData | null = null;
  @Input() loading = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter<IGroupFormData>();
  form!: FormGroup;

  allStudents = signal<IStudents[]>([]);
  filteredStudents = signal<IStudents[]>([]);
  private currentGroup = signal<IGroupData | null>(null);
  loadingStudents = false;
  //search = '';

  // Edit mode: current group members first, then students without a group
  studentOptions = computed(() => {
    const group = this.currentGroup();
    if (!group) return this.filteredStudents();
    const members = this.allStudents().filter(s => group.students.includes(s._id));
    const unassigned = this.filteredStudents().filter(s => !group.students.includes(s._id));
    return [...members, ...unassigned];
  });

  constructor() {
    this.formInit();
  }

  ngOnInit(): void {
    this.getStudents();
    this.getStudentswithoutGroup();
  }

  formInit() {
    this.form = this.fb.group({
      students: [[], Validators.required],
      name: ['',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupData']) {
      this.currentGroup.set(this.groupData);
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
