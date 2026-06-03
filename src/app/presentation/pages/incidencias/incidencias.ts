import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CrearIncidenciaUseCase }
from '../../../application/use-cases/incidencias/crear-incidencia.usecase';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './incidencias.html',
  styleUrls: ['./incidencias.scss']
})
export class IncidenciasComponent {

  form: FormGroup;

  constructor(
    private crearIncidenciaUseCase:
      CrearIncidenciaUseCase,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      titulo: [
        '',
        Validators.required
      ],
      descripcion: [
        '',
        Validators.required
      ]
    });
  }

  crearIncidencia() {

    if (this.form.invalid) return;

    this.crearIncidenciaUseCase
      .execute(this.form.getRawValue())
      .subscribe({

        next: () => {

          alert(
            'Incidencia creada correctamente'
          );

          this.form.reset();
        },

        error: () => {

          alert(
            'Error al crear la incidencia'
          );
        }
      });
  }
}