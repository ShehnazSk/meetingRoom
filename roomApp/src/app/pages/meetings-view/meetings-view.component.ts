import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';


const moment = _moment;

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

@Component({
  selector: 'app-meetings-view',
  templateUrl: './meetings-view.component.html',
  styleUrls: ['./meetings-view.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class MeetingsViewComponent implements OnInit {
  selectedDate = new FormControl(moment());
  meeting_times = {
    start_hour: 9,
    total_hours: 10,
    start_with: "AM"
  }
  
  meeting_hours = []
  
  constructor() { }
  ngOnInit(): void {
    this.selectedDate.setValue(moment());
    this.generateTimes()
  }
  
  generateTimes() {
    let starting_point = this.meeting_times.start_hour;
    let ampm = this.meeting_times.start_with
    for (let i = 0; i < this.meeting_times.total_hours; i++) {
      if (starting_point == 12) {
        ampm = 'PM'
        this.meeting_hours.push(starting_point + '' + ampm)
        starting_point = 1
      }
      else {
        this.meeting_hours.push(starting_point + '' + ampm)
        starting_point += 1;
      }
    }
    console.log(this.meeting_hours);
    
  }
  top_ = 0
  createMeet(e, meet) {
    console.log(e, meet);
    this.top_ = e.layerY
  }

}
