import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import * as moment from 'moment';
import { GlobalService, MY_FORMATS } from 'src/app/shared/services/global.service';
import { MeetingModalComponent } from '../meeting-modal/meeting-modal.component';


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
  availableMeetings = {}
  selectedDate = new FormControl(moment());
  meeting_times: any
  
  meeting_hours = []
  
  constructor(private dialog: MatDialog, private globalStore: GlobalService) {
    this.globalStore.roomChanged.subscribe(val => {
      console.log(val);
      this.ngOnInit()
    })
  }
  
  ngOnInit(): void {
    this.availableMeetings = this.globalStore.getAvailableMeetings()
    this.meeting_times = Object.assign({} ,this.globalStore.meeting_timings)
    this.selectedDate.setValue(moment());
    this.generateTimes()
  }
  
  getMeetings() {
    let meetings = this.availableMeetings[this.globalStore.convertDate(this.selectedDate.value)]
    return meetings || []
  }
  
  getHeight(mt) {
    let top = this.getTop(mt)
    let time = mt.end_time.split(" ")[0].split(":")
    let ampm = mt.end_time.split(" ")[1]
    let adjust_bottom = Number(time[0]) - this.meeting_times.start_hour
    let bottom = 0
    if (ampm == 'AM' || Number(time[0]) == 12) {
      bottom = (adjust_bottom * 60) + Number(time[1])
    }
    else {
      bottom = ((12 + adjust_bottom) * 60) + Number(time[1])
    }
    return bottom - top;
  }
  
  getTop(mt) {
    let time = mt.start_time.split(" ")[0].split(":")
    let ampm = mt.start_time.split(" ")[1]
    let adjust_top = Number(time[0]) - this.meeting_times.start_hour
    if (ampm == 'AM' || Number(time[0]) == 12) {
      return (adjust_top * 60) + Number(time[1])
    }
    else {
      return ((12 + adjust_top) * 60) + Number(time[1])
    }
  }
  
  generateTimes() {
    let starting_point = this.meeting_times.start_hour;
    let ampm = this.meeting_times.start_with
    for (let i = 0; i < this.meeting_times.total_hours; i++) {
      if (starting_point == 12) {
        ampm = 'PM'
        this.meeting_hours.push({hour: starting_point, ampm: ampm})
        starting_point = 1
      }
      else {
        this.meeting_hours.push({hour: starting_point, ampm: ampm})
        starting_point += 1;
      }
    }
  }
  
  top_ = 0
  createMeet(e, meet) {
    let actual_top = e.layerY
    let top_blocks = Number((actual_top / 60).toString().split('.')[0]) * 60
    
    let top = Number(((actual_top / 60).toFixed(1) + "").split(".")[1]) * 5;
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
    
    this.top_ = top_blocks + time
    meet.time = time
    meet.top = top_blocks + time
    meet.date = this.globalStore.convertDate(this.selectedDate.value)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = meet;

    const dialogRef = this.dialog.open(MeetingModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result.flag) {
        let details_created = result.data;
        let createdDateFor = this.globalStore.convertDate(details_created.date)
        this.availableMeetings = this.globalStore.getAvailableMeetings()
        this.availableMeetings[createdDateFor] = this.availableMeetings[createdDateFor] ? this.availableMeetings[createdDateFor] : []
        this.availableMeetings[createdDateFor].push(details_created)
        this.globalStore.setAvailableMeetings(this.availableMeetings)
      }
    })
  }

  deleteMeet(i) {
    this.availableMeetings[this.globalStore.convertDate(this.selectedDate.value)].splice(i, 1)
    this.globalStore.setAvailableMeetings(this.availableMeetings)
  }
}
