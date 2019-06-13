import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RestRequestService } from '../rest-request.service'
import { UserService } from '../user.service'

import { HttpResponseParserService } from '../http-response-parser.service'

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
    private restRequestService:RestRequestService,
    private userService: UserService,
    private httpResponseParser: HttpResponseParserService,
    public dialogRef: MatDialogRef<ContactSellerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  listing_id
  send_succeded = false
  send_failed = false
  request_body
  reason

  onNoClick(): void {
      this.dialogRef.close();
  }
  contactSeller(): void {
    this.listing_id = this.data["listing_id"]
    console.log("contacting sender.." + this.data["listing_id"])
    const formData = new FormData();

    formData.append("listing_id", this.listing_id)
    formData.append("request_body", this.request_body)

    this.restRequestService.postRequest(undefined, formData, "initiate_negotiation").
      subscribe(
          response => {
             console.log(response)
             if (response["response"] == "failed") {
               this.send_failed = true
               this.reason = response["reason"]
             } else {
               this.send_succeded = true
               setTimeout(
                 () => { this.dialogRef.close();}, 2000
               );
             }
          },
          error => {
            console.log(error);
          }
      );

  }
}
