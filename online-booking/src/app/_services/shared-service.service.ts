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

  // BehaviorSubject boolean for login state
  public isUserLoggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  // BehaviorSubject boolean for auth fail
  public authFailed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  // Set the shared slots parameter
  slotsParam(param: any) {
    console.log('changed slots')
    console.log(param)
    this.paramSource.next(param);
  }
  // Set the shared slots array maxLength parameter
  changeMaxLengthParam(param: any) {
    this.maxLenSource.next(param);
  }

  // Service message commands
  emitChange(change: any) {
    console.log('Shared service: emitChange');
    this.emitChangeSource.next(change);
  }

  emitSetDateTime(dateTime: any) {
    console.log('Shared service: emitSetDateTime');
    this.emitChangeDateTime.next(dateTime);
  }

  emitOnLoggedIn(logged: boolean) {
    console.log('Shared service->logged: ' + logged);
    this.isUserLoggedIn.next(logged);
  }

  emitOnFailedLogIn(state: boolean) {
    console.log('Shared service->emitOnFailedLogIn: ' + state);
    this.authFailed.next(state);
  }
}
