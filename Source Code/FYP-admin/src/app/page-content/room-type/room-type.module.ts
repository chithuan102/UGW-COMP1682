import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntdSharedModule } from 'src/app/shared/antd-shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { RoomTypeComponent } from './room-type.component';
import { RoomTypeDetailComponent } from './room-type-detail/room-type-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../../../environments/environment';
const routes: Routes = [
    {
        path: '',
        component: RoomTypeComponent
    },
    {
        path: ':id',
        component: RoomTypeDetailComponent
    },
    {
        path: 'create',
        component: RoomTypeDetailComponent
    },

];

const COMPONENTS = [
    RoomTypeComponent

]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AntdSharedModule,
        CoreModule,
        NgSelectModule,
        RouterModule.forChild(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud')
    ],
    declarations: [...COMPONENTS, RoomTypeComponent, RoomTypeDetailComponent],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoomTypeModule { }
