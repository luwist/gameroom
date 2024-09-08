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
        path: 'games',
        title: 'Juegos',
        loadComponent: () =>
          import('./games/games.component').then((m) => m.GamesComponent),
      },
      {
        path: 'chat',
        title: 'Chat',
        loadComponent: () =>
          import('./chat/chat.component').then((m) => m.ChatComponent),
      },
      {
        path: 'who-i-am',
        title: '¿Quien soy?',
        loadComponent: () =>
          import('./who-i-am/who-i-am.component').then(
            (m) => m.WhoIAmComponent
          ),
      },
    ],
  },
];
