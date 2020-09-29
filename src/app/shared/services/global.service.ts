import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import moment = require('moment');

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM DD, YYYY',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Injectable({
  providedIn: 'root'
})
  
export class GlobalService {

  constructor() { }
  meeting_timings = {
    start_hour: 9,
    total_hours: 10,
    start_with: "AM",
    min_time: 30,
  }
  availableMeetings = {}
  selectedRoom: string
  roomChanged: Subject<any> = new Subject<any>();
  getAvailableMeetings() {
    if (Object.keys(this.availableMeetings).length == 0) {
      this.availableMeetings =  JSON.parse(localStorage.getItem('availableMeetings'))
    }
    return this.availableMeetings[this.selectedRoom] || {}
  }
  setRoomName(val) {
    this.selectedRoom = val
    this.roomChanged.next()
  }
  
  setAvailableMeetings(val) {
    this.availableMeetings[this.selectedRoom] = val;
    localStorage.setItem('availableMeetings', JSON.stringify(this.availableMeetings))
  }
  
  setInitailAvailableMeetings(val) {
    this.availableMeetings = val;
    localStorage.setItem('availableMeetings', JSON.stringify(this.availableMeetings))
  }
  
  convertDate(val:any) {
    return moment(val).format(MY_FORMATS.parse.dateInput)
  }
  
}
