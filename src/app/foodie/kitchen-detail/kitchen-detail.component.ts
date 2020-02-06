import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/layout.service';
import { ActivatedRoute } from '@angular/router';
import { Kitchen } from '../foodie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kitchen-detail',
  templateUrl: './kitchen-detail.component.html',
  styleUrls: ['./kitchen-detail.component.scss']
})
export class KitchenDetailComponent implements OnInit {
  kitchen: Kitchen;
  menu$: Observable<any[]>;

  constructor(private route: ActivatedRoute, private layout: LayoutService) {
    this.layout.appToolBar$.next({ pageTitle: this.route.snapshot.data.kitchen.title, showGoBackIcon: true  });
   }

  ngOnInit() {
    this.kitchen = this.route.snapshot.data.kitchen;
  }

  goBack() {}

}
