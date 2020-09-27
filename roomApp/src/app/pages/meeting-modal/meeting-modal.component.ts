import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/shared/services/global.service';

export interface DialogData {
  meeting_details: {}
}

@Component({
  selector: 'app-meeting-modal',
  templateUrl: './meeting-modal.component.html',
  styleUrls: ['./meeting-modal.component.scss']
})
export class MeetingModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MeetingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private globalStore: GlobalService) { }

  meeting_times: any
  timing_dropdown = []
  
  ngOnInit(): void {
  }
  
  onBtnClick(val: boolean): void {
    this.dialogRef.close(val);
    this.meeting_times = Object.assign({}, this.globalStore.meeting_timings)
  }
  generateTimes(time = 0) {
    let starting_point = this.meeting_times.start_hour;
    let ampm = this.meeting_times.start_with
    for (let i = 0; i < this.meeting_times.total_hours; i++) {
      if (starting_point == 12) {
        ampm = 'PM'
        this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':00 ' + ampm)
        if (time == 3) { // time is either 3 (15, 30, 45) || 2 (30)
          this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':15 ' + ampm)
          this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':30 ' + ampm)
          this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':45 ' + ampm)
        }
        else if (time == 2) {
          this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':30 ' + ampm)
        }
        starting_point = 1
      }
      else {
        this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':00 ' + ampm)
        if (time == 3) { // time is either 3 (15, 30, 45) || 2 (30)
          this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':15 ' + ampm)
          this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':30 ' + ampm)
          this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':45 ' + ampm)
        }
        else if (time == 2) {
          this.timing_dropdown.push((starting_point > 9 ? starting_point : "0" + starting_point) + ':30 ' + ampm)
        }

        starting_point += 1;
      }

    }
  }

}
