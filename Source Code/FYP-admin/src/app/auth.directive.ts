import { Directive, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[hasPermission]' })
export class AdminAuthDirective implements OnInit {

    @Input() hasPermission: any;
    constructor(
        private templateRef: TemplateRef<any>,
        private userService: UserService,
        private viewContainer: ViewContainerRef
    ) { }
    user;

    ngOnInit() {
        this.viewContainer.clear();
        this.userService.user.subscribe(
            (user) => {
                if (!this.user) {
                    this.user = user;
                }
                if (this.user) {
                    if (this.user.role.title === 'ADMIN') {
                        this.viewContainer.createEmbeddedView(this.templateRef);
                    } else if (this.userService.listPermission.includes(this.hasPermission)) {
                        this.viewContainer.createEmbeddedView(this.templateRef);
                    } else {
                        this.viewContainer.clear();
                    }
                }
            }
        );

    }
}
