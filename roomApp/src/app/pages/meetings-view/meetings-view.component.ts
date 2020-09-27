import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import * as _moment from 'moment';
import { MeetingModalComponent } from '../meeting-modal/meeting-modal.component';


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
    start_with: "AM",
    min_time: 30,
  }
  
  meeting_hours = []
  
  constructor(private dialog: MatDialog) { }
  
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
  }
  
  top_ = "0"
  createMeet(e, meet) {
    console.log(e, meet);
    let top = Number(((e.layerY / 60).toFixed(1) + "").split(".")[1]) * 5;
    let time = 0;
    if (top >= 15 && top < 30) {
      time = 15;
    }
    else if (top >= 30 && top < 45) {
      time = 30;
    }
    else {
      time = 45;
    }
    
    this.top_ = e.layerY.toFixed(0) + "." + time/5
    
    console.log(this.top_, time);
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      heading: 'Confirm',
      text: 'Are you sure you want to extract with this template?',
    };

    const dialogRef = this.dialog.open(MeetingModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}
