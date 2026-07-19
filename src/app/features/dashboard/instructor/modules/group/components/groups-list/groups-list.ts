import { Component, inject, signal } from '@angular/core';
import { PageLayout } from "../../../../../../../shared/layouts/page-layout/page-layout";
import { GroupsService } from '../../services/groups.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { IGroupData } from '../../interfaces/groups';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Loader } from "../../../../../../../shared/components/loader/loader";
import { EmptyStateComponent } from "../../../../../../../shared/components/empty-state/empty-state.component";

@Component({
  selector: 'app-groups-list',
  imports: [PageLayout, Paginator, TranslatePipe, Loader, EmptyStateComponent],
  templateUrl: './groups-list.html',
  styleUrl: './groups-list.scss',
})
export class GroupsList {
  private GroupsService = inject(GroupsService);
  private readonly messageService = inject(MessageService);
  private translate = inject(TranslateService);

  allGroups = signal<IGroupData[]>([]);
groupsList = signal<IGroupData[]>([]);
  isLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  pageSize = signal<number>(1);
  totalRecords = signal<number>(0);
  selectedAd = signal<IGroupData | null>(null);
  adLoading = signal(false);
  visible = signal(false);
  showDialog = false;
  addEditLoad = signal(false);

  // openMenu(event: Event, ad: any, menu: any) {
  //   this.menuItems = [
  //     {
  //       label: this.translate.instant('ROOMS.VIEW'),
  //       icon: 'pi pi-eye',
  //       command: () => this.viewAd(ad)
  //     },
  //     {
  //       label: this.translate.instant('ROOMS.EDIT'),
  //       icon: 'pi pi-pencil',
  //       command: () => this.openEditDialog(ad)
  //     },
  //     {
  //       label: this.translate.instant('ROOMS.DELETE'),
  //       icon: 'pi pi-trash',
  //       command: () => this.deleteAd(ad)
  //     }
  //   ];
  //   menu.toggle(event);
  // }

  ngOnInit(): void {
    this.fetchGroupsData();
  }

  fetchGroupsData() {
    this.isLoading.set(true);
    this.GroupsService.getAllGroups().subscribe({
      next: (res:IGroupData[]) => {
        this.groupsList.set(res);
          this.updateDisplayedGroups();
//         console.log(res);
// console.log(Array.isArray(res));
// console.log(res.length);

this.totalRecords.set(res.length);
     //   console.log('total',this.totalRecords())

        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message || this.translate.instant('COMMON.SOMETHING_WENT_WRONG'),
        });
        console.log(err)
      }
    });
  }

  // viewAd(ad: IAd) {
  //   this.selectedAd.set(null);
  //   this.adLoading.set(true);
  //   this.visible.set(true);

  //   this.adsService.getAdDetails(ad._id).subscribe({
  //     next: (res) => {
  //       this.selectedAd.set(res.data.ads);
  //       this.adLoading.set(false);
  //     },
  //     error: () => {
  //       this.adLoading.set(false);
  //       this.visible.set(false);
  //     }
  //   });
  // }

  openEditDialog(group: IGroupData): void {
    this.selectedAd.set(group)
    this.showDialog = true;
  }

  openAddDialog() {
    this.selectedAd.set(null)
    this.showDialog = true;
  }

  //Emit Add And Edit requests to Dialog
  // saveAd(data: ICreateAdData | IUpdateAdData) {
  //   this.addEditLoad.set(true);
  //   const isEdit = !!this.selectedAd();
  //   const request$ = isEdit
  //     ? this.adsService.updateAd(this.selectedAd()!._id, data as IUpdateAdData)
  //     : this.adsService.createAd(data as ICreateAdData);

  //   request$.pipe(
  //     finalize(() => this.addEditLoad.set(false))
  //   ).subscribe({
  //     next: () => {
  //       this.showDialog = false;
  //       this.fetchAdsData();
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: this.translate.instant('COMMON.SUCCESS'),
  //         detail: this.translate.instant(isEdit ? 'ADS.UPDATE_SUCCESS' : 'ADS.CREATE_SUCCESS'),
  //       });
  //     },
  //     error: (err) => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: this.translate.instant('COMMON.ERROR'),
  //         detail: err.message || this.translate.instant('COMMON.SOMETHING_WENT_WRONG'),
  //       });
  //       console.error(err);
  //     }
  //   });
  // }

  //Delete Room
  // deleteAd(ad: IAd) {
  //   this.alertService.delete({
  //     entity: 'ADS.TITLE',
  //     label: ad.room.roomNumber,
  //     request: () => this.adsService.deleteAd(ad._id),
  //     onSuccess: () => this.fetchAdsData(),
  //   });
  // }

  //Helper Functions
  private updateDisplayedGroups() {
  const start = (this.currentPage() - 1) * this.pageSize();
  const end = start + this.pageSize();

  this.groupsList.set(
    this.allGroups().slice(start, end)
  );
}

  onPageChange(event: PaginatorState) {
    this.currentPage.set((event.page ?? 0) + 1);
    this.pageSize.set(event.rows ?? 10);
    this.updateDisplayedGroups();
  }
}
