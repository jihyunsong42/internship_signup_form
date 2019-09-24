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

  constructor(private signupService: SignupService) { } // Dependency Injection for HTTP Request and interacting with the Result Component.

  private address: string = ""; // connected with html by two-way binding
  private isSubmitted: boolean = false;
  private isEmailValid: boolean = true;

  private message: string = "Please enter a valid email address.";

  private options: string[] = [
    "Your Interests",
    "Development",
    "Northern"];

  private selectedOpt: string = this.options[0]; // default: "Your Interests", connected with html by two-way binding

  private submitting: boolean = false;

  private btnTextBox: string = "Sign Up Now"; // initialized text on the button, connected with html by two-way binding

  private btnDisabled: boolean = false;

  ngOnInit() {
  }

  onSubmit() { //when the form is submitted

    if (this.validateEmail(this.address)) { // check the email address

      this.isEmailValid = true; // remove email error message if the error message appeared once before

      // convert the email address and the selected option to JSON format and log them in the browser console
      var jsonObj = {
        "email": this.address,
        "option": this.selectedOpt
      };
      var jsonData = JSON.stringify(jsonObj);
      console.log(jsonData);

      this.submitting = true; // turn on submitting, so that the button is disabled and the icon on the button is disappeared 

      this.btnTextBox = "Submitting..."; // change button text box from "Sign Up Now" to "Submitting..."

      // Subscribing "loadingState" Observable
      this.loadingState().subscribe(res => { // loading HTTP Request for two seconds
        console.log(this.signupService.getInfo()); // get fake request results through the service
        this.isSubmitted = true; // turn on "isSubmitted" to close this component
        this.signupService.sendStatus(true); // stream current status via Behavior Subject in the Service
      });

    }
    else {
      this.isEmailValid = false; // print email error message
      this.resetState(); // reset all inputs in the form
    }
  }

  // email validation
  validateEmail(email: string): boolean {
    var standard = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

    if (standard.test(email)) {
      return true;
    }
    else {
      return false;
    }
  }

  // reset all inputs in the form
  resetState() {
    this.address = "";
    this.selectedOpt = this.options[0];
  }

  // loading HTTP Request for two seconds
  loadingState(): Observable<any> {
    return of(null).pipe(delay(2000));
  }
}
