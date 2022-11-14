import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HrComponent } from './Modules/hr/hr.component';
import { HeaderComponent } from './Pages/CommonPages/header/header.component';
import { SidebarComponent } from './Pages/CommonPages/sidebar/sidebar.component';
import { FooterComponent } from './Pages/CommonPages/footer/footer.component';
import { LoaderComponent } from './Pages/CommonPages/loader/loader.component';
import { LoginComponent } from './Pages/login/login.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { SharedModule } from './Modules/shared/shared.module';
import { InterceptorService } from './interceptor';





@NgModule({
  declarations: [
    AppComponent,
    // HrComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoaderComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    NgxPaginationModule,
    HttpClientModule,


  ],
  providers: [DatePipe ,
    {

      provide: HTTP_INTERCEPTORS,
  
      useClass: InterceptorService,
  
      multi: true
  
     },],
  bootstrap: [AppComponent]
})
export class AppModule { }
