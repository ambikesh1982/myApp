import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-contact-card',
  templateUrl: './dialog-contact-card.component.html',
  styleUrls: ['./dialog-contact-card.component.scss']
})
export class DialogContactCardComponent implements OnInit {

  dialogData: any;

  constructor(
    private dialogRef: MatDialogRef<DialogContactCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.dialogData = this.data.dialogMessage;
    console.log('dialogContactCard: ', this.data.dialogMessage);
  }

}
