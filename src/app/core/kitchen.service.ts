import { Injectable } from '@angular/core';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { Kitchen, IMenuItem } from '../foodie/kitchen';
import { shareReplay, tap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  kitchensCollection = 'kitchens';
  userCollection = 'app-users';
  menuSubCollection = 'menuItems';
  db: firebase.firestore.WriteBatch;
  increment;
  decrement;

  kitchens$ = this.afs.collection<Kitchen[]>(this.kitchensCollection)
    .valueChanges({ idField: 'id' }).pipe(
      shareReplay(1),
      catchError(e => {
        console.error('Error while fetching kitchens from firebase: ', e);
        return EMPTY;
      }));


  constructor(private afs: AngularFirestore) {
    this.increment = firebase.firestore.FieldValue.increment(1);
    this.decrement = firebase.firestore.FieldValue.increment(-1);
  }

  get serverTimestampFromFirestore() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  get newFirebaseDocumentKey() {
    return this.afs.createId();
  }

  // initializeKitchen(): Kitchen {
  //   return {
  //     id: null,
  //     ownerId: null,
  //     title: null,
  //     email: null,
  //     mobileNo: null,
  //     address: null,
  //     image: { path: '', url: '' },
  //     description: null,
  //     pureVeg: false,
  //     menuItemCount: 0,
  //     likeCount: 0,
  //     website: null,
  //     createdAt: null,
  //   };
  // }

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

  // Create Kitchen: Called from AddKitchenComponent
  async addUpdateKitchen(kitchen: Kitchen): Promise<void> {
    const batch = this.afs.firestore.batch();
    const userDocRef = this.afs.collection('users').doc(kitchen.ownerId).ref;
    const kitchenDocRef = this.afs.collection(this.kitchensCollection).doc(kitchen.id).ref;

    batch.set(kitchenDocRef, kitchen, { merge: true });
    batch.set(userDocRef, { kitchenId: kitchen.id }, { merge: true });
    return batch.commit();
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
