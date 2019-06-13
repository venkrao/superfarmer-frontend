import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {RestRequestService} from '../rest-request.service';
import {formArrayNameProvider} from '@angular/forms/src/directives/reactive_directives/form_group_name';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-negotiation-requests',
  templateUrl: './negotiation-requests.component.html',
  styleUrls: ['./negotiation-requests.component.css']
})
export class NegotiationRequestsComponent implements OnInit {

  constructor(
    private router:Router,
    private userService:UserService,
    private restRequestService: RestRequestService
  ) { }

  ngOnInit() {
  }

  sent_requests
  no_sent_requests_exist
  sent_requests_exist
  received_requests
  no_received_requests_exist
  received_requests_exist

  get_sent_requests() {
    this.restRequestService.getRequest(undefined,  "my_negotiation_requests_sent", undefined).subscribe(
        response => {
          if (Object.keys(response).length > 0) {
            console.log(response);
            this.sent_requests = response
            this.sent_requests_exist = true
          } else {
            this.no_sent_requests_exist = true
          }
    },error => {
          console.log(error);
    }
    )

    return false
  }

  get_received_requests() {
    this.restRequestService.getRequest(undefined, "my_negotiation_requests_received", undefined).subscribe(
      response => {

        if (Object.keys(response).length > 0) {
          console.log(response);
          this.received_requests = response
          this.received_requests_exist = true
        } else {
          this.no_received_requests_exist = true
        }
      }, error => {
        console.log(error)
      }
    )

    return false
  }

  accept_negotiation_request(request_id) {
    console.log(request_id)
    const formData = new FormData()
    formData.append("accepted","true")

    this.restRequestService.patchRequest(undefined, formData, "accept_negotiation_request" , request_id).subscribe(
      response => {
        console.log(response)
      }, error => {
        console.log(error)
      }
    )
  }

  reject_negotiation_request(request_id) {
    console.log(request_id)
    const formData = new FormData()
    formData.append("rejected","true")

    this.restRequestService.patchRequest(undefined, formData, "accept_negotiation_request" , request_id).subscribe(
      response => {
        console.log(response)
      }, error => {
        console.log(error)
      }
    )
  }



}
