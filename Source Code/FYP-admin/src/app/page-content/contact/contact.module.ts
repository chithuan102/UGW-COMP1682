import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AntdSharedModule } from 'src/app/shared/antd-shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ContactComponent } from './contact.component';


const routes: Routes = [
    {
        path: '',
        component: ContactComponent
    },


];

const COMPONENTS = [
    ContactComponent
];
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
export class ContactModule { }
