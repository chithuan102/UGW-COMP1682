import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AntdSharedModule } from 'src/app/shared/antd-shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';
import { DashBoardComponent } from './dash-board.component';
import { ChartsModule } from 'ng2-charts';


const routes: Routes = [
    {
        path: '',
        component: DashBoardComponent
    },
];

const COMPONENTS = [
    DashBoardComponent

]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AntdSharedModule,
        CoreModule,
        ChartsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [...COMPONENTS],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashBoardModule { }
