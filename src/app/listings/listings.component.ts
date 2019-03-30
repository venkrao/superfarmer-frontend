import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../rest-request.service'
import {
   Router,

} from '@angular/router';
import { UserService } from '../user.service'

import { HttpResponseParserService } from '../http-response-parser.service'

@Component({
  selector: 'app-listing',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  constructor(private restRequestService:RestRequestService,
    private router:Router,
    private userService: UserService,
    private httpResponseParser: HttpResponseParserService
  ) { }


listingsAvailable
  allListings:any;

  ngOnInit() {
    this.restRequestService.getRequest(undefined, "inventory", undefined).subscribe(
      listings => {
        this.listingsAvailable = true;
        console.log(listings)
        this.allListings = listings
      },
      errors => {
        if (this.httpResponseParser.isForbiddenResponse(errors) == 403) {
          alert("Invalid session. Please login again.")
          this.userService.clearLocalStorage()
          this.router.navigate(["/login"]);
        }
        console.log(errors)
      }
    )
  }

}
