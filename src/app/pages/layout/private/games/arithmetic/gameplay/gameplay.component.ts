import {
  AfterViewInit,
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
export class GameplayComponent implements OnInit, AfterViewInit {
  @Output() changeScene = new EventEmitter<string>();
  @Output() scoreEmitter = new EventEmitter<number>();

  @ViewChild('progressBar') private _progressBarRef!: ElementRef;
  @ViewChild('countdown') private _countdownRef!: ElementRef;
  @ViewChild('gameplay') private _gameplayRef!: ElementRef;
  @ViewChild('options') private _optionsRef!: ElementRef;
  @ViewChild('answer') private _answerRef!: ElementRef;

  data = [
    {
      level: 1,
      question: '1 + 1',
      answer: 2,
      options: [31, 2, 80],
    },
    {
      question: '3 x 4',
      answer: 12,
      options: [7, 12, 9],
    },
    {
      question: '15 ÷ 3',
      answer: 5,
      options: [3, 5, 7],
    },
    {
      question: '8 × 2',
      answer: 16,
      options: [10, 16, 20],
    },
    {
      question: '24 ÷ 4',
      answer: 6,
      options: [5, 6, 8],
    },
    {
      question: '7 × 6',
      answer: 42,
      options: [30, 36, 42],
    },
    {
      question: '36 ÷ 6',
      answer: 6,
      options: [4, 6, 8],
    },
    {
      question: '9 × 9',
      answer: 81,
      options: [72, 81, 90],
    },
    {
      question: '64 ÷ 8',
      answer: 8,
      options: [7, 8, 9],
    },
    {
      question: '5 × 7',
      answer: 35,
      options: [28, 35, 42],
    },
    {
      question: '49 ÷ 7',
      answer: 7,
      options: [6, 7, 8],
    },
    {
      question: '6 × 8',
      answer: 48,
      options: [40, 48, 56],
    },
    {
      question: '72 ÷ 9',
      answer: 8,
      options: [6, 8, 10],
    },
    {
      question: '12 × 3',
      answer: 36,
      options: [30, 36, 42],
    },
    {
      question: '48 ÷ 6',
      answer: 8,
      options: [6, 8, 10],
    },
    {
      question: '10 × 5',
      answer: 50,
      options: [40, 50, 60],
    },
    {
      question: '100 ÷ 5',
      answer: 20,
      options: [15, 20, 25],
    },
    {
      question: '9 × 7',
      answer: 63,
      options: [54, 63, 72],
    },
    {
      question: '81 ÷ 9',
      answer: 9,
      options: [7, 9, 11],
    },
    {
      question: '11 × 4',
      answer: 44,
      options: [36, 44, 52],
    },
    {
      question: '88 ÷ 4',
      answer: 22,
      options: [18, 22, 26],
    },
    {
      question: '15 + 7',
      answer: 22,
      options: [18, 22, 26],
    },
    {
      question: '30 - 9',
      answer: 21,
      options: [18, 21, 24],
    },
    {
      question: '42 + 18',
      answer: 60,
      options: [55, 60, 65],
    },
    {
      question: '55 - 15',
      answer: 40,
      options: [35, 40, 45],
    },
  ];

  progressPercentage = 100;
  countdownValue = 4;
  countdownTimer: any;
  gameTimer: any;
  question: any;
  result = '?';
  score: number = 0;

  ngOnInit(): void {
    this.selectQuestion();
  }

  ngAfterViewInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    this.toggleElement(this._gameplayRef, 'none');
    this.toggleElement(this._countdownRef, 'flex');

    this.countdownTimer = setInterval(() => {
      this.countdownValue--;

      this.updateCountdown();

      if (this.countdownValue <= 0) {
        clearInterval(this.countdownTimer);

        this.startGame();
        this.toggleElement(this._gameplayRef, 'block');
        this.toggleElement(this._countdownRef, 'none');
      }
    }, 1000);
  }

  startTimer() {
    const progressBarElement = this._progressBarRef.nativeElement;

    this.gameTimer = setInterval(() => {
      this.progressPercentage--;

      progressBarElement.style.width = `${this.progressPercentage}%`;

      if (this.progressPercentage <= 1) {
        this.changeScene.emit(Scene.GameOver);
        this.scoreEmitter.emit(this.score);
      }
    }, 120);
  }

  startGame(): void {
    this.startTimer();
  }

  selectQuestion(): void {
    let randomIndex = Math.floor(Math.random() * this.data.length - 0 + 0);

    this.question = this.data[randomIndex];
  }

  toggleElement(element: ElementRef, display: string): void {
    const divElement = element.nativeElement as HTMLDivElement;

    divElement.style.display = display;
  }

  updateCountdown(): void {
    const divElement = this._countdownRef.nativeElement as HTMLDivElement;

    divElement.innerText = this.countdownValue.toString();
  }

  nextQuestion(): void {
    setTimeout(() => {
      this.selectQuestion();

      this.clearButtons();
    }, 500);
  }

  clearButtons(): void {
    const optionsElement = this._optionsRef.nativeElement as HTMLDivElement;
    const answerElement = this._answerRef.nativeElement as HTMLButtonElement;

    for (let i = 0; i < optionsElement.children.length; i++) {
      const buttonElement = optionsElement.children[i] as HTMLButtonElement;

      buttonElement.classList.remove('wrong');
      buttonElement.classList.remove('right');
    }

    answerElement.classList.remove('right');
    this.result = '?';
  }

  selectedNumber(number: number, e: any) {
    const buttonElement = e.target as HTMLButtonElement;
    const answerElement = this._answerRef.nativeElement as HTMLButtonElement;

    if (this.question.answer != number) {
      buttonElement.classList.add('wrong');

      this.progressPercentage -= 10;
    } else {
      buttonElement.classList.add('right');
      answerElement.classList.add('right');

      this.result = number.toString();

      this.progressPercentage += 10;

      this.score += 1;

      this.nextQuestion();
    }
  }
}
