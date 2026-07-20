import { Component, inject, signal } from '@angular/core';
import { PageLayout } from '../../../../../../../shared/layouts/page-layout/page-layout';
import { GroupsService } from '../../services/groups.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { IGroupData, IGroupDetails, IGroupFormData } from '../../interfaces/groups';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Loader } from '../../../../../../../shared/components/loader/loader';
import { EmptyStateComponent } from '../../../../../../../shared/components/empty-state/empty-state.component';
import { AddEditGroup } from '../add-edit-group/add-edit-group';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ViewGroup } from '../view-group/view-group';
import { DeleteConfig } from '../../../../../../../shared/components/delete/interfaces/delete';
import { AlertDeleteService } from '../../../../../../../shared/components/delete/services/alert-delete-sevice';

@Component({
  selector: 'app-groups-list',
  imports: [
    PageLayout,
    Paginator,
    TranslatePipe,
    Loader,
    FormsModule,
    EmptyStateComponent,
    AddEditGroup,
    ViewGroup,
  ],
  templateUrl: './groups-list.html',
  styleUrl: './groups-list.scss',
})
export class GroupsList {
  private GroupsService = inject(GroupsService);
  private readonly messageService = inject(MessageService);
  private translate = inject(TranslateService);
  private deleteService = inject(AlertDeleteService);
  allGroups = signal<IGroupData[]>([]);
  groupsList = signal<IGroupData[]>([]);
  isLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalRecords = signal<number>(0);
  selectedGroup = signal<IGroupData | null>(null);
  SelectedViewGroup = signal<IGroupDetails | null>(null);

  groupLoading = signal(false);
  visible = signal(false);
  showDialog = false;
  addEditLoad = signal(false);
  groupToDelete = signal<IGroupData | null>(null);
  showDeleteDialog = signal(false);
  deleteConfig = signal<DeleteConfig | null>(null);
  deleteLoading = signal(false);
  ngOnInit(): void {
    this.fetchGroupsData();
  }

  fetchGroupsData() {
    this.isLoading.set(true);
    this.GroupsService.getAllGroups().subscribe({
      next: (res: IGroupData[]) => {
        this.allGroups.set(res);
        this.updateDisplayedGroups();
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

  viewGroup(group: IGroupData) {
    this.selectedGroup.set(null);
    this.groupLoading.set(true);
    this.visible.set(true);

    this.GroupsService.getGroupDetails(group._id).subscribe({
      next: (res: IGroupDetails) => {
        this.SelectedViewGroup.set(res);
        this.groupLoading.set(false);
      },
      error: () => {
        this.groupLoading.set(false);
        this.visible.set(false);
      },
    });
  }

  openEditDialog(group: IGroupData): void {
    this.selectedGroup.set(structuredClone(group));
    // this.selectedGroup.set({ ...group });
    // this.selectedGroup.set(group)
    this.showDialog = true;
  }

  openAddDialog() {
    this.selectedGroup.set(null);
    this.showDialog = true;
  }

  //Emit Add And Edit requests to Dialog
  saveGroup(data: IGroupFormData) {
    this.addEditLoad.set(true);
    const isEdit = !!this.selectedGroup();
    const request$ = isEdit
      ? this.GroupsService.updateGroup(this.selectedGroup()!._id, data)
      : this.GroupsService.createGroup(data);

    request$.pipe(finalize(() => this.addEditLoad.set(false))).subscribe({
      next: () => {
        this.showDialog = false;
        this.fetchGroupsData();
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

  //Delete Group
  openDeleteDialog(group: IGroupData): void {
    this.deleteService.open({
      config: {
        title: this.translate.instant('groups.delete_title'),
        confirmMessage: this.translate.instant('groups.delete_confirm_message'),
        warningNote: this.translate.instant('groups.delete_warning_note'),
        item: {
          name: group.name,
          subtitle: `${this.translate.instant('groups.students')}: ${group.students.length}`,
          icon: 'pi pi-users',
          iconBg: 'dark',
        },
      },
      request: () => this.GroupsService.deleteGroup(group._id),
      successMessage: this.translate.instant('groups.delete_success'),
      onSuccess: () => this.fetchGroupsData(),
    });
  }

  //Helper Functions
  private updateDisplayedGroups() {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();

    this.groupsList.set(this.allGroups().slice(start, end));
  }

  onPageChange(event: PaginatorState) {
    this.currentPage.set((event.page ?? 0) + 1);
    this.pageSize.set(event.rows ?? 10);
    this.updateDisplayedGroups();
  }
}
