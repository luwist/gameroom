import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Scene } from '../Scene.enum';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
})
export class GameOverComponent {
  @Input() hits!: number;

  @Output() playEventEmitter = new EventEmitter<string>();
  @Output() replay = new EventEmitter<string>();

  onPlay(): void {
    this.playEventEmitter.emit(Scene.MainMenu);
  }

  onReplay(): void {
    this.playEventEmitter.emit(Scene.Gameplay);
  }
}
