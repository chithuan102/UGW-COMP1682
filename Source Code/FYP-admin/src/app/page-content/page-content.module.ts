import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageContentComponent } from './page-content.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AntdSharedModule } from '../shared/antd-shared.module';
import { CoreModule } from '../core/core.module';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { ChartsModule } from 'ng2-charts';
import { RoomServiceComponent } from './room-service/room-service.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
    {
        path: '',
        component: PageContentComponent,
        children: [
            {
                path: '',
                redirectTo: 'dash-board'
            },
            {
                path: 'dash-board',
                component: DashBoardComponent,
                loadChildren: () => import('./dash-board/dash-board.module').then(m => m.DashBoardModule)
            },
            {
                path: 'reservation',
                loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule)
            },
            {
                path: 'room',
                loadChildren: () => import('./room/room.module').then(m => m.RoomModule)
            },
            // {
            //     path: 'room-availibity',
            //     component: RoomAvailibityComponent
            // },
            {
                path: 'report',
                loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
            },
            {
                path: 'transaction-code',
                loadChildren: () => import('./transaction-code/transaction-code.module').then(m => m.TransactionCodeModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: 'user',
                loadChildren: () => import('./user/user.module').then(m => m.UserModule)
            },
            {
                path: 'role',
                loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
            },
            {
                path: 'room-type',
                loadChildren: () => import('./room-type/room-type.module').then(m => m.RoomTypeModule)
            },
            {
                path: 'room-service',
                loadChildren: () => import('./room-service/room-service.module').then(m => m.RoomServiceModule)
            },
            {
                path: 'contact',
                loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
            }
        ]
    },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CoreModule,
        AntdSharedModule,
    ],
    exports: [],
    declarations: [
        PageContentComponent,
        HeaderComponent,
        SidebarComponent,
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageContentModule { }
