import { Component, EventEmitter, Output } from '@angular/core';
import { Scene } from '../Scene.enum';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  @Output() playEventEmitter = new EventEmitter<string>();

  play(): void {
    this.playEventEmitter.emit(Scene.Gameplay);
  }
}
