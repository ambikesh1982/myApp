import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/layout.service';
import { KitchenService } from 'src/app/core/kitchen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMenuItem, Kitchen } from 'src/app/foodie/kitchen';

@Component({
  selector: 'app-my-kitchen',
  templateUrl: './my-kitchen.component.html',
  styleUrls: ['./my-kitchen.component.scss']
})
export class MyKitchenComponent implements OnInit {
  myKitchen$: Observable<Kitchen>;
  menuItems$;
  menuForm: FormGroup;
  menu: IMenuItem;
  kitchenId: string;
  hasMenuItems: boolean;
  canNavigateAway: boolean;
  showMenuTemplate: boolean;
  imageBucket: string;
  avalability: string[];
  preOrder: string[];

  constructor(
    private layout: LayoutService,
    private ks: KitchenService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) {
      this.avalability = [
        'Every Day',
        'Weekends only',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri'];
      this.preOrder = ['Available now', '1 day' , '2 Days', '2+ Days'];
      this.createMenuForm();
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.kitchenId = params.get('id');
      this.myKitchen$ = this.ks.getKitchenByID(this.kitchenId).pipe(
        tap(k => {
          if (k) {
            this.layout.appToolBar$.next({ showSideNavToggleIcon: true, pageTitle: k.title, showGoBackIcon: true });
            this.imageBucket = `kitchens/${k.id}`;
            console.log('Kitchen details >>>> ', k);
          } else {
            console.log('Kitchen not found. Redirect to Create-Kitchen page');
          }
        })
      );
      this.menuItems$ = this.ks.getMenuItems(this.kitchenId).pipe(
        tap(resp => this.hasMenuItems = !!resp)
      );
    });
  }

  createMenuForm() {
    this.menuForm = this.fb.group({
      title: ['', Validators.required],
      price: [0.0, Validators.required],
      isNonVeg: [true, Validators.required],
      availability: ['', Validators.required],
      preOrder: ['', Validators.required],
      // qty: [0, Validators.required],
      image: this.fb.group({
        path: [''],
        url: [''],
      }),
    });
  }

  addImage(image) {
    console.log('Image >>>', image);
    this.menuForm.get('image').patchValue(image);
  }

  showAddMenuTemplate(resp: boolean) {
    if (!resp) { this.menuForm.reset(); }
    this.showMenuTemplate = resp;
    this.canNavigateAway = !resp;
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


  navigateToManageKitchen() {
    console.log('navigateToManageKitchen');
    this.router.navigate(['kitchen', this.kitchenId, 'manage']);
  }

}
