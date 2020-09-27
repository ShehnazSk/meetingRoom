import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { MeetingsViewComponent } from './pages/meetings-view/meetings-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    MeetingsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
