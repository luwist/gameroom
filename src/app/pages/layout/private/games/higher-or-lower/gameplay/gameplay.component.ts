import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-gameplay',
  standalone: true,
  imports: [],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.scss',
})
export class GameplayComponent implements AfterViewInit {
  @ViewChild('cardAnimation') private _cardAnimationRef!: ElementRef;
  @ViewChild('cardBack') private _cardBackRef!: ElementRef;
  @ViewChild('card') private _cardRef!: ElementRef;
  @ViewChild('endgame') private _endgameRef!: ElementRef;

  totalCard: number = 10;
  currentNumberCard!: number;
  disabledButton: boolean = true;
  hits: number = 0;

  async ngAfterViewInit(): Promise<void> {
    await this.startGame();
  }

  startGame(): void {
    this.currentNumberCard = this.firstCard();
  }

  randomCardPosition(): Position {
    const randomColumn = Math.floor(Math.random() * 13 - 0 + 0);
    const randomRow = Math.floor(Math.random() * 4 - 0 + 0);

    const widthCard = 92;
    const heightCard = 128;

    return {
      x: widthCard * randomColumn,
      y: heightCard * randomRow,
    };
  }

  firstCard(): number {
    const cardElement = this._cardRef.nativeElement as HTMLDivElement;
    const positionCard = this.randomCardPosition();

    cardElement.style.opacity = '0';

    setTimeout(async () => {
      await this.animateCard(positionCard);

      cardElement.style.opacity = '1';
      cardElement.style.backgroundPosition = `-${positionCard.x}px ${positionCard.y}px`;

      this.disabledButton = false;
    }, 1000);

    this.totalCard--;

    return positionCard.x / 92;
  }

  animateCard(position: Position): Promise<void> {
    return new Promise((resolve, reject) => {
      const cardAnimationElement = this._cardAnimationRef
        .nativeElement as HTMLDivElement;
      const cardFront = cardAnimationElement.children[0] as HTMLDivElement;

      cardFront.style.backgroundPosition = `-${position.x}px ${position.y}px`;

      cardAnimationElement.classList.add('show-animation', 'show');

      setTimeout(() => {
        cardAnimationElement.classList.remove('show-animation', 'show');

        resolve();
      }, 500);
    });
  }

  async nextCard(): Promise<number> {
    const cardElement = this._cardRef.nativeElement as HTMLDivElement;
    const cardBackElement = this._cardBackRef.nativeElement as HTMLDivElement;
    const cardEndGameElement = this._endgameRef.nativeElement as HTMLDivElement;
    const cardAnimationElement = this._cardAnimationRef
      .nativeElement as HTMLDivElement;

    const positionCard = this.randomCardPosition();

    if (this.totalCard <= 0) {
      cardBackElement.style.opacity = '0';

      await this.animateCard(positionCard);

      cardAnimationElement.style.opacity = '0';

      cardEndGameElement.classList.remove('hide');
    } else {
      await this.animateCard(positionCard);
    }

    cardElement.style.backgroundPosition = `-${positionCard.x}px ${positionCard.y}px`;

    return positionCard.x / 92;
  }

  onReplay(): void {
    const cardBackElement = this._cardBackRef.nativeElement as HTMLDivElement;
    const cardEndGameElement = this._endgameRef.nativeElement as HTMLDivElement;
    const cardAnimationElement = this._cardAnimationRef
      .nativeElement as HTMLDivElement;

    cardEndGameElement.classList.add('hide');

    cardBackElement.style.opacity = '1';
    cardAnimationElement.style.opacity = '1';

    this.disabledButton = true;

    this.startGame();

    this.totalCard = 10;
  }

  async onHigher(e: Event): Promise<void> {
    const card = await this.nextCard();

    if (card > this.currentNumberCard) {
      this.toggleState(e, 'right');

      this.hits++;
    } else {
      this.toggleState(e, 'wrong');
    }

    this.currentNumberCard = card;

    this.totalCard--;
  }

  async onLower(e: Event): Promise<void> {
    const card = await this.nextCard();

    if (card < this.currentNumberCard) {
      this.toggleState(e, 'right');

      this.hits++;
    } else {
      this.toggleState(e, 'wrong');
    }

    this.currentNumberCard = card;

    this.totalCard--;
  }

  toggleState(e: Event, state: string): void {
    const buttonElement = e.target as HTMLButtonElement;

    buttonElement.classList.toggle(state);

    setTimeout(() => {
      buttonElement.classList.toggle(state);
    }, 500);
  }
}
