import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/services';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,

    ButtonModule,
    MenuModule,
    AvatarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  currentUser$!: Observable<User | null>;
  items: MenuItem[] | undefined;

  constructor(private _authService: AuthService, private _router: Router) {
    this.currentUser$ = this._authService.currentUser$;
  }

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            separator: true,
          },
          {
            label: 'Añadir cuenta',
            icon: 'pi pi-plus',
            route: '/login',
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];
  }

  async logout(): Promise<void> {
    await this._authService.logout();
  }
}
