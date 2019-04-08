import { Component, OnInit } from '@angular/core';
import {
   Router,


} from '@angular/router';
import { UserService } from '../user.service'
import { RestRequestService } from '../rest-request.service'

import { HttpResponseParserService } from '../http-response-parser.service'

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})


export class CreateListingComponent implements OnInit {

  constructor(
    private restRequestService:RestRequestService,
      private router:Router,

      private userService: UserService,
      private httpResponseParser: HttpResponseParserService
  ) { }

  products = undefined
  measuring_units = undefined

  seller = false

  ngOnInit() {
  this.restRequestService.postRequest(undefined, undefined, "isseller").
    subscribe(
        response => {
           if (response["seller"] == true)
              this.seller = true
        },
        error => {
          console.log(error)
        }
    )

    this.restRequestService.getRequest(undefined, "get_products", undefined).
    subscribe(
      products => {
        this.products = products
        console.log(products)
      },
      errors => {
        console.log(errors)
      }
    )

    this.restRequestService.getRequest(undefined, "get_measuring_units", undefined).
    subscribe(
      measuring_units => {
        this.measuring_units = measuring_units
        console.log(measuring_units)
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

  listing_id
  errorResponse

  public onSubmit(createAdForm) {
    const formData = new FormData();

      formData.append("listing_title", createAdForm.controls['listing_title'].value)
      formData.append("product_name", createAdForm.controls['product_name'].value)
      formData.append("measuring_unit", createAdForm.controls['measuring_unit'].value)
      formData.append("quantity", createAdForm.controls['quantity'].value)
      formData.append("image", this.item_picture, this.item_picture.name)
      formData.append("price", createAdForm.controls['price'].value)

    this.restRequestService.postRequest(undefined, formData, "inventory").subscribe(
        response => {
          if(response["inventory_update"] == "failed") {
            this.errorResponse = true
          } else {
            this.errorResponse = false
            this.listing_id = response["inventory_id"]
          }
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
}
