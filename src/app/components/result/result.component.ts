import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private signupService: SignupService) { }

  
  isSubmitted: boolean = false;

  ngOnInit() {
    this.signupService.receiveStatus.subscribe(res => {
      this.isSubmitted = res;
    })
  }
}
