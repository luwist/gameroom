import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGithub } from '@app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GithubRepository {
  constructor(private _httpClient: HttpClient) {}

  getUserByUsername(username: string): Observable<UserGithub> {
    return this._httpClient.get<UserGithub>(
      `https://api.github.com/users/${username}`
    );
  }
}
