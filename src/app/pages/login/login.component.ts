import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Account, Login } from '@app/interfaces';
import { AccountCardComponent, InputErrorComponent } from '@app/components';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    DividerModule,
    ToastModule,

    AccountCardComponent,
    InputErrorComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  accounts: Account[] = [
    {
      id: 1,
      email: 'juan.perez@gameroom.com',
      password: '123456',
      username: 'Invitado',
      image: 'assets/images/avatar-02.jpg',
    },
    {
      id: 2,
      email: 'maria.fernandez@gameroom.com',
      password: '123456',
      username: 'Administrador',
      image: 'assets/images/avatar-03.jpg',
    },
    {
      id: 3,
      email: 'carlos.santana@gameroom.com',
      password: '123456',
      username: 'Tester',
      image: 'assets/images/avatar-04.jpg',
    },
  ];

  selectedOption!: number;
  loading: boolean = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  onSelect(account: Account): void {
    this.selectedOption = account.id;

    this.form.patchValue({
      email: account.email,
      password: account.password,
    });
  }

  async onLogin(): Promise<void> {
    try {
      const credentials = this.form.getRawValue() as Login;

      this.form.markAsPending();
      this.loading = true;

      await this._authService.login(credentials);

      this._router.navigateByUrl('/');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-credential':
          this._messageService.add({
            severity: 'error',
            detail:
              'No hemos podido encontrar ninguna cuenta que coincida con el correo electronico y la contraseña introducidos. Comprueba tu correo electronico y contraseña e intentalo de nuevo.',
          });
          break;
        default:
          this._messageService.add({
            severity: 'error',
            detail:
              'Ha ocurrido un error en el servidor. Intentelo de nuevo mas tarde',
          });
          break;
      }
    } finally {
      this.loading = false;
    }
  }
}
