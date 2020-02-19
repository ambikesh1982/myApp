import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Kitchen } from 'src/app/foodie/kitchen';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { KitchenService } from 'src/app/core/kitchen.service';
import { LayoutService } from 'src/app/core/layout.service';
import { AuthService } from 'src/app/core/auth.service';


@Component({
  selector: 'app-add-kitchen',
  templateUrl: './add-kitchen.component.html',
  styleUrls: ['./add-kitchen.component.scss']
})
export class AddKitchenComponent implements OnInit, OnDestroy {

  kitchen$: Observable<Kitchen>;
  kitchenForm: FormGroup;
  kitchenImageBucket: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ks: KitchenService,
    private layoutService: LayoutService) {
      this.createEmptyForm();
    }

  ngOnInit(): void {
    this.kitchen$ = this.route.paramMap.pipe(
      switchMap(params => {
        const kitchenId = params.get('id');
        const isNewKitchen = kitchenId === 'new';
        if (isNewKitchen) {
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
    return {
      id: null,
      ownerId: null,
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

  // async createKitchen() {}
  reInitializeKitchen() {
    this.kitchen$ = of(this.createEmptyKitchenObject());
  }

  ngOnDestroy() {
    console.log('CreateKitchenComponent destroyed!!');
    this.resetInput();
  }

}
