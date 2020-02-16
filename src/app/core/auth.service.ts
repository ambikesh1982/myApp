import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { switchMap, tap, first } from 'rxjs/operators';
import * as firebase from 'firebase';


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
  dummyUser: AppUser;
  userCollection = 'app-users';
  currUser$: Observable<AppUser | null>;

  constructor(
    private db: AngularFirestore,
    private af: AngularFireAuth,
    private router: Router ) {
    this.currUser$ = this.af.authState.pipe(
      switchMap((user: AppUser) => {
        if (user) {
          console.log('Rwa user from fb: ', user);
          return this.db.collection(this.userCollection).doc<AppUser>(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  createDummyUser(): AppUser {
    const dummyUser: AppUser = {
      uid: '123',
      isAnonymous: true,
      displayName: 'Guest',
      photoURL: '/assets/profile_placeholder.png'
    };
    return dummyUser;
  }

  async getCurrentUser(): Promise<AppUser> {
    // console.log('From getCurrentUser');
    return this.currUser$.pipe(first()).toPromise();
  }

  loginAnonymously(formattedAddress: string): Promise<void> {
      console.log('#Event: loginAnonymously()#');
      return this.af.auth.signInAnonymously()
        .then((credential: firebase.auth.UserCredential) => {

          const anonymousUser: AppUser = {
            uid: credential.user.uid,
            isAnonymous: credential.user.isAnonymous,
            displayName: 'Guest',
            photoURL: '/assets/profile_placeholder.png',
            profileMode: 'foodie',
            address: formattedAddress
          };

          console.log('loginAnonymously(): Sign in successfull...');
          this.addUpdateUserDB(anonymousUser);
        })
        .catch((e: firebase.FirebaseError) => {
          this.handleAuthErrors(e);
        });
  }

  async googleSignin(): Promise<void> {
    try {
      console.log('#Event: googleSignin()#');
      const credential = await this.af.auth.signInWithPopup(new auth.GoogleAuthProvider());
      console.log('googleSignin(): Success ', credential.user);
      // this.router.navigate(['/user/', credential.user.uid]);
      // Prepare user data //
      const googleUser: AppUser = {
        uid: credential.user.uid,
        isAnonymous: credential.user.isAnonymous,
        displayName: credential.user.displayName,
        photoURL: credential.user.photoURL,
        profileMode: 'host',
        kitchenId: 'no_kitchen'
      };
      console.log('GoogleUser: ', googleUser);
      this.addUpdateUserDB(googleUser);
    } catch (e) {
      this.handleAuthErrors(e);
    }
  }

  async upgradeAnonymosToSocial(anonymousUser: AppUser) {
    console.log('###### upgradeAnonymosToSocial ######');
    const provider = new auth.GoogleAuthProvider();

    // const credential = await this.af.auth.signInWithPopup(provider);
    this.af.auth.currentUser.linkWithPopup(provider).then(resp => {
      // const upgradedUser: AppUser = {
      //   uid: resp.user.uid,
      //   isAnonymous: resp.user.isAnonymous,
      //   displayName: resp.user.displayName,
      //   photoURL: resp.user.photoURL,
      //   address: anonymousUser.address,
      //   profileMode: 'host'
      // };
      console.log('Anonymous User upgraded: ', resp.user);
      // console.log('Update User info', upgradedUser);
      // this.addUpdateUserDB(upgradedUser);
    }).catch(
      (e: firebase.FirebaseError) => {
      //   if (e.code === 'auth/provider-already-linked') {
      //     this.addUpdateUserDB(anonymousUser);
      //   } else {
      //   this.handleAuthErrors(e);
      //   }
      this.handleAuthErrors(e);
      });
  }

  async addUpdateUserDB(user: AppUser) {
    const userRef = this.db.collection(this.userCollection).doc(user.uid);
    return userRef.set(user, { merge: true })
      .then(_ => {
        console.log('Saved to firebase: ', user);
        // this.notify.openSnackBar(user.displayName + 'saved!!');
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

  async signOut() {
    await this.af.auth.signOut();
    // this.notify.openSnackBar('We will miss you!');
    this.router.navigate(['welcome']);
  }
}
