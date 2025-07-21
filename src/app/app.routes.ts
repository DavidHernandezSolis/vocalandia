import { Routes } from '@angular/router';

export const routes: Routes  = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'ddventure',
    loadComponent: () => import('./ddventure/ddventure.page').then( m => m.DdventurePage)
  },
  {
    path: 'adventure/:optionId',
    loadComponent: () => import('./adventure/adventure.page').then( m => m.AdventurePage)
  }
  // Agregar aquí tus otras rutas
];

// export const routes: Routes = [
//   {
//     path: 'home',
//     loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
//   },
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full',
//   },
//   {
//     path: 'welcome',
//     loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
//   },
// ];

