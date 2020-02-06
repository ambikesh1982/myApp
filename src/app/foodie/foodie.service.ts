import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError, tap, shareReplay } from 'rxjs/operators';

export interface Kitchen {
  id: string;
  ownerId: string;
  title: string;
  address: { line1: string, pin: string };
  image: { path: string, url: string };
  description: string;
  pureVeg: boolean;
  menuItemCount: number;
  likeCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class FoodieService {

  kitchensCollection = 'kitchens';
  menuSubCollection = 'menuItems';

  kitchens$: Observable<Kitchen[]> = this.afs.collection<Kitchen[]>(this.kitchensCollection)
              .valueChanges({ idField: 'id' })
              .pipe(
                shareReplay(),
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
