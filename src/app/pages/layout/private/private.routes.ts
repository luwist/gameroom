import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./private.component').then((m) => m.PrivateComponent),
    children: [
      {
        path: 'chat',
        title: 'Chat',
        loadComponent: () =>
          import('./chat/chat.component').then((m) => m.ChatComponent),
      },
      {
        path: 'games',
        title: 'Juegos',
        loadComponent: () =>
          import('./games/games.component').then((m) => m.GamesComponent),
      },
    ],
  },
];
