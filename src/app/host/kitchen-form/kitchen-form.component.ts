import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Kitchen } from 'src/app/foodie/kitchen';
import { tap, debounceTime } from 'rxjs/operators';

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
  initialFormData: any;
  dataModified: boolean;

  constructor(private fb: FormBuilder) {
    this.createEmptyForm();
    this.dataModified = false;
  }

  ngOnChanges() {
    if (this.kitchenIn) {
      this.populateKitchenForm(this.kitchenIn);
      this.kitchenImageBucket = `kitchen/${this.kitchenIn.id}`;
    }
  }



  ngOnInit(): void {
    this.kitchenForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      ob => {
        if (JSON.stringify(ob) === JSON.stringify(this.initialFormData)) {
          this.dataModified = false;
          console.log('dataModified: ', false);
        } else {
          this.dataModified = true;
          console.log('dataModified: ', true);
        }
      }
    );
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
      contactInfo: this.fb.group({
        email: ['', Validators.email],
        mobileNo: [''],
      }, { validators: this.atLeastOneValidator }),
    });
  }

  public atLeastOneValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

    const controls = control.controls;
    console.log(controls);
    if (controls) {
      const theOne = Object.keys(controls).findIndex(key => controls[key].value !== '');
      if (theOne === -1) {
        console.log(theOne);
        return {
          atLeastOneRequired: {
            text: 'At least one should be selected'
          }
        };
      }
    }

  }

  populateKitchenForm(kitchen: Kitchen) {
    // Patch form fileds from the kitchen returned(New or Existing)
    this.kitchenForm.patchValue({
      title: kitchen.title,
      address: kitchen.address,
      image: kitchen.image, // Cannot convert undefined or null to object
      description: kitchen.description,
      contactInfo: kitchen.contactInfo,
    });
    this.initialFormData = this.kitchenForm.value;
    this.kitchenForm.markAsPristine();
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
    } else { console.log('Emitting kitchenOut: '); }
    // this.createKitchen(tempKitchen);
  }

}


// async submitHandler() {
//   this.loading = true;

//   const formValue = this.myForm.value;

//   try {
//     await this.afs.collection('contacts').add(formValue);
//     this.success = true;
//   } catch (err) {
//     console.error(err)
//   }

//   this.loading = false;
// }
