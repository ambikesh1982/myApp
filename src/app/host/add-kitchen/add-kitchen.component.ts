import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService, AppUser } from 'src/app/core/auth.service';
import { KitchenService } from 'src/app/core/kitchen.service';
import { LayoutService } from 'src/app/core/layout.service';
import { Kitchen } from 'src/app/foodie/kitchen';


@Component({
  selector: 'app-add-kitchen',
  templateUrl: './add-kitchen.component.html',
  styleUrls: ['./add-kitchen.component.scss']
})
export class AddKitchenComponent implements OnInit, OnDestroy {

  kitchen$: Observable<Kitchen>;
  kitchenForm: FormGroup;
  kitchenImageBucket: string;
  isNewKitchen: boolean;
  currUser: AppUser;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ks: KitchenService,
    private layoutService: LayoutService,
    private router: Router) {
    this.authService.getCurrentUser()
      .then(user => this.currUser = user)
      .catch(e => console.log('Error: Fetching CurrUser: ', e));
    this.kitchenImageBucket = 'kitchens';
    this.createEmptyForm();
  }

  ngOnInit(): void {
    this.kitchen$ = this.route.paramMap.pipe(
      switchMap(params => {
        const kitchenId = params.get('id');
        this.isNewKitchen = kitchenId === 'new';
        if (this.isNewKitchen) {
          return of(this.createEmptyKitchenObject());
        } else {
          return this.ks.getKitchenByID(kitchenId);
        }
      }),
      tap((kitchen: Kitchen) => {
        console.log('Kitchen details >>>> ', kitchen);
        this.layoutService.appToolBar$.next({ showSideNavToggleIcon: true, pageTitle: kitchen.title });
        this.populateKitchenForm(kitchen);
      })
    );
  }

  prepareKitchen(formData: any, kitchen: Kitchen) {
    const tempKitchen: Kitchen = { ...kitchen, ...this.kitchenForm.value };
    console.log('Original Kitchen: ', kitchen);
    console.log('Updated Kitchen: ', tempKitchen);
    if (JSON.stringify(kitchen) === JSON.stringify(tempKitchen)) {
      console.log('No changes to kitchen data');
    } else { console.log('Kitchen data updated'); }
    // this.createKitchen(tempKitchen);
  }

  populateKitchenForm(kitchen: Kitchen) {
    // Patch form fileds from the kitchen returned(New or Existing)
    this.kitchenForm.patchValue({
      title: kitchen.title,
      address: kitchen.address,
      image: kitchen.image, // Cannot convert undefined or null to object
      description: kitchen.description,
      email: kitchen.email,
      mobileNo: kitchen.mobileNo
    });
  }

  createEmptyForm() {
    this.kitchenForm = this.fb.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      image: this.fb.group({
        path: ['', Validators.required],
        url: ['', Validators.required],
      }),
      description: [''],
      email: [''],
      mobileNo: [''],
    });
  }

  createEmptyKitchenObject(): Kitchen {
    const currUserId = this.currUser.uid;
    const docId = this.ks.newFirebaseDocumentKey;
    this.isNewKitchen = true;
    return {
      id: docId,
      ownerId: currUserId,
      title: null,
      email: null,
      mobileNo: null,
      address: null,
      image: { path: '', url: '' },
      description: null,
      pureVeg: false,
      menuItemCount: 0,
      likeCount: 0,
      website: null,
      createdAt: null,
    };
  }

  addAddress(address) {
    console.log('Address from from: ', address);
    this.kitchenForm.get('address').patchValue(address);
    console.log('Kitchen Form: Address update: ', this.kitchenForm.value);
  }

  addImage(image) {
    console.log('Image >>>', image);
    this.kitchenForm.get('image').patchValue(image);
  }

  resetInput() {
    this.kitchenForm.get('address').reset();
  }

  reInitializeKitchen() {
    console.log('reInitializeKitchen()');
    this.kitchen$ = of(this.createEmptyKitchenObject());
  }

  async createKitchen(kitchen: Kitchen) {
    kitchen.createdAt = this.ks.serverTimestampFromFirestore;
    this.ks.addUpdateKitchen(kitchen).then(
      () => {
        console.log('Redirecting to>>>', kitchen.id);
        this.router.navigate(['host', 'kitchen', kitchen.id]);
      }).catch(e => console.error('createKitchen: ', e));
  }

ngOnDestroy() {
  console.log('CreateKitchenComponent destroyed!!');
  this.resetInput();
}

}
