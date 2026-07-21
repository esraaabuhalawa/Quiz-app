import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Delete } from '../delete/delete';
import { DeleteServiceConfig } from '../interfaces/delete';

@Injectable({
  providedIn: 'root',
})
export class AlertDeleteService {
  private appRef = inject(ApplicationRef);
  private envInjector = inject(EnvironmentInjector);
  private messageService = inject(MessageService);
  private translate = inject(TranslateService);

  open<T>(options: DeleteServiceConfig<T>): void {
    const componentRef = createComponent(Delete, {
      environmentInjector: this.envInjector,
    });

    componentRef.setInput('visible', true);
    componentRef.setInput('config', options.config);

    document.body.appendChild(componentRef.location.nativeElement);
    this.appRef.attachView(componentRef.hostView);

    let destroyed = false;
    const destroy = () => {
      if (destroyed) return;
      destroyed = true;
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    };

    componentRef.instance.visibleChange.subscribe((visible: boolean) => {
      if (!visible) destroy();
    });

    componentRef.instance.confirmed.subscribe(() => {
      options.request().subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('common.success'),
            detail: options.successMessage ?? this.translate.instant('common.deleted_successfully'),
          });
          options.onSuccess?.(res);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('common.error'),
            detail:
              options.errorMessage ??
              err?.error?.message ??
              this.translate.instant('common.something_went_wrong'),
          });
          options.onError?.(err);
        },
      });
    });
  }
}
