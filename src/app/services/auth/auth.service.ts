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
  private static _uid: string;
  currentUser$ = authState(this._auth);

  constructor(private _auth: Auth, private _userRepository: UserRepository) {}

  async login(request: Login): Promise<void> {
    const user = await signInWithEmailAndPassword(
      this._auth,
      request.email,
      request.password
    );

    AuthService._uid = user.user.uid;

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
    await this._userRepository.changeUserStatus(AuthService._uid);

    await signOut(this._auth);
  }
}
