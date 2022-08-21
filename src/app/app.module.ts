import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './modules/app-routing.module';
import { LoginComponent } from './modules/login/login.component'
import { MaterialModule } from './modules/material/material.module';
import { HomePageComponent } from  './modules/home-page/home-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   // ReportPathModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
