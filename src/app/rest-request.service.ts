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
    "listings_by_category": "http://127.0.0.1:8000/listingsbycategory/",
    "initiate_negotiation": "http://127.0.0.1:8000/negotiationrequest/",
    "verify_phone": "http://127.0.0.1:8000/verify_otp/",
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
        endpoint: "http://127.0.0.1:8000/playground/",
        urlparams: undefined
    },
    "listings_by_category": {
        endpoint: "http://127.0.0.1:8000/listingsbycategory",
        urlparams: undefined
    },
    "mylistings": {
      endpoint: "http://127.0.0.1:8000/me/listings",
      urlparams: undefined
    },
    "my_negotiation_requests_sent" : {
      endpoint: "http://127.0.0.1:8000/me/negotiationrequests/sent",
      urlparams: undefined
    },
    "my_negotiation_requests_received" : {
      endpoint: "http://127.0.0.1:8000/me/negotiationrequests/received",
      urlparams: undefined
    },
    "my_profile" : {
      endpoint: "http://127.0.0.1:8000/me/profile",
      urlparams: undefined
    },
  }

  deleteEndPoints = {
    "playground": {
        endpoint: "http://127.0.0.1:8000/playground",
        urlparams: undefined
    },
    "inventory_item": {
      endpoint: "http://127.0.0.1:8000/inventory",
        urlparams: undefined
    },
  }

  putEndPoints = {
    "accept_negotiation_request": {
      endpoint: "http://127.0.0.1:8000/negotiationrequest",
      urlparams: undefined
    }
  }

  patchEndPoints = {
    "accept_negotiation_request": {
      endpoint: "http://127.0.0.1:8000/negotiationrequest",
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

  public deleteRequest(httpRequestHeaders:any, httpEndPoint:any, urlParam:any ) {

    if (urlParam != undefined) {
      this.endpoint = this.deleteEndPoints[httpEndPoint]["endpoint"] + "/" + urlParam
    } else {
      this.endpoint = this.deleteEndPoints[httpEndPoint]["endpoint"]
    }

    if (this.deleteEndPoints[httpEndPoint]["urlparams"]) {
      this.endpoint = this.endpoint + "/" + this.deleteEndPoints[httpEndPoint]["urlparams"]
    }

    console.log("sending get request to: " + httpEndPoint + ": " + this.endpoint)

    console.log("composed request headers " + JSON.stringify(httpRequestHeaders))
    return this.http.delete(this.endpoint, httpRequestHeaders)
  }

  public putRequest(httpRequestHeaders:any, httpRequestData:any, httpEndPoint:any, urlParam:any)  {

    if (urlParam != undefined) {
      this.endpoint = this.putEndPoints[httpEndPoint]["endpoint"] + "/" + urlParam + "/"
    } else {
      this.endpoint = this.putEndPoints[httpEndPoint]["endpoint"] + "/"
    }

    console.log("sending put request to: " + httpEndPoint + ": " + this.endpoint)

    console.log("composed request headers " + JSON.stringify(httpRequestHeaders))
    return this.http.put(this.endpoint, httpRequestData, httpRequestHeaders)
  }


  public patchRequest(httpRequestHeaders:any, httpRequestData:any, httpEndPoint:any, urlParam:any)  {

    if (urlParam != undefined) {
      this.endpoint = this.patchEndPoints[httpEndPoint]["endpoint"] + "/" + urlParam + "/"
    } else {
      this.endpoint = this.patchEndPoints[httpEndPoint]["endpoint"] + "/"
    }

    console.log("sending patch request to: " + httpEndPoint + ": " + this.endpoint)

    console.log("composed request headers " + JSON.stringify(httpRequestHeaders))
    return this.http.patch(this.endpoint, httpRequestData, httpRequestHeaders)
  }

}
