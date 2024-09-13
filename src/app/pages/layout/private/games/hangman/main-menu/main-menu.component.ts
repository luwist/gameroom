import { Component, EventEmitter, Output } from '@angular/core';
import { Scene } from '../scene.enum';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  @Output() initGameplay = new EventEmitter();

  onInitGameplay(): void {
    this.initGameplay.emit(Scene.Gameplay);
  }
}
