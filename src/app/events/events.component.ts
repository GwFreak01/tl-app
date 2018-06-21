import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  addButtonSelect = false;

  constructor() { }

  ngOnInit() {
  }

  onAddButtonSelect() {
    console.log('onAddButtonSelect');
    this.addButtonSelect = true;
  }
}
