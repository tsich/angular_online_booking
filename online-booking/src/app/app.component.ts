import { Component, OnInit } from '@angular/core';
import mydata from '../assets/json/mydata.json';
import { SharedService } from './_services/shared-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { WeatherClient } from './clients/weather.client';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data: any = localStorage.getItem('data');
  dataUser: any[] = this.data != null ? JSON.parse(this.data) : [];
  user: string = this.dataUser.length > 0 ? this.dataUser[0].username : '';
  slots: any[] = [];
  selectedSlots: any[] = [];
  title = 'online-booking';
  loggedIn: boolean = false;
  authFailed: boolean | undefined;

  selectedDateTime: any;
  maxAvailLength!: number;

  public weather: Observable<any> = this.weatherClient.getWeatherData();

  constructor(
    private _sharedService: SharedService,
    public router: Router,
    private authenticationService: AuthenticationService,
    private weatherClient: WeatherClient
  ) {
    _sharedService.isUserLoggedIn.subscribe((val) => {
      this.loggedIn = val;
      // console.log('emit ' + this.loggedIn);
      if (this.loggedIn) {
        this.data = localStorage.getItem('data');
        this.dataUser = this.data != null ? JSON.parse(this.data) : [];
        this.user = this.dataUser.length > 0 ? this.dataUser[0].username : '';

        // Shared service emmits
        _sharedService.changeEmitted$.subscribe((text) => {
          console.log(text);
        });

        // Get selected dateTime from service
        _sharedService.emitChangeDT$.subscribe((dateTime) => {
          this.selectedDateTime = dateTime;
          this.filterSelectedDateTime(this.selectedDateTime);
        });

        // Variables' Initialization
        this.selectedSlots = [];

        this.slots = mydata;

        // Shared parameter "slots"
        _sharedService.changeParam(this.slots);

        // Calculate max length of slots array
        this.maxAvailLength = Object.values(this.slots)
          .map((a) => a.availabilities.length)
          .reduce((a, b) => Math.max(a, b));
        // Shared parameter "maxAvailLength"
        _sharedService.changeMaxLengthParam(this.maxAvailLength);
      }
    });
    _sharedService.authFailed.subscribe((bool) => (this.authFailed = bool));
  }

  // Filter datetime selections
  filterSelectedDateTime(selection: any): any {
    this.selectedSlots.filter(
      (e) => e.day === selection.day && e.time == selection.time
    ).length > 0
      ? console.log('This item already exists')
      : this.selectedSlots.push(selection);
  }

  // Remove datetime from selection list
  removeDateTime(el: any): any {
    this.selectedSlots.splice(
      this.selectedSlots.findIndex(
        (e) => e.day === el.day && e.time === el.time
      ),
      1
    );
    console.log(this.selectedSlots);
    console.log(this.selectedSlots.findIndex((e) => e.day == el.day));
  }

  ngOnInit(): void {}

  // Logout Function
  logout(): void {
    this.authenticationService.logout();
    this.loggedIn = false;
  }
}
