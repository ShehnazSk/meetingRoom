import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/shared/services/global.service';

export interface DialogData {
  heading: any;
  message: any;
}
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private globalStore: GlobalService) { }
  heading: string;
  message: string;

  ngOnInit(): void {
    this.heading = this.data.heading
    this.message = this.data.message
  }
  
  onBtnClick(val: boolean): void {
    this.dialogRef.close(val);
  }

}
