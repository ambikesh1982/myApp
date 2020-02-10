/// <reference types="@types/googlemaps" />
import { Directive, OnInit, Output, EventEmitter, NgZone, ElementRef } from '@angular/core';
import { ScriptLoadService } from '../core/script-load.service';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';


@Directive({
  selector: '[appGooglePlaces]'
})
export class GooglePlacesDirective implements OnInit {

  private element: HTMLInputElement;
  @Output() addressFromGoogle: EventEmitter<any> = new EventEmitter();

  constructor(
    private script: ScriptLoadService,
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit() {
    console.log('Start loading google maps scrtip...');
    this.script.load({ name: 'googleMap', url: environment.googleMapURL, id: 'googleMap' })
      .then(resp => {
        this.placeAutoComplete(this.element);
      }).catch(e => console.error('Error in script.load...', e));
  }

  placeAutoComplete(searchElement: HTMLInputElement) {
    // fields: geometry|address_components|formatted_address
    const autoComplete = new google.maps.places.Autocomplete(searchElement, { types: ['geocode'], fields: ['formatted_address'] });

    autoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autoComplete.getPlace();

        if (place.formatted_address) {
          this.addressFromGoogle.emit(place.formatted_address);
        } else {
          searchElement.value = null;
          this.addressFromGoogle.emit(null);
          return;
        }
      });
    });
  }

}
