import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Kitchen } from 'src/app/foodie/kitchen';

@Component({
  selector: 'app-kitchen-form',
  templateUrl: './kitchen-form.component.html',
  styleUrls: ['./kitchen-form.component.scss']
})
export class KitchenFormComponent implements OnInit, OnChanges {
  @Input() kitchenIn: Kitchen;
  @Output() kitchenOut = new EventEmitter<Kitchen>();
  kitchenForm: FormGroup;
  kitchenImageBucket: string;

  constructor(private fb: FormBuilder) {
    this.createEmptyForm();
  }

  ngOnChanges() {
    if (this.kitchenIn) {
      this.populateKitchenForm(this.kitchenIn);
      this.kitchenImageBucket = `kitchen/${this.kitchenIn.id}`;
    }
  }



  ngOnInit(): void {
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

  prepareKitchen() {
    const tempKitchen: Kitchen = { ...this.kitchenIn, ...this.kitchenForm.value };
    console.log('Original Kitchen: ', this.kitchenIn);
    console.log('Updated Kitchen: ', tempKitchen);
    if (JSON.stringify(this.kitchenIn) === JSON.stringify(tempKitchen)) {
      console.log('No changes to kitchen data');
      this.kitchenOut.emit(null);
    } else { console.log('Emitting kitchenOut: ', this.kitchenOut.emit(tempKitchen)); }
    // this.createKitchen(tempKitchen);
  }

}
