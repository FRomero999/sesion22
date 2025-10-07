import { Routes } from '@angular/router';
import { MainPage } from './main-page/main-page';
import { AppContacto } from './contacto/contacto';

export const routes: Routes = [
    { path : "", component: MainPage },
    { path : "contacto", component: AppContacto },

];
