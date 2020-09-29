import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string
  constructor(private router: Router, private globalStore: GlobalService) { }

  ngOnInit(): void {
  }
  
  login() {
    if (this.username) {
      localStorage.setItem('user_name', this.username)
      if (!localStorage.getItem('availableMeetings')) {
        this.globalStore.setInitailAvailableMeetings({})
      }
      else {
        this.globalStore.setInitailAvailableMeetings(JSON.parse(localStorage.getItem('availableMeetings')))
      }
      this.router.navigate(['/home']);
    }
  }

}
