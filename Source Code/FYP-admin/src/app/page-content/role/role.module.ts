import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AntdSharedModule } from 'src/app/shared/antd-shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { RoleComponent } from './role.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';


const routes: Routes = [
    {
        path: '',
        component: RoleComponent
    },
    {
        path: ':id',
        component: RoleDetailComponent
    },

];

const COMPONENTS = [
    RoleComponent

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
    declarations: [...COMPONENTS, RoleDetailComponent],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoleModule { }
