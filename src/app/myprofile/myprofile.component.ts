import { Component, OnInit } from '@angular/core';
import {AuthService} from 'angular5-social-login';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {RestRequestService} from '../rest-request.service';
import {ApplicationRef} from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(private socialAuthService: AuthService,
              private userService: UserService,
              private router: Router,
              private restRequestService:RestRequestService,
              private appReference:ApplicationRef) { }

   profile_exists
   profile
   address
  name

   about_me
  city
  state
  country
  phone_primary
  email_address
  otp
  otp_phone_number
  otp_exists
  results
  error
  phone_number_updated
  show_update_profile_form
  otp_generated
  phone_primary_new

  ngOnInit() {
    this.restRequestService.getRequest(undefined, "my_profile", undefined).subscribe(
        response => {
          this.profile_exists = true
          this.profile = response[0]
          console.log(response)

          this.name = this.profile.user_id.name
          this.email_address = this.profile.user_id.email_address

          this.about_me = this.profile.about_me
          this.address = this.profile.address
          this.city = this.profile.city
          this.state = this.profile.state
          this.country = this.profile.country
          this.phone_primary = this.profile.phone_primary

          this.city = this.profile.city
          this.otp_exists = this.profile.otp.exists
          if (this.otp_exists) {
            this.phone_primary_new = this.profile.otp.phone_number
          } else {
            this.phone_primary_new = this.profile.phone_primary
          }

      },

      failure => {
        console.log("Failure: "+ JSON.stringify(failure))
        if (failure.error.detail == "Invalid token header. No credentials provided." ||
          failure.error.detail == "Authentication credentials were not provided.") {
          alert("Sorry. Your session has timed out. Please login again.")
          this.userService.clearLocalStorage()
          this.router.navigate(["/login"])
        }
      }
    );
  }

  show_update_profile() {
    this.show_update_profile_form = !this.show_update_profile_form
    return false
  }

  updateProfile(userRegistrationForm) {

    this.results = ''
    this.error = ''
    this.otp_exists = ''

    console.log(userRegistrationForm)

    const formData = {
      "address": userRegistrationForm.controls['address'].value,
      "city": userRegistrationForm.controls['city'].value,
      "state": userRegistrationForm.controls['state'].value,
      "country": userRegistrationForm.controls['country'].value,
      "phone_primary": userRegistrationForm.controls['phone_primary_new'].value,
      "about_me": userRegistrationForm.controls['about_me'].value,
    }

    this.restRequestService.postRequest(undefined, formData, "usercontactinfo").subscribe(
      updateSucceeded => {
        this.results = JSON.stringify(updateSucceeded),
          console.log(this.results)
          if ( updateSucceeded["phone_number_change"] ) {
            this.otp_exists = true
            this.phone_primary_new = userRegistrationForm.controls['phone_primary_new'].value
          }
      },
      updateFailed => {
        console.log("Sorry, your request failed : " + updateFailed.status)
        this.error = "Sorry, your request failed : " + updateFailed.status;
      }
    );

    return false;
  }

  verify_otp(verifyOTPForm, phone_number) {
    const formData = {
      "otp": verifyOTPForm.controls['otp'].value,
      "phone_number": phone_number,
    };
    this.restRequestService.postRequest(undefined, formData, "verify_phone").subscribe(
      results => {
        console.log(results)
        this.results = JSON.stringify(results)
        if (results["verified"] == "ok") {
          this.phone_primary = phone_number
        }
      },
      error => {
        console.log(error)
      }
    );
  }
}
