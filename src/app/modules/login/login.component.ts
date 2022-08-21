import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CoronaAppService } from '../corona-app.service';
import { IUser } from 'src/app/models/IUser.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = false;
  user: IUser;
  constructor(private _coronaAppService: CoronaAppService, private router: Router) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "password": new FormControl("", [Validators.required, Validators.minLength(8)])
    });

  }
  public togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
  async logIn() {
    this._coronaAppService.login(this.loginForm?.value.name, this.loginForm?.value.password).subscribe(newUser => {
      this.user = newUser;
      console.log(this.user)
      sessionStorage.setItem("user", JSON.stringify(this.user))
      this.router.navigate(['reports']);
    });;


  }
}
