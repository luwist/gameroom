import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Scene } from '../scene.enum';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
})
export class GameOverComponent {
  @Output() replay = new EventEmitter<string>();
  @Output() backMainMenu = new EventEmitter<string>();

  @Input() score!: number;

  onBackMainMenu(): void {
    this.backMainMenu.emit(Scene.MainMenu);
  }

  onReplay(): void {
    this.replay.emit(Scene.Gameplay);
  }
}
