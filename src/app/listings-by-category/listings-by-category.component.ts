import { HttpResponseParserService } from '../http-response-parser.service'
import { Component, OnInit } from '@angular/core'
import { UserService } from '../user.service'
import { RestRequestService } from '../rest-request.service'
import {
   Router,
   ActivatedRoute,
} from '@angular/router';
@Component({
  selector: 'app-listings-by-category',
  templateUrl: './listings-by-category.component.html',
  styleUrls: ['./listings-by-category.component.css']
})
export class ListingsByCategoryComponent implements OnInit {

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private httpResponseParser: HttpResponseParserService,
    private restRequestService:RestRequestService,
    private userService: UserService,
  ) { }

  // input
  categoryName:any;
  listingsAvailable
  allListings:any;

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      routeParams => {
    		this.categoryName = routeParams.id;
    	}
    );
    const formData = new FormData();
    formData.append("category_name", this.categoryName)

    this.restRequestService.getRequest(undefined, "listings_by_category", this.categoryName).subscribe(
        listings => {
          this.listingsAvailable = true
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
}
