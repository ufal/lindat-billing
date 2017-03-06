import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { AppComponent }   from './app.component';
import { UserDataComponent } from './components/users/user-data.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, MyDateRangePickerModule ],
  declarations: [ AppComponent, UserDataComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
