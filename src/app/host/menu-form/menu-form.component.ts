import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { IMenuItem } from 'src/app/foodie/kitchen';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() menuIn: IMenuItem;
  @Output() menuOut = new EventEmitter<IMenuItem>();
  menuForm: FormGroup;
  imageBucket: string;
  avalability: string[];
  preOrder: string[];

  constructor( private fb: FormBuilder) {
    this.avalability = [
      'Every Day',
      'Weekends only',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri'];
    this.preOrder = ['Available now', '1 day', '2 Days', '2+ Days'];
    this.createMenuForm();
  }

  ngOnChanges() {
    console.log('menuIn from parent: ', this.menuIn);
    this.imageBucket = `kitchen/${this.menuIn.kitchenId}/${this.menuIn.menuId}`;
    this.populateMenuForm(this.menuIn);
  }

  ngOnInit(): void {
  }

  createMenuForm() {
    this.menuForm = this.fb.group({
      title: ['', Validators.required],
      price: [0.0, Validators.required],
      dietType: ['veg', Validators.required],
      availability: ['', Validators.required],
      preOrder: ['', Validators.required],
      serving: [1, Validators.min(1)],
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

  populateMenuForm(menu: IMenuItem) {
    console.log('populateMenuForm with: ', menu);
    // Patch form fileds from the kitchen returned(New or Existing)
    this.menuForm.reset();
    if ( !menu.image) {
      menu.image = {path: '', url: ''};
    }
    this.menuForm.patchValue({
      title: menu.title,
      price: menu.price,
      dietType: menu.dietType,
      availability: menu.availability,
      preOrder: menu.preOrder,
      serving: menu.serving,
      image: menu.image, // Cannot convert undefined or null to object
    });
  }

  prepareMenuItem() {
    const tempMenuItem: IMenuItem = { ...this.menuIn, ...this.menuForm.value };
    console.log('Original menuItem: ', this.menuIn);
    console.log('Updated menuItem: ', tempMenuItem);
    if (JSON.stringify(this.menuIn) === JSON.stringify(tempMenuItem)) {
      console.log('No changes to menu data');
      this.menuOut.emit(null);
    } else { console.log('Emitting kitchenOut: ', this.menuOut.emit(tempMenuItem)); }
    // this.createKitchen(tempKitchen);
  }

  onClickCancel() {
    this.menuOut.emit(null);
  }

  onClickSave() {
    this.prepareMenuItem();
  }

  ngOnDestroy() {
    this.menuForm.reset();
    console.log('!!! Destroyed !!!');
  }
}
