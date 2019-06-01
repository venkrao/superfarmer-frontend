import { Component, OnInit } from '@angular/core';
import {
   Router,
   ActivatedRoute,

} from '@angular/router';
import { UserService } from '../user.service'
import { RestRequestService } from '../rest-request.service'

import { HttpResponseParserService } from '../http-response-parser.service'
import { ContactSellerDialogComponent } from '../contact-seller-dialog/contact-seller-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit {

  constructor(private restRequestService:RestRequestService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private httpResponseParser: HttpResponseParserService,
    public dialog: MatDialog,
  ) { }

  // input
  listing_id:any;

  // response
  listingDetails

  ngOnInit() {
      //this.restRequestService.getRequest(undefined, "inventory",  )

  this.activatedRoute.params.subscribe(
    routeParams => {
  		this.listing_id = routeParams.id;
  	}
  );

    this.restRequestService.getRequest(undefined, "inventory_item_listing",
    this.listing_id).subscribe(
      response => {
          this.listingDetails = response
          console.log(response)
      },
      error => {
        console.log(error)
        if (this.httpResponseParser.isForbiddenResponse(error) == 403) {
          alert("Invalid session. Please login again.")
          this.userService.clearLocalStorage()
          this.router.navigate(["/login"]);
        }
    }
    )
  }

  openDialog(listing_id): void {
   const dialogRef = this.dialog.open(ContactSellerDialogComponent, {
     width: '40%',
     data: {listing_id: listing_id}
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
   });
 }
}
