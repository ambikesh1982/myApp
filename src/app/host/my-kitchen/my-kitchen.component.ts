import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/layout.service';
import { KitchenService } from 'src/app/core/kitchen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMenuItem, Kitchen } from 'src/app/foodie/kitchen';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-my-kitchen',
  templateUrl: './my-kitchen.component.html',
  styleUrls: ['./my-kitchen.component.scss']
})
export class MyKitchenComponent implements OnInit {
  myKitchen$: Observable<Kitchen>;
  menuItems$;
  menu: IMenuItem;
  kitchenId: string;
  hasMenuItems: boolean;
  // canNavigateAway: boolean;
  showMenuTemplate: boolean;
  selectedMenuItem: IMenuItem;
  isNewMenuItem: boolean;

  constructor(
    private layout: LayoutService,
    private ks: KitchenService,
    private route: ActivatedRoute,
    private router: Router) {
      this.selectedMenuItem = null;
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.kitchenId = params.get('id');
      this.myKitchen$ = this.ks.getKitchenByID(this.kitchenId).pipe(
        tap(k => {
          if (k) {
            this.layout.appToolBar$.next({ showSideNavToggleIcon: true, pageTitle: k.title, showGoBackIcon: true });
            console.log('Kitchen details >>>> ', k);
          } else {
            console.log('Kitchen not found. Redirect to Create-Kitchen page');
            this.router.navigate(['**']);
          }
        })
      );
      this.menuItems$ = this.ks.getMenuItems(this.kitchenId).pipe(
        tap(resp => this.hasMenuItems = !!resp)
      );
    });
  }

  createEmptyMenuObject(): IMenuItem {
    const docId = this.ks.newFirebaseDocumentKey;
    this.isNewMenuItem = true;
    return {
      menuId: docId,
      kitchenId: this.kitchenId,
      price: 0.0,
      availability: ['Weekends only'],
      preOrder: '2 Days',
      title: null,
      serving: 1,
      image: { path: '', url: '' },
      description: null,
      dietType: 'nonveg',
    };
  }

  showAddMenuTemplate(resp: boolean) {
    this.selectedMenuItem = this.createEmptyMenuObject();
    this.showMenuTemplate = resp;
  }


  addMenuItem(dataFromMenuForm) {
    const menu = dataFromMenuForm;
    menu.createdAt = this.ks.serverTimestampFromFirestore;
    this.ks.createMenuItem(this.kitchenId, menu)
      .then(resp => {
        this.showAddMenuTemplate(false);
      });
    console.log('Data from menu form: ', this.kitchenId, '-', dataFromMenuForm);
  }

  removeMenuItem(menuId: string) {
    const menuItemDoc = `kitchen/${this.kitchenId}/menuItems/${menuId}`;
    this.ks.deleteMenuItem(this.kitchenId, menuId)
      .then(resp => console.error('menu item removed >>>', menuItemDoc))
      .catch(e => console.log('error in deleting menu item: ', e));
  }

  editMenuItem(menu: IMenuItem) {
    this.showMenuTemplate = true;
    this.selectedMenuItem = menu;
  }


  navigateToManageKitchen() {
    console.log('navigateToManageKitchen');
    this.router.navigate(['kitchen', this.kitchenId, 'manage']);
  }

  collectMenuOut(menu: any) {
    if (menu == null) {
      this.showMenuTemplate = false;
      console.log('Null returned');
    } else {
      console.log('menuOut: ', menu);
      this.addMenuItem(menu);
    }
  }

}
