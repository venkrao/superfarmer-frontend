import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { RestRequestService } from '../rest-request.service'
import {
   Router,

} from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  constructor(private userService: UserService,
    private router: Router,
    private restRequestService:RestRequestService) {
  }

  log(whatever) {
    console.log(whatever);
  }

  results:any;
  error:any;

  public onSubmit(userRegistrationForm) {
    this.results = ''
    this.error = ''

    console.log(userRegistrationForm)

    const formData = {
      "address": userRegistrationForm.controls['address'].value,
      "city": userRegistrationForm.controls['city'].value,
      "state": userRegistrationForm.controls['state'].value,
      "country": userRegistrationForm.controls['country'].value,
      "phone_primary": userRegistrationForm.controls['phone_primary'].value,
    }

    this.restRequestService.postRequest(undefined, formData, "usercontactinfo").subscribe(
      updateSucceeded => {
        this.results = JSON.stringify(updateSucceeded),
        console.log(this.results)
      },
      updateFailed => {
        console.log("Sorry, your request failed : " + updateFailed.status)
        this.error = "Sorry, your request failed : " + updateFailed.status;
      }
    );
  }

  ngOnInit() {
    if (this.userService.getAccessToken() == undefined ) {
      console.log("no token.")
      this.router.navigate(["/login"]);
    }

    this.restRequestService.postRequest(undefined, undefined, "is_registration_complete").subscribe(
      response => {
        console.log(response)
        if (response["registered"] == true) {
          this.router.navigate(["/home"])
        } else {
          this.router.navigate(["/login"])
        }
      }
    )
  }

}
