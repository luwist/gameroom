import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { UserGithub } from '@app/interfaces';
import { GithubRepository } from '@app/repositories';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-who-i-am',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './who-i-am.component.html',
  styleUrl: './who-i-am.component.css',
})
export class WhoIAmComponent {
  userGithub$!: Observable<UserGithub>;

  constructor(_githubRepository: GithubRepository) {
    this.userGithub$ = _githubRepository.getUserByUsername('luwist');
  }
}
