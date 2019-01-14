import { Component, OnInit } from '@angular/core';
import {
   Router,
   ActivatedRoute,

} from '@angular/router';
import { UserService } from '../user.service'
import { RestRequestService } from '../rest-request.service'

import { HttpResponseParserService } from '../http-response-parser.service'

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
    private httpResponseParser: HttpResponseParserService
  ) { }

  // input
  listing_id:any;

  // response
  inventory_product_quantity
  inventory_item_create_datetime
  item_picture
  product_name
  product_category
  seller
  product_measuring_unit
inventory_item_id
  quantity
  listing_title
  item_price
  seller_name

  ngOnInit() {
      //this.restRequestService.getRequest(undefined, "inventory",  )

  this.activatedRoute.params.subscribe(
    routeParams => {
  		this.listing_id = routeParams.id;
  	}
  );

    this.restRequestService.getRequest(undefined, "inventory_item_listing", this.listing_id).subscribe(
      response => {
          console.log("here")
          this.inventory_item_id = response[0]["inventory_item_id"]
          this.listing_title = response[0]["listing_title"]
          this.inventory_product_quantity = response[0]["inventory_product_quantity"]
          this.inventory_item_create_datetime = response[0]["inventory_item_create_datetime"]
          this.item_picture = "http://127.0.0.1:8000"  + response[0]["item_picture"]
          this.product_name = response[0]["product_name"]
          this.product_category = response[0]["product_category"]
          this.product_measuring_unit = response[0]["measuring_unit"]
          this.item_price = response[0]["item_price"]
          this.seller_name = response[0]["seller_name"]

          this.quantity = this.inventory_product_quantity

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
}
