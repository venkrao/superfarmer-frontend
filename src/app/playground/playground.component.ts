import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../rest-request.service'
import { UserService } from '../user.service'
import {
   Router,
   ActivatedRoute,

} from '@angular/router';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  constructor(
    private restRequestService:RestRequestService,
      private router:Router,
      private userService: UserService,
  ) {
}
  response: any
  category_name
  inventory_id
  ngOnInit() {
  }

  onSubmitPost(playgroundForm) {
    const formData = new FormData();
    formData.append("category_name", playgroundForm.controls['data'].value)

    this.restRequestService.postRequest(undefined, formData, "playground").subscribe(
        response => {
          console.log(response)
          this.response = JSON.stringify(response["response"])

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

  onSubmitGet(playgroundForm) {
    this.category_name = playgroundForm.controls['data'].value

    this.restRequestService.getRequest(undefined, "playground",
      undefined).subscribe(
        response => {
          console.log(response)
          this.response = JSON.stringify(response["response"])

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

  onSubmitDelete(playgroundForm) {
    this.inventory_id = playgroundForm.controls['data'].value

    this.restRequestService.deleteRequest(undefined, "playground", this.inventory_id).subscribe(
        response => {
          console.log(response)
          this.response = JSON.stringify(response["response"])

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
