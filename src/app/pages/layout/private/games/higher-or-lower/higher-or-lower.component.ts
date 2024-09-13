import { Component } from '@angular/core';
import { GameplayComponent } from './gameplay/gameplay.component';
import { GameOverComponent } from './game-over/game-over.component';
import { Scene } from '@app/enums';

@Component({
  selector: 'app-higher-or-lower',
  standalone: true,
  imports: [GameplayComponent, GameOverComponent],
  templateUrl: './higher-or-lower.component.html',
  styleUrl: './higher-or-lower.component.scss',
})
export class HigherOrLowerComponent {
  currentScene: string = Scene.Gameplay;

  onChangeScene(scene: string): void {
    this.currentScene = scene;
  }
}
