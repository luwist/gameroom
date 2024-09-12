import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '@app/services';
import { CommonModule } from '@angular/common';
import { UserRepository } from '@app/repositories';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  connectedUsers: any[] = [];
  currentUser$!: Observable<User | null>;

  constructor(
    private _authService: AuthService,
    private _userRepository: UserRepository
  ) {
    this.currentUser$ = this._authService.currentUser$;
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(async (data) => {
      if (data !== null) {
        this.connectedUsers = await this._userRepository.getAllConnectedUsers();
      }
    });
  }

  getConnectedUserslength(): number {
    let count = 0;

    this.currentUser$.subscribe(async (data) => {
      if (data !== null) {
        for (const user of this.connectedUsers) {
          if (user.isConnected) count++;
        }
      }
    });

    return count;
  }
}
