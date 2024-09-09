import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Login, Register } from '@app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this._auth);

  constructor(private _auth: Auth) {}

  async login(request: Login): Promise<void> {
    await signInWithEmailAndPassword(
      this._auth,
      request.email,
      request.password
    );
  }
  async register(request: Register): Promise<void> {
    await createUserWithEmailAndPassword(
      this._auth,
      request.email,
      request.password
    );

    // updateProfile(user.user, {
    //   displayName: `${firstName} ${lastName}`,
    //   photoURL: profileUrl,
    // });
  }
  logout(): void {
    signOut(this._auth);
  }
}
