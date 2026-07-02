import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../../infrastructure/services/token.service';
import { RegistrarUsuarioUseCase } from '../../../application/use-cases/auth/registrar-usuario.usecase';
import { AlertService } from '../../../infrastructure/services/alert.service';

@Component({
  selector: 'app-registro-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-usuarios.html',
  styleUrls: ['./registro-usuarios.scss'],
})
export class RegistroUsuariosComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrarUseCase: RegistrarUsuarioUseCase,
    private router: Router,
    private tokenService: TokenService,
    private alertService: AlertService,
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['usuario', Validators.required],
    });
  }

  registrar() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.alertService.warning(
        'Formulario incompleto',
        'Por favor completa todos los campos correctamente.'
      );
      return;
    }

    this.registrarUseCase.execute(this.form.getRawValue()).subscribe({
      next: async () => {
        await this.alertService.success(
          'Usuario registrado',
          'El usuario fue registrado correctamente.'
        );

        this.form.reset({
          rol: 'usuario',
        });
      },

      error: (err) => {
        const mensaje =
          err?.error?.mensaje ??
          'Ocurrió un error al registrar el usuario.';

        this.alertService.error(
          'No fue posible registrar el usuario',
          mensaje
        );
      },
    });
  }

  volver() {
    this.router.navigate(['/admin-home']);
  }

  cerrarSesion(): void {
    this.alertService
      .confirm(
        'Cerrar sesión',
        '¿Desea cerrar la sesión actual?'
      )
      .then((confirmado) => {
        if (confirmado) {
          this.tokenService.clear();
          this.router.navigate(['/login']);
        }
      });
  }
}