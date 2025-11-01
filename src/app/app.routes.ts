import { Routes } from '@angular/router';
import { MainPage } from './main-page/main-page';
import { AppContacto } from './contacto/contacto';
import { Login } from './login/login';
import { Admin } from './admin/admin';
import { JuegoDetail } from './juego-detail/juego-detail';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path : "", component: MainPage },
    { path : "contacto", component: AppContacto },
    { path : "login", component: Login },
    { path : "admin", component: Admin, canActivate: [authGuard] },
    { path : "juego/:id", component: JuegoDetail },
];
