import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToEvents() {
    console.log('Cancel Company');
    this.router.navigate(['/events']);

  }
}
