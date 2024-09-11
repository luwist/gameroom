import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        title: 'Inicio',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'who-i-am',
        title: '¿Quien soy?',
        loadComponent: () =>
          import('./who-i-am/who-i-am.component').then(
            (m) => m.WhoIAmComponent
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./private/private.routes').then((m) => m.routes),
      },
    ],
  },
];
