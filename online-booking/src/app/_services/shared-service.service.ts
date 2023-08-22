import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private paramSource = new BehaviorSubject(null);
  private paramSpecialSource = new BehaviorSubject(null);
  private maxLenSource = new BehaviorSubject(null);
  sharedParam = this.paramSource.asObservable();
  sharedSpecialParam = this.paramSpecialSource.asObservable();
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
    // If the slots array length > 0 pass the array to the Observable
    if (param.length > 0) this.paramSource.next(param);
    // else pass null
    else this.paramSource.next(null);
    console.log('changed slots');
  }
  // Set the shared specialities parameter
  specialitiesParam(param: any) {
    // console.log(param);
    this.paramSpecialSource.next(param);
    console.log('changed specialities');
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

  emitSetDateTime(selection: any) {
    console.log('Shared service: emitSetDateTime');
    this.emitChangeDateTime.next(selection);
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
