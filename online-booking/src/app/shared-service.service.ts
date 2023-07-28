import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private paramSource = new BehaviorSubject(null);
  private maxLenSource = new BehaviorSubject(null);
  sharedParam = this.paramSource.asObservable();
  sharedMaxLen = this.maxLenSource.asObservable();

  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();

  // Observable string sources for selected dateTime
  private emitChangeDateTime = new Subject<any>();
  // Observable string streams
  emitChangeDT$ = this.emitChangeDateTime.asObservable();

  constructor() {}

  // Set the shared slots parameter
  changeParam(param: any) {
    this.paramSource.next(param);
  }
  // Set the shared slots array maxLength parameter
  changeMaxLengthParam(param: any) {
    this.maxLenSource.next(param);
  }

  // Service message commands
  emitChange(change: any) {
    console.log('lalala0');
    this.emitChangeSource.next(change);
  }

  emitSetDateTime(dateTime: any) {
    console.log('lalala1');
    this.emitChangeDateTime.next(dateTime);
  }
}
