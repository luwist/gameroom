import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '@app/services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  addDoc,
  collection,
  Firestore,
  onSnapshot,
  orderBy,
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
  chat: any[] = [];
  usersListSnapshot!: Unsubscribe;
  chatListSnapshot!: Unsubscribe;
  currentUser$!: Observable<User | null>;
  message: string = '';
  lastMessage!: string;

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
      this.initChat();
    }
  }

  initChat(): void {
    const collRef = collection(this._firestore, 'chat');
    const q = query(collRef, orderBy('createdAt'));

    this.chatListSnapshot = onSnapshot(q, (querySnapshot) => {
      let chat: any[] = [];

      querySnapshot.forEach((change) => {
        const data = change.data();

        chat.push(data);
      });

      this.chat = chat;
    });
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

  checkLastMessage(id: string): boolean {
    this.lastMessage = id;

    return false;
  }

  async sendMessage(): Promise<void> {
    const user: any = localStorage.getItem('currentUser');
    const userParse = JSON.parse(user);
    const collRef = collection(this._firestore, 'chat');
    const message = this.message;

    if (userParse !== null) {
      this.message = '';

      await addDoc(collRef, {
        id: userParse.currentUser.uid,
        createdAt: new Date(),
        message: message,
        name: userParse.currentUser.displayName || null,
        picture: userParse.currentUser.photoURL || null,
      });
    }
  }

  ngOnDestroy(): void {
    const user: any = localStorage.getItem('currentUser');
    const userParse = JSON.parse(user);

    if (userParse !== null) {
      this.chatListSnapshot();
      this.usersListSnapshot();
    }
  }
}
