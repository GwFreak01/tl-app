import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authStatus => {
          this.isLoading = false;
        }
      );
  }
// TODO: Verify second password
  onCreateUser(createUserForm: NgForm) {
    // console.log(createUserForm.value);
    if (createUserForm.invalid) {
      return;
    } else {
      this.isLoading = true;
      this.authService.createUser(createUserForm.value)
        .subscribe((response) => {
          // console.log('onCreateUser.response: ', response);
          this.router.navigate(['/dashboard']);
        }, error => {
          // console.log(error);
          this.isLoading = false;
        });
    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
