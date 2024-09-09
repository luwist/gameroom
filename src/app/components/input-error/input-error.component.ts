import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [],
  template: `
    @if (control.invalid && (control.touched || control.dirty)) { @if
    (control.hasError('required')) {
    <p class="text-sm text-[#FF3C5A] text-right mt-2">
      Este campo es requerido
    </p>
    } @if (control.hasError('email')) {
    <p class="text-sm text-[#FF3C5A] text-right mt-2">
      El correo electronico es incorrecto
    </p>
    } }
  `,
})
export class InputErrorComponent {
  @Input('control') control!: AbstractControl;
}
