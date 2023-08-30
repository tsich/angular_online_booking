import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../_services/shared-service.service';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  slots: any[] = [];
  specialities: any[] = [];
  maxAvailLength!: number;
  selectedValue = '';
  selectedSpeciality = '';
  selectedSpecialityID = '';

  constructor(
    private _sharedService: SharedService,
    private authenticationService: AuthenticationService
  ) {
    this._sharedService.sharedSpecialParam.subscribe((data) => {
      // if data exist (!null !false !empty)
      if (data) {
        this.specialities = data;
      }
    });

    // Get shared values from service to component's variables
    this._sharedService.sharedParamSlots.subscribe((data) => {
      if (data) {
        // if data exist (!null !false !empty)
        this.slots = data;
        this.maxAvailLength = Object.values(this.slots)
          .map((a) => a.availabilities.length)
          .reduce((a, b) => Math.max(a, b));
      } else {
        this.slots = [];
      }
      console.log(this.slots);
    });
    // Shared parameter "maxAvailLength"
    this._sharedService.changeMaxLengthParam(this.maxAvailLength);

    // Set login status
    this._sharedService.emitOnLoggedIn(this.authenticationService.isLoggedIn());
  }

  @Output() onSelected = new EventEmitter<any>();
  @Output() onCheck = new EventEmitter<any>();
  @Output() onLoggedIn = new EventEmitter<any>();

  ngOnInit() {}

  // In this function fire onSelected & onCheck functions from app-component
  onSelectDateTime(
    day: string,
    time: string,
    speciality: string,
    specialityID: string
  ) {
    // var dateTime = day + ' ' + time;
    // console.log(dateTime);
    this._sharedService.emitSetDateTime({ day, time, speciality, specialityID });

    //We go as deep in an this.slots and filter elements at any level (now filtering availabilities)
    const filtered = this.slots.map((element) => {
      if (element.entityId == specialityID && element.day == day)
        return {
          ...element,
          availabilities: element.availabilities.filter(
            (e: any) => e.time !== time
          ),
        };
      else return { ...element };
    });

    this._sharedService.slotsParam(filtered);

    // console.log(filtered);
  }

  onSelectSpeciality(e: any) {
    console.log('selected speciality entityId: ' + e.target.value);
    this.selectedValue = e.target.value;
    this.selectedSpeciality =
      e.target.options[e.target.selectedIndex].innerHTML;
    this.selectedSpecialityID = e.target.value;
    this.authenticationService.getSlots(e.target.value);
  }
}
