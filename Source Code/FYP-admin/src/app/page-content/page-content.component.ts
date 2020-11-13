import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-content',
    template: `
    <div class="fix-header">
    <div id="wrapper">
        <app-header></app-header>
        <app-sidebar></app-sidebar>
        <div id="page-wrapper">
            <div class="container-fluid">
                <div style="padding-top: 20px;">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    </div>
</div>`
})

export class PageContentComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
