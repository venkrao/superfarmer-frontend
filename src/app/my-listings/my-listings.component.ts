import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../rest-request.service'
import { UserService } from '../user.service'

import {
   Router,

} from '@angular/router';


@Component({
  selector: 'app-me',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {
  constructor(
    private restRequestService:RestRequestService,
    private userService: UserService,
          private router:Router,
  ) { }

  allListings:any;
  listingsAvailable = false
  inventory_id
  response
  delete_listing
  total

  ngOnInit() {
    this.restRequestService.getRequest(undefined, "mylistings", undefined).subscribe(
      listings => {
        this.total = 0
        if (Object.keys(listings).length > 0) {
            this.listingsAvailable = true
            this.total = Object.keys(listings).length
        }
        this.allListings = listings
      },
      failure => {
        console.log("Failure: "+ JSON.stringify(failure))
        if (failure.error.detail == "Invalid token header. No credentials provided.") {
          alert("Sorry. Your session has timed out. Please login again.")
          this.userService.clearLocalStorage()
          this.router.navigate(["/login"])
        }
      }
    )
  }

  deleteListing(listing_id) {
  this.delete_listing = confirm("Are you sure you want to delete this listing?")

  if (this.delete_listing) {
    this.inventory_id = listing_id
    this.restRequestService.deleteRequest(undefined, "inventory_item", this.inventory_id).subscribe(
        response => {
          console.log(response)
          this.response = JSON.stringify(response["response"])
          document.getElementById("listing_" + this.inventory_id).remove();
        },
        failure => {
          console.log("Failure: "+ JSON.stringify(failure))
          if (failure.error.detail == "Invalid token header. No credentials provided.") {
            alert("Sorry. Your session has timed out. Please login again.")
            this.userService.clearLocalStorage()
            this.router.navigate(["/login"])
          }
        }
    )

  } else {
    console.log("NOT deleting listing")
    return
  }
  }


}
