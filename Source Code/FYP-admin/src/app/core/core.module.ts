import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminAuthDirective } from '../auth.directive';
import { BoxContentComponent } from './box-content/box-content.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';


const COMPONENTS = [
    BoxContentComponent,
    ToggleSwitchComponent,
    AdminAuthDirective
]

@NgModule({
    imports: [],
    exports: [COMPONENTS],
    declarations: [COMPONENTS],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
