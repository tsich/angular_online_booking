import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private paramSlots = new BehaviorSubject(null);
  private paramSpecialSource = new BehaviorSubject(null);
  private maxLenSource = new BehaviorSubject(null);

  sharedParamSlots = this.paramSlots.asObservable();
  sharedSpecialParam = this.paramSpecialSource.asObservable();
  sharedMaxLen = this.maxLenSource.asObservable();

  // Observable string sources for selected dateTime
  private emitChangeDateTime = new Subject<any>();
  // Observable string streams
  emitChangeDT$ = this.emitChangeDateTime.asObservable();

  // Observable array sources for selected slots
  private emitOnSelectedSlots = new BehaviorSubject([]);
  // Observable array streams
  selectedSlots$ = this.emitOnSelectedSlots.asObservable();

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
    if (param.length > 0) this.paramSlots.next(param);
    // else pass null
    else this.paramSlots.next(null);
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

  // When a dateTime of a speciality is selected
  emitSetDateTime(selection: any) {
    console.log('Shared service: emitSetDateTime');
    this.emitChangeDateTime.next(selection);
  }

  // Set the user appointments selections
  setSelectedSlots(selections: any) {
    localStorage.setItem('selectedSlots', JSON.stringify(selections));
    console.log(localStorage);
    this.emitOnSelectedSlots.next(selections);
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
