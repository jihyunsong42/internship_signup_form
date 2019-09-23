import { Component } from '@angular/core';
import { SignupService } from './services/signup.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  
  isSubmitted:boolean = false;

}
