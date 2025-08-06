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
  },
  {
    path: 'practice/:optionId',
    loadComponent: () => import('./practice/practice.page').then( m => m.PracticePage)
  },
  {
    path: 'practice-detail/:optionId',
    loadComponent: () => import('./practice-detail/practice-detail.page').then( m => m.PracticeDetailPage)
  },
  {
    path: 'config',
    loadComponent: () => import('./config/config.page').then( m => m.ConfigPage)
  },
  {
    path: 'config-topics',
    loadComponent: () => import('./config-topics/config-topics.page').then( m => m.ConfigTopicsPage)
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

