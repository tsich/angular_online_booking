import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  // inhereted variables from app-component
  // @Input() slots: any[] | undefined;
  // @Input() selectedSlots: any[] | undefined;
  // @Input() maxAvailLength!: number;
  slots: any;
  maxAvailLength: any;

  selectedValue = 'All';

  constructor(private _sharedService: SharedService) {
    // Set shared values from service to component's variables
    this._sharedService.sharedParam.subscribe((event) => (this.slots = event));
    console.log(this.slots);
    this._sharedService.sharedMaxLen.subscribe(
      (event) => (this.maxAvailLength = event)
    );
  }

  onClick() {
    this._sharedService.emitChange('Data from child');
  }

  @Output() onSelected = new EventEmitter<any>();
  @Output() onCheck = new EventEmitter<any>();

  ngOnInit() {}

  // In this function fire onSelected & onCheck functions from app-component
  onSelectedDateTime(day: string, time: string) {
    var dateTime = day + ' ' + time;
    console.log(dateTime);
    this._sharedService.emitSetDateTime({day, time});
  }
}
