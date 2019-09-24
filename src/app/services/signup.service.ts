import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

   constructor(private http: HttpClient) { }

  private streamStatus:BehaviorSubject<boolean> = new BehaviorSubject(false);
  receiveStatus = this.streamStatus.asObservable();

  private url = "http://localhost:5000/api/pseudo_url";

  sendStatus(status : boolean) {
    this.streamStatus.next(status);
  }

  getInfo(): string {
    //return this.http.get<any>(this.url);
    return "HTTP Request Success";
  }
}
