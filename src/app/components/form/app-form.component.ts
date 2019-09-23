import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private signupService: SignupService) { }

  address: string="";
  isSubmitted: boolean = false;
  isEmailValid: boolean = true;
  private message:string = "Please enter a valid email address.";
  
  selectedOpt:string="Your Interests";

  options: string[] = [
    "Your Interests",
    "Development",
    "Northern"];

  submitting: boolean = false;

  btnTextBox: string = "Sign Up Now";

  btnDisabled: boolean = false;
  ngOnInit() {
  }

  onSubmit() {
    // var email = <HTMLInputElement> document.getElementById("email");

    if(!this.btnDisabled)
    {
      if(this.validateEmail(this.address)) {

        var jsonObj = {
          "email" : this.address, 
          "option" : this.selectedOpt
        };
        
        var jsonData = JSON.stringify(jsonObj);
        console.log(jsonData);
          
        this.submitting = true;
        this.btnTextBox = "Submitting...";
        this.btnDisabled = true;
        
        this.loadingState().subscribe( res => {
          console.log(this.signupService.getInfo());
          this.isSubmitted = true;
          this.signupService.sendStatus(true);
        });
  
      }
      else {
        this.isEmailValid = false;
        this.resetState();
      }
    }
  
  }


  validateEmail(email:string) : boolean {
    var standard = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

    if (standard.test(email)) {
      return true;
    }
    else {
      return false;
    }
  }

  resetState() {
    this.address = "";
    this.selectedOpt = this.options[0];
  }

  loadingState(): Observable<any> {
    return of(null).pipe(delay(2000)); 
  }


}
