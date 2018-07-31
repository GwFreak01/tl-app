import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {run} from 'tslint/lib/runner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'app';

  constructor(private authService: AuthService) {

  }

  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }
  ngOnInit() {
    this.authService.autoAuthUser();

  }
}
