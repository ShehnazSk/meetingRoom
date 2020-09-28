import { Injectable } from '@angular/core';

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
  
  getAvailableMeetings() {
    if (Object.keys(this.availableMeetings).length == 0) {
      this.availableMeetings =  JSON.parse(localStorage.getItem('availableMeetings'))
    }
    return this.availableMeetings
  }
  
  setAvailableMeetings(val) {
    this.availableMeetings = val;
    localStorage.setItem('availableMeetings', JSON.stringify(val))
  }
  
}
