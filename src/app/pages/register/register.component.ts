import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Register } from '@app/interfaces';
import { InputErrorComponent } from '@app/components';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    DividerModule,
    ToastModule,

    InputErrorComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService],
})
export class RegisterComponent {
  loading: boolean = false;

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  get firstNameControl(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  async onRegister(): Promise<void> {
    try {
      const credentials = this.form.getRawValue() as Register;

      this.form.markAsPending();
      this.loading = true;

      await this._authService.register(credentials);

      this._router.navigateByUrl('/');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-credential':
          this._messageService.add({
            severity: 'error',
            detail: 'No podes usar este correo eletronico',
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
