import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { University, UniversityDetail } from "./models/university.model";
import { User } from "./models/user.model";
import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  KEY = '07dff5fdceb078b06c97a89a3f9a2bf5'

  user = new BehaviorSubject<User>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { name: null, email: null, phone: null, last_otp: null });
  constructor(private http: HttpClient) { }

  onGetData() {
    return this.http.get<University[]>('http://webideasole.com/russia-mbbs/api/allCollage.php').pipe(map(res => res['body']))
  }

  onSetCollegeId(id: number) {
    localStorage.setItem('collage_id', id.toString())
  }

  onGetCollegeId() {
    return localStorage.getItem('collage_id')
  }

  onLogout() {
    localStorage.clear()
    this.user.next({ name: null, email: null, phone: null, last_otp: null });
  }

  onLoginWithPhone(phone: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.KEY);
    return this.http.get<{ message: string, otp: number, status: boolean }>(`http://webideasole.com/russia-mbbs/api/sendOtp.php?phone=${phone}`, { headers: headers })
  }

  onLoginWithEmail(phone: string, email: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.KEY);
    return this.http.get<{ message: string, otp: number, status: boolean }>(`http://webideasole.com/russia-mbbs/api/sendOtp.php?phone=${phone}&email=${email}`, { headers: headers })
  }

  onLoginWithAllFields(form: FormData) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.KEY);
    return this.http.post<{ status: boolean }>('http://webideasole.com/russia-mbbs/api/adduser.php', form, { headers: headers })
  }

  onSuccessfulLogin(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
    this.user.next(user)
  }

  onVerifyOTP(otp: number, phone: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.KEY);
    return this.http.get(`http://webideasole.com/russia-mbbs/api/verifyOtp.php?phone=${phone}&otp=${otp}`, { headers: headers })
  }

  onGetUniversity(id: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.KEY);
    return this.http.get<UniversityDetail>(`http://webideasole.com/russia-mbbs/api/collageDetails.php?id=${id}`, { headers: headers }).pipe(map(res => res['data']))
  }
}
