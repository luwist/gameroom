import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { Scene } from './scene.enum';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [CommonModule, MainMenuComponent, GameplayComponent],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss',
})
export class HangmanComponent {
  currentScene: string = Scene.MainMenu;

  onChangeScene(scene: string): void {
    this.currentScene = scene;
  }
}
