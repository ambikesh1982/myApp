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

  getKitchenByID(id: string): Observable<Kitchen> {
    console.log('getKitchenByID: ', id);
    const kitchen = `${this.kitchensCollection}/${id}`;
    console.log('getKitchenByID: ', kitchen);
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
    const userDocRef = this.afs.collection(this.userCollection).doc(kitchen.ownerId).ref;
    const kitchenDocRef = this.afs.collection(this.kitchensCollection).doc(kitchen.id).ref;

    batch.set(kitchenDocRef, kitchen, { merge: true });
    batch.set(userDocRef, { kitchenId: kitchen.id }, { merge: true });
    return batch.commit();
  }

  // Create Kitchen: Called from AddKitchenComponent
  async deleteKitchen(kitchen: Kitchen): Promise<void> {
    const batch = this.afs.firestore.batch();
    const userDocRef = this.afs.collection(this.userCollection).doc(kitchen.ownerId).ref;
    const kitchenDocRef = this.afs.collection(this.kitchensCollection).doc(kitchen.id).ref;

    batch.delete(kitchenDocRef);
    batch.set(userDocRef, { kitchenId: null }, { merge: true });
    return batch.commit();
  }

  createMenuItem(kid: string, menu: IMenuItem) {
    const path = `${this.kitchensCollection}/${kid}/${this.menuSubCollection}`;
    // const itemId = this.newFirebaseDocumentKey;
    const itemDocRef = this.afs.collection(path).doc(menu.menuId).ref;
    const kitchenDocRef = this.afs.doc(`${this.kitchensCollection}/${kid}`).ref;
    const batch = this.afs.firestore.batch();
    batch.set(itemDocRef, menu, { merge: true });
    batch.set(kitchenDocRef, { menuItemCount: this.increment }, { merge: true });
    return batch.commit();
    // return this.afs.collection<IMenuItem>(path).add(menu);
  }

  async deleteMenuItem(kid: string, itemId: string) {
    const path = `${this.kitchensCollection}/${kid}/${this.menuSubCollection}`;
    const itemDocRef = this.afs.collection(path).doc(itemId).ref;
    const kitchenDocRef = this.afs.doc(`${this.kitchensCollection}/${kid}`).ref;
    const batch = this.afs.firestore.batch();
    batch.delete(itemDocRef);
    batch.set(kitchenDocRef, { menuItemCount: this.decrement }, { merge: true });
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
