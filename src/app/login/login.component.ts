
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

@Component({
  selector: 'app-signin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor( private socialAuthService: AuthService,
    private userService: UserService, private router: Router ) {
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
      this.router.navigate(["/home"]);
    }
  }

  // If a logged in user clicks backs, and ends up on the /login page
  // then, send him back to where he came from, coz he's already logged in.


  // Set to true upon login.
  private loggedin = false;

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        const userDataJson = this.composeDrfTokenRequest(userData, socialPlatform);
        this.userService.login(userDataJson);
        this.userService.setLocalStorageUserdata(userData, socialPlatform);
        // Now sign-in with userData

        this.loggedin = true;
        this.router.navigate(["/home"]);
      }
    );
  }

  // Read the external token(google/fb), and compose request param to drf.
  public composeDrfTokenRequest(externalToken, socialPlatform) {

     var requestParam: any;

     requestParam = {
       "token": externalToken.token, // This is sent by google.
       "grant_type": "convert_token", // this is standard request param to DRF.
     }

     if (socialPlatform == "google") {
       requestParam.client_id = "V7Z9psJjWaKgY76n2dpiqPtQ0cxHkPjKNb2s1ZsV";
       requestParam.client_secret = "29iZOKJOJu2bEy0VPVtCErduVqNLIetLRA7PQ0bOHyBqoLa5ui9UgEQ8U00hDwArZDpAZ9tt9hNlGSZ1BqD21PkyqXEZ9xmFSP4LGrspROxkYtgVWmsFoLH3gQVofh15";
       requestParam.backend =  "google-plus";
     }

     return JSON.parse(JSON.stringify({"social_auth_userdata": requestParam}));
  }

  ngOnInit() {
  }

}
