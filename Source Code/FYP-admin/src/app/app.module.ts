import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AntdSharedModule } from './shared/antd-shared.module';
import { NotFoundComponent } from './pages-error/not-found/not-found.component';
import { NoPermissionComponent } from './pages-error/no-permission/no-permission.component';
import { UnauthorizeComponent } from './pages-error/unauthorize/unauthorize.component';
import { LoginComponent } from './login/login.component';
import { ServerErrorComponent } from './pages-error/server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { AdminAuthDirective } from './auth.directive';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NoPermissionComponent,
    UnauthorizeComponent,
    LoginComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AntdSharedModule,
    ToastrModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud')
  
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
