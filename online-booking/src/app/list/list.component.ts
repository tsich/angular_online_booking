import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../_services/shared-service.service';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  slots: any;
  maxAvailLength: any;

  selectedValue = 'All';

  constructor(
    private _sharedService: SharedService,
    private authenticationService: AuthenticationService
  ) {
    // Set shared values from service to component's variables
    this._sharedService.sharedParam.subscribe((event) => (this.slots = event));
    this._sharedService.sharedMaxLen.subscribe(
      (event) => (this.maxAvailLength = event)
    );
    this._sharedService.emitOnLoggedIn(this.authenticationService.isLoggedIn());
  }

  onClick() {
    this._sharedService.emitChange('Data from child');
  }

  @Output() onSelected = new EventEmitter<any>();
  @Output() onCheck = new EventEmitter<any>();
  @Output() onLoggedIn = new EventEmitter<any>();

  ngOnInit() {}

  // In this function fire onSelected & onCheck functions from app-component
  onSelectedDateTime(day: string, time: string) {
    var dateTime = day + ' ' + time;
    console.log(dateTime);
    this._sharedService.emitSetDateTime({ day, time });
  }
}
