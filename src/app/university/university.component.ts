import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { UniversityDetail } from '../models/university.model';
import { PATH } from '../utils';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {

  university: UniversityDetail
  universityId: number
  path = PATH
  constructor(private param: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.param.paramMap.subscribe(params => {
      this.universityId = +params.get('id');
      this.api.onGetUniversity(this.universityId).subscribe(res => {
        this.university = res;
        console.log(this.university)
      })
    })
  }

}
