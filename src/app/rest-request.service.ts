import { Injectable } from '@angular/core';
import { UserService } from './user.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {

  constructor(private userService:UserService,
    private http: HttpClient,
    ) {
  }

  postEndpoints = {
    "usercontactinfo": "http://127.0.0.1:8000/userprofile/",
    "userauth": "http://127.0.0.1:8000/userauth",
    "converttoken": "http://127.0.0.1:8000/auth/convert-token",
    "userprofile": "http://127.0.0.1:8000/userprofile",
    "inventory": "http://127.0.0.1:8000/inventory/",
    "is_registration_complete": "http://127.0.0.1:8000/userregistrationstatus",
    "playground": "http://127.0.0.1:8000/playground/",
    "isseller": "http://127.0.0.1:8000/isseller/",
    "register_as_seller": "http://127.0.0.1:8000/register-as-seller/",
    "mylistings": "http://127.0.0.1:8000/me/listings/",
    "listings_by_category": "http://127.0.0.1:8000/listingsbycategory/"
    }

  getEndPoints = {
    "inventory_item_listing": {
        endpoint: "http://127.0.0.1:8000/inventory",
        urlparams: undefined
    },
    "inventory": {
        endpoint: "http://127.0.0.1:8000/inventory",
        urlparams: undefined
    },
    "get_products": {
        endpoint: "http://127.0.0.1:8000/product",
        urlparams: undefined
    },
    "get_measuring_units": {
        endpoint: "http://127.0.0.1:8000/measuringunit",
        urlparams: undefined
    },
    "playground": {
        endpoint: "http://127.0.0.1:8000/playground",
        urlparams: undefined
    },
    "listings_by_category": {
        endpoint: "http://127.0.0.1:8000/listingsbycategory",
        urlparams: undefined
    },
    "mylistings": {
      endpoint: "http://127.0.0.1:8000/me/listings",
      urlparams: undefined
    }
  }

  public postRequest(httpRequestHeaders:any, httpRequestData:any, httpEndPoint:any) {

   console.log("sending post request to: " + httpEndPoint + ": " + this.postEndpoints[httpEndPoint])

   console.log("composed request headers " + JSON.stringify(httpRequestHeaders))
   return this.http.post(this.postEndpoints[httpEndPoint],
   httpRequestData, httpRequestHeaders)
  }

  private endpoint: any;

  public getRequest(httpRequestHeaders:any, httpEndPoint:any, urlParam:any ) {

    if (urlParam != undefined) {
      this.endpoint = this.getEndPoints[httpEndPoint]["endpoint"] + "/" + urlParam
    } else {
      this.endpoint = this.getEndPoints[httpEndPoint]["endpoint"]
    }

    if (this.getEndPoints[httpEndPoint]["urlparams"]) {
      this.endpoint = this.endpoint + "/" + this.getEndPoints[httpEndPoint]["urlparams"]
    }

    console.log("sending get request to: " + httpEndPoint + ": " + this.endpoint)

    console.log("composed request headers " + JSON.stringify(httpRequestHeaders))
    return this.http.get(this.endpoint, httpRequestHeaders)
  }

}
