import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Scene } from '../scene.enum';

@Component({
  selector: 'app-gameplay',
  standalone: true,
  imports: [],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.scss',
})
export class GameplayComponent implements OnInit {
  @ViewChild('hud') private _hudElement!: ElementRef;
  @ViewChild('keyboardRef') private _keyboardElement!: ElementRef;
  @ViewChild('gameover') private _gameoverElement!: ElementRef;
  @ViewChild('gallow') private _gallowElement!: ElementRef;

  @Output() backMainMenu = new EventEmitter<string>();

  data = [
    {
      category: 'Animal',
      answer: ['elefante', 'leon', 'tigre', 'jirafa', 'hipopotamo'],
    },
    {
      category: 'Pais',
      answer: [
        'argentina',
        'francia',
        'japon',
        'australia',
        'brasil',
        'peru',
        'colombia',
      ],
    },
    {
      category: 'Fruta',
      answer: ['manzana', 'banana', 'naranja', 'frutilla', 'pera'],
    },
    {
      category: 'Profesion',
      answer: ['doctor', 'ingeniero', 'maestro', 'abogado', 'cocinero'],
    },
    {
      category: 'Color',
      answer: ['rojo', 'azul', 'verde', 'negro', 'blanco'],
    },
  ];

  category: string = '';
  word: string = '';
  usedLetters: string[] = [];
  score: number = 0;
  attempt: number = 0;

  keyboard: string[][] = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  ngOnInit(): void {
    this.startGame();
  }

  onReplay(): void {
    this.startGame();

    const keyboardElement = this._keyboardElement
      .nativeElement as HTMLDivElement;
    const hudElement = this._hudElement.nativeElement as HTMLDivElement;
    const gameoverElement = this._gameoverElement
      .nativeElement as HTMLDivElement;

    hudElement.classList.remove('hide');

    gameoverElement.classList.add('hide');
    gameoverElement.classList.remove('lose');

    keyboardElement.classList.remove('hide');

    this.usedLetters = [];

    this.attempt = 0;

    this.resetButtons();
    this.resetStickman();
  }

  startGame(): void {
    this.randomWord();
  }

  onBackMainMenu(): void {
    this.backMainMenu.emit(Scene.MainMenu);
  }

  randomWord(): void {
    const randomIndex = Math.floor(Math.random() * this.data.length - 0 + 0);
    const randomIndex2 = Math.floor(Math.random() * this.data.length - 0 + 0);

    this.category = this.data[randomIndex].category;
    this.word = this.data[randomIndex].answer[randomIndex2];
  }

  onSelectedKey(e: Event): void {
    const buttonElement = e.target as HTMLButtonElement;
    const gallowElement = this._gallowElement.nativeElement as HTMLDivElement;
    const key = buttonElement.dataset['key'] as string;

    if (this.word.indexOf(key) !== -1) {
      this.usedLetters.push(key);

      buttonElement.classList.add('right');

      this.score += 10;
    } else {
      gallowElement.children[this.attempt].classList.add('show');

      this.attempt++;

      buttonElement.classList.add('wrong');
    }

    this.checkWin();
  }

  resetButtons(): void {
    const keyboardElement = this._keyboardElement
      .nativeElement as HTMLDivElement;

    for (let i = 0; i < keyboardElement.children.length; i++) {
      const divElement = keyboardElement.children[i] as HTMLDivElement;

      for (let j = 0; j < divElement.children.length; j++) {
        const buttonElement = divElement.children[j] as HTMLButtonElement;

        buttonElement.classList.remove('right');
        buttonElement.classList.remove('wrong');
      }
    }
  }

  checkWin(): void {
    const keyboardElement = this._keyboardElement
      .nativeElement as HTMLDivElement;
    const hudElement = this._hudElement.nativeElement as HTMLDivElement;
    const gameoverElement = this._gameoverElement
      .nativeElement as HTMLDivElement;

    if (this.attempt > 6) {
      hudElement.classList.add('hide');

      gameoverElement.classList.remove('hide');
      gameoverElement.classList.add('lose');

      keyboardElement.classList.add('hide');

      this.showWord();
    }

    if (this.isWin()) {
      hudElement.classList.add('hide');

      gameoverElement.classList.remove('hide');
      gameoverElement.classList.add('welldone');

      keyboardElement.classList.add('hide');

      this.showWord();
    }
  }

  resetStickman(): void {
    const gallowElement = this._gallowElement.nativeElement as HTMLDivElement;

    for (let i = 0; i < gallowElement.children.length; i++) {
      const spanElement = gallowElement.children[i] as HTMLSpanElement;

      spanElement.classList.remove('show');
    }
  }

  showWord(): void {
    const word = this.word.split('');

    word.forEach((letter) => {
      this.usedLetters.push(letter);
    });
  }

  isWin(): boolean {
    const word = this.word.split('');
    let isWordInclude = false;
    let countLetter = 0;

    word.forEach((letter) => {
      if (this.usedLetters.includes(letter)) countLetter++;
    });

    if (word.length == countLetter) isWordInclude = true;

    return isWordInclude;
  }
}
