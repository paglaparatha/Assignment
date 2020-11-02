import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  recievedOTP: number
  email: string
  phone: string
  name: string
  timer: number = 0
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    this.email = form.value['email']
    this.phone = form.value['phone']
    this.name = form.value['name']

    if (this.email) {
      this.api.onLoginWithPhone(this.phone).subscribe(res => {
        if (res.status == true) {
          this.recievedOTP = res.otp
          this.timer = 0
          setInterval(() => { this.timer++ }, 1000)
        }
      })
    } else {
      this.api.onLoginWithEmail(this.phone, this.email).subscribe(res => {
        if (res.status == true) {
          this.recievedOTP = res.otp
          this.timer = 0
          setInterval(() => { this.timer++ }, 1000)
        }
      })
    }
  }

  onVerifyOtp(form: NgForm) {
    let trialOTP = +form.value['otp']
    let myForm = new FormData()
    myForm.append('email', this.email)
    myForm.append('phone', this.phone)
    myForm.append('name', this.name)
    let collegeId = this.api.onGetCollegeId()
    myForm.append('collage_id', collegeId)
    myForm.append('last_otp', trialOTP.toString())
    this.api.onLoginWithAllFields(myForm).subscribe(res => {
      console.log(res)
      if (res.status) {
        this.api.onVerifyOTP(trialOTP, this.phone).subscribe(resp => {
          this.api.onSuccessfulLogin({name: this.name, email: this.email, phone: this.phone, last_otp: trialOTP})
          this.router.navigate(collegeId ? ['/university', collegeId] : ['/home'])
        })
      }
    })
  }

  onResendOTP() {
    if (this.email) {
      this.api.onLoginWithPhone(this.phone).subscribe(res => {
        if (res.status == true) {
          this.recievedOTP = res.otp
          this.timer = 0
          setInterval(() => { this.timer++ }, 1000)
        }
      })
    } else {
      this.api.onLoginWithEmail(this.phone, this.email).subscribe(res => {
        if (res.status == true) {
          this.recievedOTP = res.otp
          this.timer = 0
          setInterval(() => { this.timer++ }, 1000)
        }
      })
    }
  }

}
