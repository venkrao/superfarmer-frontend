import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../rest-request.service'

@Component({
  selector: 'app-hellothere',
  templateUrl: './hellothere.component.html',
  styleUrls: ['./hellothere.component.css']
})
export class HellothereComponent implements OnInit {

  constructor(
    private restRequestService: RestRequestService
  ) { }

  myvar
  ngOnInit() {
    this.myvar = "sachin"
    this.restRequestService.getRequest(undefined, "get_products", undefined).subscribe(

      response => {
          console.log(response)
          this.myvar = response[0]["product_name"]
      },
      error => {
        console.log("failed")
      }


    )
  }




}
