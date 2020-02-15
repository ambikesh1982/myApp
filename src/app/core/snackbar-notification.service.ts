import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackbarNotificationService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(msg: string, action?: string) {
    // SnackBar configuration //
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = 2000;

    // Creating reference of opened SnackBar //
    const snackBarRef = this.snackBar.open(msg, action, snackBarConfig);

    if ( action ) {
      snackBarRef.onAction().pipe(take(1)).subscribe(
        () => console.log('User clicked on action')
      );
    }

  }


}
