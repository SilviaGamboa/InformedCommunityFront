import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrearIncidenciaUseCase } from '../../../application/use-cases/incidencias/crear-incidencia.usecase';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './incidencias.html',
  styleUrls: ['./incidencias.scss']
})
export class IncidenciasComponent {

  form: FormGroup;
  imagenSeleccionada: File | null = null;
  previewUrl: string | null = null;
  errorImagen: string | null = null;

  constructor(
    private crearIncidenciaUseCase: CrearIncidenciaUseCase,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const archivo = input.files[0];
    const extensionesPermitidas = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!extensionesPermitidas.includes(archivo.type)) {
      this.errorImagen = 'Solo se permiten imágenes JPG o PNG.';
      this.imagenSeleccionada = null;
      this.previewUrl = null;
      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      this.errorImagen = 'La imagen no puede superar los 5MB.';
      this.imagenSeleccionada = null;
      this.previewUrl = null;
      return;
    }

    this.errorImagen = null;
    this.imagenSeleccionada = archivo;

    const reader = new FileReader();
    reader.onload = () => { this.previewUrl = reader.result as string; };
    reader.readAsDataURL(archivo);
  }

  quitarImagen(): void {
    this.imagenSeleccionada = null;
    this.previewUrl = null;
    this.errorImagen = null;
  }

  crearIncidencia(): void {
    if (this.form.invalid) return;

    this.crearIncidenciaUseCase
      .execute(this.form.getRawValue(), this.imagenSeleccionada ?? undefined)
      .subscribe({
        next: () => {
          alert('Incidencia creada correctamente');
          this.form.reset();
          this.quitarImagen();
        },
        error: () => {
          alert('Error al crear la incidencia');
        }
      });
  }

  volver(): void {
    this.router.navigate(['/home']);
  }
}
