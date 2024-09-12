import { Injectable, OnDestroy } from '@angular/core';
import { Auth, authState, Unsubscribe } from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserRepository implements OnDestroy {
  private _usersSnapshot!: Unsubscribe;
  currentUser$ = authState(this._auth);

  constructor(private _auth: Auth, private _firestore: Firestore) {}

  async getAllConnectedUsers() {
    const users: any[] = [];

    this.currentUser$.subscribe((data) => {
      this._usersSnapshot = onSnapshot(
        collection(this._firestore, 'users'),
        (querySnapshot) => {
          querySnapshot.forEach((change) => {
            const data: any = change.data();

            users.push(data);
          });
        }
      );
    });

    return users;
  }

  async changeUserStatus(id: string) {
    const docRef = doc(this._firestore, 'users', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user: any = docSnap.data();

      await updateDoc(docRef, {
        isConnected: !user.isConnected,
      });
    }
  }

  ngOnDestroy(): void {
    this._usersSnapshot();
  }
}
