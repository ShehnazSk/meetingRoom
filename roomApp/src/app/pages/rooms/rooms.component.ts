import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  
  availableRooms = [];
  selectedRoom: string = 'Room 1'

  constructor(private globalStore: GlobalService) { }

  ngOnInit(): void {
    this.globalStore.setRoomName(this.selectedRoom)
    this.availableRooms = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6", "Room 7", "Room 8", "Room 9", "Room 10"]
  }
  
  setRoom(val) {
    this.selectedRoom = val
    this.globalStore.setRoomName(this.selectedRoom)
  }

}
