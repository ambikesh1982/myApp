import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Kitchen } from 'src/app/foodie/kitchen';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-kitchen',
  templateUrl: './add-kitchen.component.html',
  styleUrls: ['./add-kitchen.component.scss']
})
export class AddKitchenComponent {

  kitchen$: Observable<Kitchen>;
  kitchenForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder) {
      this.createEmptyForm();
    }

  // ngOnInit(): void {
    // this.kitchen$ = this.route.paramMap.pipe(
    //   switchMap(params => {
    //     const kid = params.get('kid');
    //     this.isNewKitchen = kid === 'new';
    //     console.log('isNewKitchen: ', this.isNewKitchen);
    //     if (kid) {
    //       return this.ks.getKitchenDetails(kid);
    //     } else {
    //       return of(null);
    //     }
    //   }),
    //   tap((kitchen: IKitchen) => {
    //     console.log('Kitchen details >>>> ', kitchen);
    //     this.kitchen = kitchen;
    //     this.populateKitchenForm(this.kitchen);
    //   })
    // );
  // }

  // populateKitchenForm(kitchen: Kitchen) {
  //   // Patch form fileds from the kitchen returned(New or Existing)
  //   this.kitchenForm.patchValue({
  //     ownerId: this.authService.currUser.uid,
  //     title: kitchen.title,
  //     description: kitchen.description,
  //     address: kitchen.address,
  //     image: kitchen.image // Cannot convert undefined or null to object
  //   });
  // }

  createEmptyForm() {
    this.kitchenForm = this.fb.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      image: this.fb.group({
        path: ['', Validators.required],
        url: ['', Validators.required],
      }),
      description: ['', Validators.required],
      email: [''],
      mobileNo: [''],
    });
  }

  // addAddress(address) {
  //   console.log('Address from from: ', address);
  //   this.kitchenForm.get('address').patchValue(address);
  //   console.log('Kitchen Form: Address update: ', this.kitchenForm.value);
  // }

  // addImage(image) {
  //   console.log('Image >>>', image);
  //   this.kitchenForm.get('image').patchValue(image);
  // }

  // resetInput() {
  //   this.kitchenForm.get('address').reset();
  // }

  // async createKitchen() {}

  // ngOnDestroy() {
  //   console.log('CreateKitchenComponent destroyed!!');
  //   this.resetInput();
  // }

}
