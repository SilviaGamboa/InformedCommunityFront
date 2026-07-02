import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Anuncio } from '../../../domain/entities/anuncio.entity';
import { ObtenerAnunciosUseCase } from '../../../application/use-cases/anuncios/obtener-anuncios.usecase';
import { CrearAnuncioUseCase } from '../../../application/use-cases/anuncios/crear-anuncio.usecase';
import { EliminarAnuncioUseCase } from '../../../application/use-cases/anuncios/eliminar-anuncio.usecase';
import { TokenService } from '../../../infrastructure/services/token.service';
import { AlertService } from '../../../infrastructure/services/alert.service';

@Component({
  selector: 'app-publicar-anuncios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicar-anuncios.html',
  styleUrls: ['./publicar-anuncios.scss'],
})
export class PublicarAnunciosComponent implements OnInit {
  anuncios: Anuncio[] = [];
  cargando = true;
  error = '';

  modalAbierto = false;
  titulo = '';
  descripcion = '';
  validacionTitulo = '';
  validacionDescripcion = '';
  publicando = false;

  eliminandoId: number | null = null;

  constructor(
    private obtenerAnunciosUseCase: ObtenerAnunciosUseCase,
    private crearAnuncioUseCase: CrearAnuncioUseCase,
    private eliminarAnuncioUseCase: EliminarAnuncioUseCase,
    private router: Router,
    private tokenService: TokenService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.cargarAnuncios();
  }

  cargarAnuncios(): void {
    this.cargando = true;
    this.error = '';

    this.obtenerAnunciosUseCase.execute().subscribe({
      next: (data) => {
        this.anuncios = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los anuncios.';
        this.alertService.error(
          'Error',
          'No fue posible cargar los anuncios.'
        );
        this.cargando = false;
      },
    });
  }

  abrirModal(): void {
    this.titulo = '';
    this.descripcion = '';
    this.limpiarValidaciones();
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  publicar(): void {
    this.limpiarValidaciones();

    if (!this.titulo.trim()) {
      this.validacionTitulo = 'El título es obligatorio.';
    }

    if (!this.descripcion.trim()) {
      this.validacionDescripcion = 'La descripción es obligatoria.';
    }

    if (!this.titulo.trim() || !this.descripcion.trim()) {
      this.alertService.warning(
        'Campos incompletos',
        'Debe completar el título y la descripción.'
      );
      return;
    }

    this.publicando = true;

    this.crearAnuncioUseCase.execute({
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
    }).subscribe({
      next: () => {
        this.publicando = false;

        this.alertService.success(
          'Anuncio publicado',
          'El anuncio fue creado correctamente.'
        );

        this.cerrarModal();
        this.cargarAnuncios();
      },
      error: () => {
        this.publicando = false;

        this.alertService.error(
          'Error al publicar',
          'Inténtelo nuevamente.'
        );
      },
    });
  }

  eliminar(id: number): void {

    this.alertService.confirm(
      'Eliminar anuncio',
      '¿Está seguro de que desea eliminar este anuncio?'
    ).then((confirmado) => {

      if (!confirmado) return;

      this.eliminandoId = id;

      this.eliminarAnuncioUseCase.execute(id).subscribe({

        next: () => {

          this.anuncios = this.anuncios.filter((a) => a.id !== id);

          this.eliminandoId = null;

          this.alertService.success(
            'Anuncio eliminado',
            'El anuncio fue eliminado correctamente.'
          );

        },

        error: () => {

          this.eliminandoId = null;

          this.alertService.error(
            'Error al eliminar',
            'No fue posible eliminar el anuncio.'
          );

        },

      });

    });

  }

  volver(): void {
    this.router.navigate(['/admin-home']);
  }

  private limpiarValidaciones(): void {
    this.validacionTitulo = '';
    this.validacionDescripcion = '';
  }

  cerrarSesion(): void {

    this.alertService.confirm(
      'Cerrar sesión',
      '¿Desea cerrar la sesión actual?'
    ).then((confirmado) => {

      if (confirmado) {
        this.tokenService.clear();
        this.router.navigate(['/login']);
      }

    });

  }
}