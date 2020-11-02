import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isNavbarCollapsed=true;
  isLoggedin = false
  sub: Subscription
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.sub = this.api.user.subscribe(data => {
      console.log(data)
      if (data.phone !== null) {
        this.isLoggedin = true
      }
    })
  }

  onLogout() {
    this.api.onLogout()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
