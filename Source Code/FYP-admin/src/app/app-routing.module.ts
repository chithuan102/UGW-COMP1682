import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './pages-error/not-found/not-found.component';
import { ServerErrorComponent } from './pages-error/server-error/server-error.component';
import { AuthenGuard } from './auth.service';
import { NoPermissionComponent } from './pages-error/no-permission/no-permission.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenGuard],
    loadChildren: () => import('./page-content/page-content.module').then(m => m.PageContentModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'error',
    component: ServerErrorComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'no-permission',
    component: NoPermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
