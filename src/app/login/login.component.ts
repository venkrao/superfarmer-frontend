
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';

import {
   Router,
   RoutesRecognized
} from '@angular/router';

import 'rxjs/add/operator/filter';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

import { RestRequestService } from '../rest-request.service'

@Component({
  selector: 'app-signin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor( private socialAuthService: AuthService,
    private userService: UserService,
    private router: Router,
    private restRequestService:RestRequestService
     ) {
    this.router.events
    .filter(e => e instanceof RoutesRecognized)
    .pairwise()
    .subscribe((event: any[]) => {
      if (this.userService.isLoggedIn()) {
        this.router.navigate([event[0].urlAfterRedirects]);
      }
      console.log(event[0].urlAfterRedirects);
    });

    // This is when user enters the /login link in the address bar directly
    // and if he's logged in, send him to home; coz he/she's alrady logged in.
    if (this.userService.isLoggedIn()) {
      if (this.userService.registrationPending()) {
        console.log("redirect to /register.")
        this.router.navigate(["/register"]);
      } else {
        this.router.navigate(["/home"]);
      }
    }
  }

  // If a logged in user clicks backs, and ends up on the /login page
  // then, send him back to where he came from, coz he's already logged in.

  private backendName:string;

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      this.backendName = "google-plus"
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        const userDataJson = this.generateConvertTokenPayload(userData)

        this.restRequestService.postRequest(undefined, userDataJson, "converttoken").subscribe(
          convertedToken => {
            console.log(convertedToken)
            localStorage.setItem('access_token', convertedToken["access_token"])
            this.restRequestService.postRequest(undefined, undefined, "playground").subscribe(
              response => {
                console.log(response)
              }
            )
            // TODO: START FROM HERE: REGISTER USER..
          },
          convertTokenFailed => {
            console.log("failed to convert token " + convertTokenFailed)
          }
        )
      }
    );
  }

  // Read the external token(google/fb), and compose request param to drf.
  public generateConvertTokenPayload(socialAuthUserdata) {
      const convertTokenPayload = {}
      const socialAuthUserdataJson = JSON.parse(JSON.stringify(socialAuthUserdata))

//grant_type=convert_token&client_id=<client_id>&client_secret=<client_secret>&backend=<backend>&token=<backend_token>

      convertTokenPayload["grant_type"] = "convert_token"
      convertTokenPayload["client_id"] = "bMQ62V8htC2oAgJU6KeLzbMQrvzS2ONY8RWwsypk"
      convertTokenPayload["client_secret"] = "oeYCcZHD0fLL6HmMtskpOgSpGZMCPXuIUjW5hiZchWHvddu2b6f9mTSlGQRmE4MybFfuCUwS7WDjehjF3Cr3v7DPm3soV10oE4KbbTdHVWsIuD8flzPNQNh4v2uQNeAR"
      convertTokenPayload["backend"] = this.backendName
      convertTokenPayload["token"] = socialAuthUserdataJson["token"]

      console.log("returning " + socialAuthUserdataJson.token)

      return convertTokenPayload
  }

  ngOnInit() {
  }
}
