import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.css',
})
export class AccountCardComponent {
  @Input() username!: string;
  @Input() image!: string;
  @Input() selected!: boolean;
}
