import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-authenticate',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './not-authenticate.component.html',
  styleUrl: './not-authenticate.component.css',
})
export class NotAuthenticateComponent {}
