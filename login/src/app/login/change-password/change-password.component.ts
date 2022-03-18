import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',      
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changepwdForm: FormGroup;

  
  
  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.changepwdForm = new FormGroup({
      "newPassword": new FormControl(null, [Validators.required, Validators.minLength(8)
        // ,Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$')
      ]),
      "confirmNewPassword": new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }






  onSubmit() {
    // alert("on click");
    // this.router.navigate(["/dashboard"])
   
    console.log(this.changepwdForm.status)
    if(this.changepwdForm.status !="INVALID"){
    // this.router.navigate(["/dashboard"])
    var myHeaders = new Headers();

var raw = JSON.stringify({
  "email": "sankritivuyyuru@gmail.com",
  "password": "Pradhyun05",
  "firstname": "toyaza",
  "lastname": "akula",
  "dateofbirth": "2022-10-04",
  "mobile": "9999999999",
  "country": "india"
});



fetch("http://localhost:3000/resetpassword", {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

    }
    }
    



}
