import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Login, Register } from '@app/interfaces';
import { UserRepository } from '@app/repositories';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this._auth);

  constructor(private _auth: Auth, private _userRepository: UserRepository) {}

  async login(request: Login): Promise<void> {
    const user = await signInWithEmailAndPassword(
      this._auth,
      request.email,
      request.password
    );

    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        currentUser: user.user,
      })
    );

    await this._userRepository.changeUserStatus(user.user.uid);
  }

  async register(request: Register): Promise<void> {
    await createUserWithEmailAndPassword(
      this._auth,
      request.email,
      request.password
    );
  }

  async logout(): Promise<void> {
    const user: any = localStorage.getItem('currentUser');
    const userParse = JSON.parse(user);

    if (userParse !== null) {
      await this._userRepository.changeUserStatus(userParse.currentUser.uid);
    }

    await signOut(this._auth);

    localStorage.removeItem('currentUser');
  }
}
