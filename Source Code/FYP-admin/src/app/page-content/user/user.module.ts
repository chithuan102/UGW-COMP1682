import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AntdSharedModule } from 'src/app/shared/antd-shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { UserComponent } from './user.component';
import { UserInfoComponent } from './user-info/user-info.component';


const routes: Routes = [
    {
        path: '',
        component: UserComponent
    },
    {
        path: 'info',
        component: UserInfoComponent
    },

];

const COMPONENTS = [
    UserComponent,
    UserInfoComponent

]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AntdSharedModule,
        CoreModule,
        RouterModule.forChild(routes)
    ],
    declarations: [...COMPONENTS],
    exports: [],
})
export class UserModule { }
