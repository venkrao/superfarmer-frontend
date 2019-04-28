import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../rest-request.service'

@Component({
  selector: 'app-register-as-seller',
  templateUrl: './register-as-seller.component.html',
  styleUrls: ['./register-as-seller.component.css']
})
export class RegisterAsSellerComponent implements OnInit {

  constructor(
      private restRequestService:RestRequestService
  ) { }

  registration_succeeded = false
  registration_failed = false
  already_a_seller =  false

  ngOnInit() {
  }
  onSubmit(registerAsSellerForm) {
    this.restRequestService.postRequest(undefined, undefined, "register_as_seller").subscribe(
      response => {
        console.log(response)
        if (response["response"] == "already_registered") {
          this.already_a_seller = true
        }
        if (response["response"] == "success") {
          this.registration_failed = false
          this.registration_succeeded = true
        } else if (response["response"] == "failed")
          this.registration_failed = true
      },
      error => {
        console.log(error)
      }
    )
  }
}
