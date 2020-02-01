import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppToolbar {
  pageTitle?: string;
  showSideNavToggleIcon?: boolean;
  showNewProductIcon?: boolean;
  showAppTrayIcon?: boolean;
  showUserIcon?: boolean;
  showCancelIcon?: boolean;
  showGoBackIcon?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  defaultToolbar: AppToolbar = {
    showSideNavToggleIcon: true,
    showNewProductIcon: true,
    showAppTrayIcon: true,
    showUserIcon: true
  };

  appToolBar$ = new BehaviorSubject<AppToolbar>(this.defaultToolbar);

  constructor() { }
}
