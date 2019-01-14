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

  private showListingForm = false;

  public toggle_listing_form() {
    this.showListingForm = ! this.showListingForm
    return false;
  }

showUploadedListings
listing_id

  public onSubmit(createAdForm) {
    const formData = new FormData();

      formData.append("product_name", createAdForm.controls['product_name'].value)
      formData.append("measuring_unit", createAdForm.controls['measuring_unit'].value)
      formData.append("quantity", createAdForm.controls['quantity'].value)
      formData.append("image", this.item_picture, this.item_picture.name)
      formData.append("price", createAdForm.controls['price'].value)


    this.restRequestService.postRequest(undefined, formData, "inventory").subscribe(
        response => {
          this.listing_id = response["inventory_id"]
        },
        failure => {
          console.log("Failure: "+ JSON.stringify(failure))
          if (failure.error.detail == "Invalid token header. No credentials provided.") {
            alert("Sorry. Your session has timed out. Please login again.")
            this.userService.clearLocalStorage()
            this.router.navigate(["/login"]);
          }
        }
    )
  }

  item_picture: File = null;
  onFileSelected(event) {
    this.item_picture = <File>event.target.files[0];
  }

  allListings:any;

  ngOnInit() {

    this.restRequestService.getRequest(undefined, "inventory", undefined).subscribe(
      listings => {
        this.showUploadedListings = true;
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
