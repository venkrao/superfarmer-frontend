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

  ngOnInit() {

    this.restRequestService.postRequest(undefined, undefined, "mylistings").subscribe(
      listings => {
        console.log(listings)
        this.allListings = listings["repsonse"]
      },
      errors => {
        console.log(errors)
      }
    )
  }

}
