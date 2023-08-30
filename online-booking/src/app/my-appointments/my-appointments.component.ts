import { Component } from '@angular/core';
import { SharedService } from '../_services/shared-service.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css'],
})
export class MyAppointmentsComponent {
  storedSelections: any = localStorage.getItem('selectedSlots');
  selectedSlots: any =
    this.storedSelections != null ? JSON.parse(this.storedSelections) : [];
  constructor(private _sharedService: SharedService) {
    this._sharedService.selectedSlots$.subscribe(
      (val) => (this.selectedSlots = val)
    );
  }
}
