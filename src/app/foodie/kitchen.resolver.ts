import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, take, tap } from 'rxjs/operators';
import { FoodieService } from './foodie.service';



@Injectable()
export class KitchenResolver implements Resolve<any> {

  constructor(
    private ks: FoodieService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.ks.getKitchenByID(id).pipe(
      // delay(2000), // added a delay to test loading spinner. To be removed later.
      take(1),
      tap(resp => console.log('MyKitchenResolver: resp >>', resp)),
      catchError(e => {
        const message = `Retrieval error: ${e}`;
        console.error('MyKitchenResolver: error >>', e);
        return of({kitchen: null, error: message});
        // return of({ product: null, error: message });
      })
    );

  }
}
