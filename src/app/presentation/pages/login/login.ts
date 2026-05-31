import { Component } from '@angular/core';

import {
  FormBuilder,
   FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { LoginUseCase } from '../../../application/use-cases/auth/login.usecase';

import { TokenService } from '../../../infrastructure/services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
form: FormGroup;
  constructor(
   
    private loginUseCase: LoginUseCase,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  

  login() {

    if (this.form.invalid) return;

    this.loginUseCase.execute(
      this.form.getRawValue() as any
    )
    .subscribe({
      next: response => {

        this.tokenService.save(
          response.token
        );

        localStorage.setItem(
          'usuario',
          JSON.stringify(response)
        );

        this.router.navigate([
          '/home'
        ]);
      }
    });
  }
}