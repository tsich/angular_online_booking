import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  slots: any[];
  maxAvailLength: number;

  constructor() {
    this.slots = [
      {
        id: 0,
        day: 'Monday',
        availabilities: [
          {
            time: '09:30',
          },
          {
            time: '09:35',
          },
          {
            time: '09:40',
          },
          {
            time: '09:45',
          },
          {
            time: '09:50',
          },
        ],
      },
      {
        id: 1,
        day: 'Tuesday',
        availabilities: [
          {
            time: '10:30',
          },
          {
            time: '10:35',
          },
          {
            time: '10:40',
          },
          {
            time: '10:45',
          },
        ],
      },
      {
        id: 2,
        day: 'Wednesday',
        availabilities: [
          {
            time: '11:30',
          },
          {
            time: '11:35',
          },
          {
            time: '11:40',
          },
          {
            time: '11:45',
          },
        ],
      },
    ];

    this.maxAvailLength = Object.values(this.slots)
      .map((a) => a.availabilities.length)
      .reduce((a, b) => Math.max(a, b));
    console.log(this.maxAvailLength);
    console.log(this.slots);
    console.log(this.slots[0].availabilities.length);
  }
}
