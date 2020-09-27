import { Injectable } from '@angular/core';

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
  
}
