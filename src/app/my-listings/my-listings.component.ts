import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../rest-request.service'


@Component({
  selector: 'app-me',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {
  constructor(
    private restRequestService:RestRequestService,
  ) { }

  allListings:any;
  listingsAvailable

  ngOnInit() {

    this.restRequestService.getRequest(undefined, "mylistings", undefined).subscribe(
      listings => {
        this.listingsAvailable = true
        console.log(listings)
        this.allListings = listings
      },
      errors => {
        console.log(errors)
      }
    )
  }

}
