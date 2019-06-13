import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../rest-request.service'
import {
   Router,

} from '@angular/router';
import { UserService } from '../user.service'

import { HttpResponseParserService } from '../http-response-parser.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ContactSellerDialogComponent } from '../contact-seller-dialog/contact-seller-dialog.component';

@Component({
  selector: 'app-listing',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  constructor(private restRequestService:RestRequestService,
    private router:Router,
    private userService: UserService,
    private httpResponseParser: HttpResponseParserService,
    public dialog: MatDialog
  ) { }


listingsAvailable
listings:any;
contact_seller
brokenBackend
  ngOnInit() {
    this.restRequestService.getRequest(undefined, "inventory", undefined).subscribe(
      listings => {
        if (Object.keys(listings).length > 0) {
          this.listingsAvailable = true;
          this.listings = listings
          console.log(listings)
        } else {
          console.log("no listings available.")
          this.listingsAvailable = false;
        }


      },
      errors => {
        if (this.httpResponseParser.isForbiddenResponse(errors) == 403) {
          alert("Invalid session. Please login again.")
          this.userService.clearLocalStorage()
          this.router.navigate(["/login"]);
        }
        if (errors.status == 0) {
          this.brokenBackend = true
        }
        console.log(errors)
      }
    )
  }

  openDialog(listing_id, soldby): void {
   const dialogRef = this.dialog.open(ContactSellerDialogComponent, {
     width: '40%',
     data: {listing_id: listing_id, soldby: soldby}
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
   });
 }

  redirectToLogin() {
  this.router.navigate(["/login"])
  }
}
