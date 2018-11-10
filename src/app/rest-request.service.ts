import { Injectable } from '@angular/core';
import { UserService } from './user.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {

  constructor(private userService:UserService, private http: HttpClient) {

  }

  endpoints = {
    "usercontactinfo": "http://127.0.0.1:8000/userprofile/",
    "userauth": "http://127.0.0.1:8000/userauth",
    "converttoken": "http://127.0.0.1:8000/auth/convert-token",
    "playground": "http://127.0.0.1:8000/playgroundview",
  }

  private httpRequestHeaders:any;

  public postRequest(httpRequestHeaders:any, httpRequestData:any, httpEndPoint:any) {

    console.log("sending post request to: " + httpEndPoint + ": " + this.endpoints[httpEndPoint])
    //httpRequestData["token"] = this.userService.getAccessToken()
    //httpRequestData["user_id"] = this.userService.getUserId()
    //httpRequestData["access_token"] = this.userService.getAccessToken()
   console.log("composed request headers " + JSON.stringify(this.httpRequestHeaders))
   return this.http.post(this.endpoints[httpEndPoint],
   httpRequestData, this.httpRequestHeaders)
  }
}
