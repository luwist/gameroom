import { Component } from '@angular/core';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { GameOverComponent } from './game-over/game-over.component';
import { Scene } from './Scene.enum';

@Component({
  selector: 'app-trivia-quiz',
  standalone: true,
  imports: [MainMenuComponent, GameplayComponent, GameOverComponent],
  templateUrl: './trivia-quiz.component.html',
  styleUrl: './trivia-quiz.component.scss',
})
export class TriviaQuizComponent {
  currentScene: string = Scene.MainMenu;
  hits: number = 0;

  onChangeScene(scene: string): void {
    this.currentScene = scene;
  }

  onUpdateHits(hits: number): void {
    this.hits = hits;
  }
}
