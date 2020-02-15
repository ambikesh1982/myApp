import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { KitchenService } from '../core/kitchen.service';



@Injectable()
export class KitchenResolver implements Resolve<any> {

  constructor(
    private ks: KitchenService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.ks.getKitchenByID(id).pipe(
      take(1),
      tap(resp => console.log('MyKitchenResolver: resp >>', resp)),
      catchError(e => {
        const message = `Retrieval error: ${e}`;
        console.error('MyKitchenResolver: error >>', e);
        return of({kitchen: null, error: message});
      })
    );

  }
}
