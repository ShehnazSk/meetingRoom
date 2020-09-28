import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService, MY_FORMATS } from 'src/app/shared/services/global.service';

import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { AlertComponent } from '../alert/alert.component';

export interface DialogData {
  time: any;
  top: any;
  date: any;
  ampm: any;
  hour: any;
}

@Component({
  selector: 'app-meeting-modal',
  templateUrl: './meeting-modal.component.html',
  styleUrls: ['./meeting-modal.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class MeetingModalComponent implements OnInit {

  constructor(private dialog: MatDialog,
    public dialogRef: MatDialogRef<MeetingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private globalStore: GlobalService) { }

  meeting_times: any
  timing_dropdown = [];
  
  meeting_details: any = {}
  
  ngOnInit(): void {
    let end_time = this.data.time + 30
    let end_hour = this.data.hour;
    let end_timer = ""
    let start_time = this.data.time;
    if (start_time == 45) {
      end_hour += 1
      let ampm = 'AM'
      if (end_hour == 12) {
        ampm = 'PM'
      }
      else if (end_hour == 13) {
        end_hour = "01"
        ampm = 'PM'
      }
      else {
        end_hour = end_hour > 9 ? end_hour : "0" + end_hour
        ampm = this.data.ampm
      }
      end_timer = end_hour + ":15 " + ampm
    }
    else if (end_time == 60) {
      end_hour += 1
      let ampm = 'AM'
      if (end_hour == 12) {
        ampm = 'PM'
      }
      else if (end_hour == 13) {
        end_hour = "01"
        ampm = 'PM'
      }
      else {
        end_hour = end_hour > 9 ? end_hour : "0" + end_hour
        ampm = this.data.ampm
      }
      end_timer = end_hour + ":00 " + ampm
    }
    else {
      let ampm = 'AM'
      if (end_hour == 12) {
        ampm = 'PM'
      }
      else if (end_hour == 13) {
        end_hour = "01"
        ampm = 'PM'
      }
      else {
        end_hour = end_hour > 9 ? end_hour : "0" + end_hour
        ampm = this.data.ampm
      }
      end_timer = end_hour + ":" + end_time + " " + ampm
    }
    
    this.meeting_details = {
      user_name: localStorage.getItem('user_name'),
      meeting_name: "",
      date: moment(this.data.date),
      start_time: (this.data.hour > 9 ? this.data.hour : "0" + this.data.hour) + ":" + this.data.time + " " + this.data.ampm,
      end_time: end_timer,
      agenda: "",
    }
    this.meeting_times = Object.assign({}, this.globalStore.meeting_timings)
    this.generateTimes(3)
  }
  
  onBtnClick(val: boolean): void {
    if (val) {
      if (this.checkMeetAvailable(this.meeting_details)) {
        this.dialogRef.close({ flag: val, data: this.meeting_details});
      }
      else {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '300px';
        dialogConfig.data = {
          heading: "Alert",
          message: "Meeting Overlapping. Please check."
        };

        this.dialog.open(AlertComponent, dialogConfig);
      }
    }
    else {
      this.dialogRef.close({ flag: val });
    }
  }
  generateTimes(time = 0) {
    let starting_point = this.meeting_times.start_hour;
    let ampm = this.meeting_times.start_with
    for (let i = 0; i < this.meeting_times.total_hours; i++) {
      if (starting_point == 12) {
        ampm = 'PM'
        this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':00 ' + ampm)
        if (i != this.meeting_times.total_hours - 1) {
          if (time == 3) { // time is either 3 (15, 30, 45) || 2 (30)
            this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':15 ' + ampm)
            this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':30 ' + ampm)
            this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':45 ' + ampm)
          }
          else if (time == 2) {
            this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':30 ' + ampm)
          }
        }
        starting_point = 1
      }
      else {
        this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':00 ' + ampm)
        if (i != this.meeting_times.total_hours - 1) {
          if (time == 3) { // time is either 3 (15, 30, 45) || 2 (30)
            this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':15 ' + ampm)
            this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':30 ' + ampm)
            this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':45 ' + ampm)
          }
          else if (time == 2) {
            this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':30 ' + ampm)
          }
        }
        starting_point += 1;
      }

    }
  }
  
  checkMeetAvailable(val) {
    let checkDate = this.globalStore.convertDate(val.date)
    let available_meetings = this.globalStore.getAvailableMeetings()[checkDate]
    if (available_meetings.length > 0) {
      for (let i = 0; i < available_meetings.length; i++) {
        let meet = available_meetings[i];
        let indexPresentMeetStart = this.timing_dropdown.indexOf(val.start_time);
        let indexPresentMeetEnd = this.timing_dropdown.indexOf(val.end_time);
        let indexMeetStart = this.timing_dropdown.indexOf(meet.start_time);
        let indexMeetENd = this.timing_dropdown.indexOf(meet.end_time);
        console.log("indexPresentMeetStart : ", indexPresentMeetStart);
        console.log("indexPresentMeetEnd : ", indexPresentMeetEnd);
        console.log("indexMeetStart : ", indexMeetStart);
        console.log("indexMeetENd : ", indexMeetENd);
        
        if (indexPresentMeetStart >= indexMeetStart && indexPresentMeetStart < indexMeetENd) {
          return false
        }
        else if (indexPresentMeetEnd > indexMeetStart && indexPresentMeetEnd <= indexMeetENd) {
          return false
        }
        else if (indexMeetStart <= indexPresentMeetStart && indexMeetENd <= indexPresentMeetEnd) {
          return false
        }
        else {
          return true
        }
        
      }
    }
    else {
      return true
    }
  }
  
  checkDisabled() {
    if (this.meeting_details.meeting_name) {
      return false
    }
    return true
  }

}
