import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { University } from '../models/university.model';
import { PATH } from "../utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  universities: University[]
  path = PATH
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.onGetData().subscribe(res => {
      this.universities = res;
    })
  }

  storeId(id: number) {
    this.api.onSetCollegeId(id)
  }

}
