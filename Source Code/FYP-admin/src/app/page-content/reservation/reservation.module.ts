import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReservationComponent } from './reservation.component';
import { AntdSharedModule } from 'src/app/shared/antd-shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReservationDetailComponent } from './containers/reservation-detail/reservation-detail.component';
import { CoreModule } from 'src/app/core/core.module';
import { ReservationTableComponent } from './containers/reservation-table/reservation-table.component';
import { BillingComponent } from './containers/billing/billing.component';


const routes: Routes = [
    {
        path: '',
        component: ReservationComponent
    },
    {
        path: ':id',
        component: ReservationDetailComponent,
        data: {
            breadcrumb: 'Display Name'
          }
    },
    {
        path: 'billing/:id',
        component: BillingComponent,
        data: {
            breadcrumb: 'Display Name'
          }
    }
];

const COMPONENTS = [
    ReservationComponent,
    ReservationDetailComponent

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
    declarations: [...COMPONENTS, ReservationTableComponent, BillingComponent],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservationModule { }
