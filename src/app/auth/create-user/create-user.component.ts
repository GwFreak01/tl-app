import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  isLoading = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
// TODO: Verify second password
  onCreateUser(createUserForm: NgForm) {
    console.log(createUserForm.value);
    if (createUserForm.invalid) {
      return;
    } else {
      this.isLoading = true;
      this.authService.createUser(
        createUserForm.value.username,
        createUserForm.value.email,
        createUserForm.value.password);
    }
  }

}
