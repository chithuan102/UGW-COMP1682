import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AntdSharedModule } from 'src/app/shared/antd-shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';


const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
    },
    {
        path: ':id',
        component: ProfileDetailComponent
    },
    {
        path: 'create',
        component: ProfileDetailComponent
    },

];

const COMPONENTS = [
    ProfileComponent,
    ProfileDetailComponent

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
export class ProfileModule { }
