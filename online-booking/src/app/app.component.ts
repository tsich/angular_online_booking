import { Component } from '@angular/core';
import mydata from '../assets/json/mydata.json';
import { SharedService } from './shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user = 'test user';
  slots: any[];
  selectedSlots: any[];
  title = 'online-booking';

  selectedDateTime: any;
  maxAvailLength: number;

  constructor(private _sharedService: SharedService) {
    _sharedService.changeEmitted$.subscribe((text) => {
      console.log(text);
    });

    // Get selected dateTime from service
    _sharedService.emitChangeDT$.subscribe((dateTime) => {
      console.log('lala2');
      this.selectedDateTime = dateTime;
      this.filterSelectedDateTime(this.selectedDateTime);
    });

    this.selectedSlots = [];

    this.slots = mydata;

    console.log(this.slots);

    // Shared parameter "slots"
    this._sharedService.changeParam(this.slots);

    // Calculate max length of slots array
    this.maxAvailLength = Object.values(this.slots)
      .map((a) => a.availabilities.length)
      .reduce((a, b) => Math.max(a, b));
    // Shared parameter "maxAvailLength"
    this._sharedService.changeMaxLengthParam(this.maxAvailLength);
  }

  filterSelectedDateTime(selection: any): any {
    console.log(selection);

    // this.selectedSlots.push({ day: day, time: time });
    this.selectedSlots.filter(
      (e) => e.day === selection.day && e.time == selection.time
    ).length > 0
      ? console.log('This item already exists')
      : this.selectedSlots.push(selection);

    console.log(this.selectedSlots);
  }

  removeDateTime(el: any): any {
    console.log(el);
    console.log(this.selectedSlots);

    // this.selectedSlots.filter(
    //   (item) => item.day !== el.day
    // );

    this.selectedSlots.splice(
      this.selectedSlots.findIndex(
        (e) => e.day === el.day && e.time === el.time
      ),
      1
    );
    console.log('after remove:');
    console.log(this.selectedSlots);
    console.log(this.selectedSlots.findIndex((e) => e.day == el.day));
  }
}
