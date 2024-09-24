import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '@app/services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  collection,
  Firestore,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  connectedUsers: any[] = [];
  usersListSnapshot!: Unsubscribe;
  currentUser$!: Observable<User | null>;
  message: string = '';

  constructor(
    private _authService: AuthService,
    private _firestore: Firestore
  ) {
    this.currentUser$ = this._authService.currentUser$;
  }

  ngOnInit(): void {
    const user: any = localStorage.getItem('currentUser');
    const userParse = JSON.parse(user);

    if (userParse !== null) {
      this.initUsers();
    }
  }

  initUsers(): void {
    const collRef = collection(this._firestore, 'users');
    const q = query(collRef, where('isConnected', '==', true));

    this.usersListSnapshot = onSnapshot(q, (querySnapshot) => {
      let users: any[] = [];

      querySnapshot.forEach((change) => {
        const data = change.data();

        users.push(data);
      });

      this.connectedUsers = users;
    });
  }

  sendMessage(): void {
    console.log('enviar mensaje');
    console.log(this.message);
  }

  ngOnDestroy(): void {
    const user: any = localStorage.getItem('currentUser');
    const userParse = JSON.parse(user);

    if (userParse !== null) {
      this.usersListSnapshot();
    }
  }
}
