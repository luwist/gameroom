import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { NotAuthenticateComponent } from '@app/components';
import { AuthService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NotAuthenticateComponent],
  templateUrl: './private.component.html',
  styleUrl: './private.component.css',
})
export class PrivateComponent {
  currentUser$!: Observable<User | null>;

  constructor(private _authService: AuthService) {
    this.currentUser$ = this._authService.currentUser$;
  }
}
