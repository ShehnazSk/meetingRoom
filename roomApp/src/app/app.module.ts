import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { MeetingsViewComponent } from './pages/meetings-view/meetings-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MeetingModalComponent } from './pages/meeting-modal/meeting-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    MeetingsViewComponent,
    MeetingModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    MeetingModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
