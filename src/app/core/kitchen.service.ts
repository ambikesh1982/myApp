import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Kitchen, IMenuItem } from '../foodie/kitchen';
import { shareReplay, tap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  kitchensCollection = 'kitchens';
  menuSubCollection = 'menuItems';

  kitchens$: Observable<Kitchen[]> = this.afs.collection<Kitchen[]>(this.kitchensCollection)
    .valueChanges({ idField: 'id' })
    .pipe(
      shareReplay(1),
      tap(console.log),
      catchError(this.handleError));


  constructor(private afs: AngularFirestore) { }

  getKitchenByID(id: string): Observable<Kitchen> {
    console.log('getKitchenByID: ', id);
    const kitchen = `${this.kitchensCollection}/${id}`;
    return this.afs.doc<any>(kitchen).valueChanges().pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  getMenuItems(kitchenId: string): Observable<IMenuItem[]> {
    return this.afs.collection(this.kitchensCollection)
      .doc(kitchenId)
      .collection<IMenuItem[]>(this.menuSubCollection)
      .valueChanges({ idField: 'menuId' })
      .pipe(
        shareReplay(1),
        tap(console.log),
        catchError(this.handleError));
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}