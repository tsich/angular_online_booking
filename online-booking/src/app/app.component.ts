import { Component, OnInit } from '@angular/core';
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
  dataUser: any = this.data != null ? JSON.parse(this.data) : [];
  user: string =
    Object.keys(this.dataUser).length > 0 ? this.dataUser.username : '';
  slots: any[] = [];
  specialities: any;
  selectedSlots: any[] = [];
  title = 'doconapp';
  loggedIn: boolean = localStorage.getItem('token') != null;
  authFailed: boolean | undefined;

  selectedDateTime: any;

  public weather: Observable<any> = this.weatherClient.getWeatherData();

  constructor(
    private _sharedService: SharedService,
    public router: Router,
    private authenticationService: AuthenticationService,
    private weatherClient: WeatherClient
  ) {
    _sharedService.isUserLoggedIn.subscribe((loggedIn) => {
      // If user is logged in and specialities are fetched from json db
      if (loggedIn && this.authenticationService.getSpecialities()) {
        // Set the specialities from shared service
        _sharedService.sharedParamSlots.subscribe((data) => {
          if (data) {
            // if data exist (!null !false !empty)
            this.slots = data;
            console.log('this.slots app component');
            console.log(this.slots);
          }
        });

        this.data = localStorage.getItem('data');
        this.dataUser = this.data != null ? JSON.parse(this.data) : [];
        console.log(this.dataUser);
        this.user =
          Object.keys(this.dataUser).length > 0 ? this.dataUser.username : '';

        // Get selected dateTime from service
        _sharedService.emitChangeDT$.subscribe((dateTime) => {
          this.selectedDateTime = dateTime;
          this.filterSelectedDateTime(this.selectedDateTime);
        });
      }
    });
    console.log('loggedIn: ' + this.loggedIn);
    _sharedService.authFailed.subscribe((bool) => (this.authFailed = bool));
    console.log('authFailed: ' + this.authFailed);
  }

  // Filter datetime selections
  filterSelectedDateTime(selection: any): any {
    this.selectedSlots.filter(
      (e) => e.day === selection.day && e.time == selection.time
    ).length > 0
      ? console.log('This item already exists')
      : this.selectedSlots.push(selection);
    this._sharedService.setSelectedSlots(this.selectedSlots);
    this._sharedService.selectedSlots$.subscribe((selection) => {
      console.log('Selected slots: ');
      console.log(selection);
    });
  }

  // Remove datetime from selection list
  removeDateTime(el: any): any {
    this.selectedSlots.splice(
      this.selectedSlots.findIndex(
        (e) => e.day === el.day && e.time === el.time
      ),
      1
    );
    this._sharedService.setSelectedSlots(this.selectedSlots);
    // console.log(this.selectedSlots);
    // console.log(this.selectedSlots.findIndex((e) => e.day == el.day));

    //We go as deep in an this.slots and filter elements at any level (now filtering availabilities)
    this.slots.map((element) => {
      console.log(element.availabilities);
      return element.entityId == el.specialityID && element.day == el.day
        ? {
            ...element,
            availabilities:
              element.availabilities.filter((e: any) => e.time == el.time)
                .length > 0
                ? {}
                : element.availabilities.push({ time: el.time }),
          }
        : { ...element };
    });

    //  Sort this.slots based on element.availabilities.time hh:mm ASC order
    this.slots.map((element) =>
      element.availabilities.sort((a: any, b: any) => {
        return a.time?.localeCompare(b.time);
      })
    );
    this._sharedService.slotsParam(this.slots);
  }

  ngOnInit(): void {}

  // Logout Function
  logout(): void {
    this.authenticationService.logout();
    this.loggedIn = false;
  }
}
