import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../rest-request.service'
import {
   Router,

} from '@angular/router';
import { UserService } from '../user.service'

@Component({
  selector: 'app-listing',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  constructor(private restRequestService:RestRequestService,
    private router:Router,
    private userService: UserService,
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


    this.restRequestService.postRequest(undefined, formData, "inventory").subscribe(
        response => {
          console.log(response)
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
        console.log(errors)
      }
    )
  }

}
