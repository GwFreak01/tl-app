import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
    if (!loginForm) {
      return;
    }
    this.isLoading = true;
    this.authService.loginUser(loginForm.value.username, loginForm.value.password);
    this.isLoading = false;
    loginForm.resetForm();

  }

}
