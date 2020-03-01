import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AppUser, AuthService } from 'src/app/core/auth.service';
import { KitchenService } from 'src/app/core/kitchen.service';
import { LayoutService } from 'src/app/core/layout.service';
import { Kitchen } from 'src/app/foodie/kitchen';


@Component({
  selector: 'app-add-kitchen',
  templateUrl: './add-kitchen.component.html',
  styleUrls: ['./add-kitchen.component.scss']
})
export class AddKitchenComponent implements OnInit, OnDestroy {

  kitchen$: Observable<Kitchen>;
  isNewKitchen: boolean;
  currUser: AppUser;
  kitchenId: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private ks: KitchenService,
    private layoutService: LayoutService,
    private router: Router) {
    this.authService.getCurrentUser()
      .then(user => this.currUser = user)
      .catch(e => console.log('Error: Fetching CurrUser: ', e));
  }

  ngOnInit(): void {
    this.kitchen$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.kitchenId = params.get('id');
        this.isNewKitchen = this.kitchenId === 'new';
        if (this.isNewKitchen) {
          return of(this.createEmptyKitchenObject());
        } else {
          return this.ks.getKitchenByID(this.kitchenId);
        }
      }),
      tap((kitchen: Kitchen) => {
        if (kitchen === undefined || kitchen === null) {
          console.log('Kitchen not found >>>> ');
          this.layoutService.appToolBar$.next({ showSideNavToggleIcon: true, pageTitle: '*New', showGoBackIcon: true });
        } else {
          console.log('Kitchen details >>>> ', kitchen);
          this.layoutService.appToolBar$.next({ showSideNavToggleIcon: true, pageTitle: kitchen.title, showGoBackIcon: true });
        }

      })
    );
  }


  createEmptyKitchenObject(): Kitchen {
    const currUserId = this.currUser.uid;
    const docId = this.ks.newFirebaseDocumentKey;
    this.isNewKitchen = true;
    return {
      id: docId,
      ownerId: currUserId,
      title: null,
      email: null,
      mobileNo: null,
      address: null,
      image: { path: '', url: '' },
      description: null,
      pureVeg: false,
      menuItemCount: 0,
      likeCount: 0,
      website: null,
      createdAt: null,
    };
  }

  async createKitchen(kitchen: Kitchen) {
    kitchen.createdAt = this.ks.serverTimestampFromFirestore;
    this.ks.addUpdateKitchen(kitchen).then(
      () => {
        console.log('Redirecting to>>>', kitchen.id);
        this.router.navigate(['host', kitchen.id, 'myKitchen']);
      }).catch(e => console.error('createKitchen: ', e));
  }

  ngOnDestroy() {
    console.log('CreateKitchenComponent destroyed!!');
  }


  collectKitchenOut(kitchenOut: Kitchen) {
    console.log('kitchenOut form KitchenFormComponent: ', kitchenOut);
    if (kitchenOut !== null) {
      this.createKitchen(kitchenOut);
      return;
    }
    this.router.navigate(['host', this.kitchenId, 'myKitchen']);
  }

}
