import { Observable } from 'rxjs';

export type DeleteIconBg = 'dark' | 'light' | 'danger';

export interface DeleteItemInfo {
  name: string;
  subtitle: string;
  icon?: string;
  image?: string;
  iconBg?: DeleteIconBg;
}

export interface DeleteConfig {
  title: string;
  confirmMessage: string;
  warningNote: string;
  item: DeleteItemInfo;
}
export interface DeleteServiceConfig<T> {
  config: DeleteConfig;
  request: () => Observable<T>;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (res: T) => void;
  onError?: (err: any) => void;
}
