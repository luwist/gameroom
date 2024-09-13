import { Component } from '@angular/core';
import { Scene } from './scene.enum';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { GameOverComponent } from './game-over/game-over.component';

@Component({
  selector: 'app-arithmetic',
  standalone: true,
  imports: [MainMenuComponent, GameplayComponent, GameOverComponent],
  templateUrl: './arithmetic.component.html',
  styleUrl: './arithmetic.component.scss',
})
export class ArithmeticComponent {
  currentScene: string = Scene.MainMenu;
  score: number = 0;

  onChangeScene(scene: string): void {
    this.currentScene = scene;
  }

  onScore(score: number): void {
    this.score = score;
  }
}
