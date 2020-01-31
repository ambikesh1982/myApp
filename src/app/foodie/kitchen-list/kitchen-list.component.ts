import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitchen-list',
  templateUrl: './kitchen-list.component.html',
  styleUrls: ['./kitchen-list.component.scss']
})
export class KitchenListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToKitchenDetails(id: string) {
    console.log('Kitchen selected: ', id);
    this.router.navigate(['foodie', 'kitchens', id]);
  }

}
