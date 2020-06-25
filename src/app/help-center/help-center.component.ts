import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../core/layout.service';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {

  constructor(private layout: LayoutService) {
    this.layout.appToolBar$.next({ showSideNavToggleIcon: true, pageTitle: 'Foodz9' });
  }

  ngOnInit(): void {
  }

}
