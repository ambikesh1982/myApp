import { Component, OnInit, Input } from '@angular/core';
import { LayoutService } from 'src/app/core/layout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {
  @Input() sidenavRef: any;

  constructor(public layout: LayoutService) { }

  ngOnInit() {
  }

}
