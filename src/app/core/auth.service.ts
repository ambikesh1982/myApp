import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { switchMap, tap, first } from 'rxjs/operators';

export interface AppUser {
  uid: string;
  isAnonymous: boolean;
  address?: string;
  kitchenId?: string;
  displayName?: string;
  photoURL?: string;
  profileMode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currUser: AppUser | null;
  userCollection = 'app-users';
  currUser$: Observable<AppUser | null>;

  constructor(private db: AngularFirestore, private af: AngularFireAuth, private router: Router) {
    this.currUser$ = this.af.authState.pipe(
      switchMap((user: AppUser) => {
        if (user) {
          return this.db.collection(this.userCollection).doc<AppUser>(user.uid)
            .valueChanges().pipe(
              tap(cu => {
                this.currUser = cu;
                console.log('User-info from firebase-auth: ', this.currUser);
              })
            );
        } else {
          this.currUser = null;
          return of(null);
        }
      })
    );
  }

  async getCurrentUser(): Promise<AppUser> {
    return this.currUser$.pipe(first()).toPromise();
  }

  async loginAnonymously(geo: string): Promise<void> {
    try {
      console.log('#Event: loginAnonymously()#');
      const credential = await this.af.auth.signInAnonymously();
      const anomymousUser: AppUser = {
        uid: credential.user.uid,
        isAnonymous: credential.user.isAnonymous,
        displayName: 'Guest',
        photoURL: '/assets/profile_placeholder.png',
        profileMode: 'foodie'
      };
      // Save user data to fireabase...
      console.log('loginAnonymously(): Sign in successfull...', anomymousUser);
      // this.addUpdateUserDB(anomymousUser);
    } catch (e) {
      this.handleAuthErrors(e);
    }
  }

  async googleSignin(): Promise<void> {
    try {
      console.log('#Event: googleSignin()#');
      const credential = await this.af.auth.signInWithPopup(new auth.GoogleAuthProvider());
      this.router.navigate(['/user/', credential.user.uid]);
      // Prepare user data //
      const googleUser: AppUser = {
        uid: credential.user.uid,
        isAnonymous: credential.user.isAnonymous,
        displayName: credential.user.displayName,
        photoURL: credential.user.photoURL,
        profileMode: 'foodie'
      };
      this.addUpdateUserDB(googleUser);
    } catch (e) {
      this.handleAuthErrors(e);
    }
  }

  async addUpdateUserDB(user: AppUser) {
    const userRef = this.db.collection(this.userCollection).doc(user.uid);
    return userRef.set(user, { merge: true })
      .then(_ => {
        // this.notify.openSnackBar(userData.displayName + 'saved!!');
      }).catch(e => {
        console.log('Error: User not created' + e);
      });
  }


  handleAuthErrors(e: firebase.FirebaseError) {
    // this.notify.openSnackBar(e.code);
    // Firebase Auth Error Codes...
    // auth/app-deleted
    // auth/app-not-authorized
    // auth/argument-error
    // auth/invalid-api-key
    // auth/invalid-user-token
    // auth/network-request-failed
    // auth/operation-not-allowed
    // auth/requires-recent-login
    // auth/too-many-requests
    // auth/unauthorized-domain
    // auth/user-disabled
    // auth/user-token-expired
    // auth/web-storage-unsupported
    switch (e.code) {
      case 'auth/operation-not-allowed':
        console.log('Error:... auth not enabled in the Firebase Console.');
        break;
      default:
        console.error('Error:...', e.code);
        console.error('Error:...', e.message);
        break;
    }
  }

}
