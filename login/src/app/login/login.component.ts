import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isForgotPassword:boolean=false;

  toggleForgotPassword() 
  {
    this.isForgotPassword=!this.isForgotPassword;
  }
  redirectToChangePassword()
  {
    // // this.router.navigate(["/change-password"])
    // var email =  {email: 'abc'};
    // try {
    //   fetch('http://localhost:3000/Email', {
    //     method: 'POST',
    //     body: JSON.stringify(email)
    //   }).then(function(response) {
    //     console.log(response);
    //     response.json();
    //   }).then(function(reslt) {
    //     console.log(reslt);
    //   })

    // } catch (err) {

    // }
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


var raw = JSON.stringify({
  "email": "sankritivuyyuru@gmail.com"
});

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

fetch("http://localhost:3000/Email", {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "username": new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9@._-]*$")]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }






  onSubmit() {
    this.http.get<object[]>("../assets/users.json").subscribe(
      data => {
        let arr: object[] = data.filter(e => e["username"] == this.loginForm.value['username'] && e["password"] == this.loginForm.value['password']);
        console.log(arr);
        if (arr.length == 0) {
          this.loginForm.setErrors({ "invalidCreds": true })
        } else {
          this.loginForm.setErrors(null);
          this.router.navigate(["/dashboard"])

        }


      }
    )
  }



}
