import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Juegos',
    loadComponent: () =>
      import('./games.component').then((m) => m.GamesComponent),
  },
  {
    path: 'hangman',
    title: 'El Ahorcado',
    loadComponent: () =>
      import('./hangman/hangman.component').then((m) => m.HangmanComponent),
  },
  {
    path: 'higher-or-lower',
    title: 'Mayor o Menor',
    loadComponent: () =>
      import('./higher-or-lower/higher-or-lower.component').then(
        (m) => m.HigherOrLowerComponent
      ),
  },
  {
    path: 'trivia-quiz',
    title: 'Preguntados',
    loadComponent: () =>
      import('./trivia-quiz/trivia-quiz.component').then(
        (m) => m.TriviaQuizComponent
      ),
  },
  {
    path: 'arithmetic',
    title: 'Aritmetica',
    loadComponent: () =>
      import('./arithmetic/arithmetic.component').then(
        (m) => m.ArithmeticComponent
      ),
  },
];
