import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Scene } from '../Scene.enum';

@Component({
  selector: 'app-gameplay',
  standalone: true,
  imports: [],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.scss',
})
export class GameplayComponent implements OnInit {
  @Output() playEventEmitter = new EventEmitter<string>();
  @Output() gameOverEventEmitter = new EventEmitter<string>();
  @Output() hitsEventEmitter = new EventEmitter<number>();

  @ViewChild('answersDiv') private _answersDiv!: ElementRef;

  questionNumber = 15;
  numberQuestion = 0;
  country: any;
  question: any;
  urlImage!: string;
  hits: number = 0;

  data = [
    {
      flag: 'argentina',
      question: '¿Cuál es el río más importante de Argentina?',
      answer: 'río de la plata',
      options: [
        'río amazonas',
        'río de la plata',
        'río nilo',
        'río mississippi',
      ],
    },
    {
      flag: 'brasil',
      question:
        '¿Cuál es el nombre de la selva tropical más grande del mundo que se encuentra en Brasil?',
      answer: 'amazonia',
      options: [
        'sahara',
        'amazonia',
        'bosque lluvioso de costa rica',
        'bosque boreal',
      ],
    },
    {
      flag: 'peru',
      question: '¿Cuál es el sitio arqueológico más famoso de Perú?',
      answer: 'machu picchu',
      options: ['chichén itzá', 'petra', 'machu picchu', 'coliseo romano'],
    },
    {
      flag: 'mexico',
      question: '¿En qué país se encuentra la pirámide del Sol?',
      answer: 'méxico',
      options: ['egipto', 'méxico', 'india', 'china'],
    },
    {
      flag: 'colombia',
      question: '¿Cuál es la capital de Colombia?',
      answer: 'bogotá',
      options: ['caracas', 'quito', 'lima', 'bogotá'],
    },
    {
      flag: 'venezuela',
      question: '¿Cuál es la montaña más alta de Venezuela?',
      answer: 'pico bolívar',
      options: [
        'monte everest',
        'pico bolívar',
        'monte kilimanjaro',
        'monte aconcagua',
      ],
    },
    {
      flag: 'chile',
      question: '¿Qué desierto se encuentra en el norte de Chile?',
      answer: 'desierto de atacama',
      options: [
        'desierto del sahara',
        'desierto de atacama',
        'desierto de sonora',
        'desierto de gobi',
      ],
    },
    {
      flag: 'ecuador',
      question:
        '¿Qué línea imaginaria divide a la Tierra en el hemisferio norte y sur y atraviesa Ecuador?',
      answer: 'ecuador',
      options: [
        'línea de mason-dixon',
        'línea de cambio de fecha',
        'ecuador',
        'meridiano de greenwich',
      ],
    },
    {
      flag: 'uruguay',
      question: '¿Cuál es la capital de Uruguay?',
      answer: 'montevideo',
      options: ['asunción', 'montevideo', 'santiago', 'buenos aires'],
    },
    {
      flag: 'paraguay',
      question: '¿Cuál es el río más importante de Paraguay?',
      answer: 'río paraguay',
      options: ['río amazonas', 'río paraguay', 'río nilo', 'río mississippi'],
    },
    {
      flag: 'bolivia',
      question:
        '¿Cuál es el lago más alto y navegable del mundo que se encuentra en Bolivia?',
      answer: 'lago titicaca',
      options: [
        'lago superior',
        'lago titicaca',
        'lago baikal',
        'lago ontario',
      ],
    },
    {
      flag: 'guatemala',
      question: '¿Cuál es la capital de Guatemala?',
      answer: 'ciudad de guatemala',
      options: [
        'ciudad de panamá',
        'san salvador',
        'ciudad de guatemala',
        'ciudad de méxico',
      ],
    },
    {
      flag: 'costa rica',
      question: '¿Cuál es el volcán más activo de Costa Rica?',
      answer: 'volcán arenal',
      options: [
        'volcán kilimanjaro',
        'monte fuji',
        'volcán arenal',
        'volcán vesubio',
      ],
    },
    {
      flag: 'honduras',
      question: '¿Cuál es la capital de Honduras?',
      answer: 'tegucigalpa',
      options: ['san josé', 'tegucigalpa', 'managua', 'san salvador'],
    },
    {
      flag: 'nicaragua',
      question:
        '¿Cuál es el lago más grande de América Central que se encuentra en Nicaragua?',
      answer: 'lago nicaragua',
      options: [
        'lago titicaca',
        'lago nicaragua',
        'lago de chapala',
        'lago baikal',
      ],
    },
  ];

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    let randomIndex = Math.floor(Math.random() * this.data.length - 0 + 0);

    this.question = this.data[randomIndex];

    this._httpClient
      .get(`https://restcountries.com/v3.1/name/${this.question.flag}`)
      .subscribe((data: any) => {
        this.urlImage = data[0].flags.png;
      });
  }

  home(): void {
    this.playEventEmitter.emit(Scene.MainMenu);
  }

  answerClick(e: any, option: string): void {
    const answerDiv = e.target;

    if (this.question.answer.toLowerCase() !== option.toLowerCase()) {
      answerDiv.classList.add('wrong');
    } else {
      answerDiv.classList.add('right');

      this.hits++;
    }

    this.questionNumber--;

    setTimeout(() => {
      this.clearButton();

      let randomIndex = Math.floor(Math.random() * this.data.length - 0 + 0);

      this.question = this.data[randomIndex];

      this._httpClient
        .get(`https://restcountries.com/v3.1/name/${this.question.flag}`)
        .subscribe((data: any) => {
          this.urlImage = data[0].flags.png;
        });

      this.numberQuestion++;
    }, 500);

    if (this.questionNumber <= 0) {
      this.hitsEventEmitter.emit(this.hits);

      this.gameOverEventEmitter.emit(Scene.GameOver);
    }
  }

  clearButton(): void {
    const divAns = this._answersDiv.nativeElement;

    for (let i = 0; i < divAns.children.length; i++) {
      divAns.children[i].classList.remove('wrong');
      divAns.children[i].classList.remove('right');
    }
  }
}
