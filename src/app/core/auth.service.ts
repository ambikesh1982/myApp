import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap, tap, first } from 'rxjs/operators';
import { auth } from 'firebase/app';



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
    private afAuth: AngularFireAuth,
    private router: Router ) {
    this.currUser$ = this.afAuth.authState.pipe(
      switchMap((user: AppUser) => {
        if (user) {
          return this.db.collection(this.userCollection).doc<AppUser>(user.uid).valueChanges();
        } else {
          return of(this.createDummyUser());
        }
      })
    );
  }

  createDummyUser(): AppUser {
    const dummyUser: AppUser = {
      uid: 'foodz9_dummy',
      isAnonymous: true,
      displayName: 'Guest User',
      photoURL: '/assets/profile_placeholder.png'
    };
    return dummyUser;
  }

  async getCurrentUser(): Promise<AppUser> {
    return this.currUser$.pipe(first()).toPromise();
  }



  async googleSignin(): Promise<void> {
    try {
      console.log('#Event: googleSignin()#');
      const credential = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      console.log('googleSignin(): Success ', credential.user);
      // this.router.navigate(['/user/', credential.user.uid]);
      // Prepare user data //
      const googleUser: AppUser = {
        uid: credential.user.uid,
        isAnonymous: credential.user.isAnonymous,
        displayName: credential.user.displayName,
        photoURL: credential.user.photoURL,
        profileMode: 'host',
      };
      console.log('GoogleUser: ', googleUser);
      this.addUpdateUserDB(googleUser);
    } catch (e) {
      this.handleAuthErrors(e);
    }
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
    await this.afAuth.signOut();
    // this.notify.openSnackBar('We will miss you!');
    this.router.navigate(['welcome']);
  }
}
