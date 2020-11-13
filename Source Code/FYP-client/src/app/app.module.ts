import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AntdSharedModule } from './shared/antd-shared.module';
import { ProfileComponent } from './profile/profile.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
// Import your library
import { OwlModule } from 'ngx-owl-carousel';
registerLocaleData(en);

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'booking',
        component: BookingFormComponent,
      },
      {
        path: 'rooms',
        component: RoomsComponent,
      },
      {
        path: 'room-detail/:id',
        component: RoomDetailComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'booking',
        component: BookingFormComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  }

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BookingFormComponent,
    LoginComponent,
    PageLayoutComponent,
    RoomsComponent,
    RoomDetailComponent,
    ContactComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntdSharedModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    ToastrModule.forRoot(),
    OwlModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
