import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
// TODO: Verify second password
  onCreateUser(createUserForm: NgForm) {
    console.log(createUserForm.value);
  }

}
