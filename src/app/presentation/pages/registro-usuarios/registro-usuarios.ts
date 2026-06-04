import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrarUsuarioUseCase } from '../../../application/use-cases/auth/registrar-usuario.usecase';

@Component({
  selector: 'app-registro-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-usuarios.html',
  styleUrls: ['./registro-usuarios.scss']
})
export class RegistroUsuariosComponent {
  form: FormGroup;
  exito = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private registrarUseCase: RegistrarUsuarioUseCase,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['usuario', Validators.required]
    });
  }

  registrar() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    this.registrarUseCase.execute(this.form.getRawValue()).subscribe({
      next: () => {
        alert('Usuario registrado correctamente.');
        this.form.reset({ rol: 'usuario' });
      },
      error: (err) => {
        const mensaje = err?.error?.mensaje ?? 'Ocurrió un error al registrar el usuario.';
        alert(mensaje);
      }
    });
  }

  volver() {
    this.router.navigate(['/admin-home']);
  }
}
