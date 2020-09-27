import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  
  onBtnClick(val: boolean): void {
    this.dialogRef.close(val);
  }

}
