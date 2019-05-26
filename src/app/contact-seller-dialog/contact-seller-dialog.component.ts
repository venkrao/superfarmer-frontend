import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  listing_id: number;
}

@Component({
  selector: 'app-contact-seller-dialog',
  templateUrl: './contact-seller-dialog.component.html',
  styleUrls: ['./contact-seller-dialog.component.css']
})
export class ContactSellerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContactSellerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  send_succeded
  send_failed
  onNoClick(): void {
      this.dialogRef.close();
  }
  contactSeller(): void {
    console.log("contacting sender.." + this.data["listing_id"])

    this.send_succeded = true
    setTimeout(
      () => { this.dialogRef.close() }, 3000
    )

  }
}
