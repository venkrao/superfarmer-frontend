import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-listings',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  constructor(private userService: UserService,
              private router:Router
              ) { }

  user_name
  logout_succeeded

  ngOnInit() {
    this.user_name = this.userService.getUsername()
  }

  logout() {
    if (this.userService.logout()) {
      this.logout_succeeded = true
      window.location.reload()
      return false
    }
  }

  login() {
    this.router.navigate(['/login'])
    return false
  }

  myNegotiationRequests() {
    this.router.navigate(["me/negotiationrequests"])
    return false;
  }

  myprofile() {
    this.router.navigate(["me/profile"]);
    return false;
  }

}
