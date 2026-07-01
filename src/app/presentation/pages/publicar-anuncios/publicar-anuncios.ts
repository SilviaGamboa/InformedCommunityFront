import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Anuncio } from '../../../domain/entities/anuncio.entity';
import { ObtenerAnunciosUseCase } from '../../../application/use-cases/anuncios/obtener-anuncios.usecase';
import { CrearAnuncioUseCase } from '../../../application/use-cases/anuncios/crear-anuncio.usecase';
import { EliminarAnuncioUseCase } from '../../../application/use-cases/anuncios/eliminar-anuncio.usecase';

@Component({
  selector: 'app-publicar-anuncios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicar-anuncios.html',
  styleUrls: ['./publicar-anuncios.scss']
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
  mensajeExito = '';
  mensajeError = '';
  publicando = false;

  eliminandoId: number | null = null;

  constructor(
    private obtenerAnunciosUseCase: ObtenerAnunciosUseCase,
    private crearAnuncioUseCase: CrearAnuncioUseCase,
    private eliminarAnuncioUseCase: EliminarAnuncioUseCase,
    private router: Router
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
        this.cargando = false;
      }
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

    if (!this.titulo.trim()) this.validacionTitulo = 'El título es obligatorio.';
    if (!this.descripcion.trim()) this.validacionDescripcion = 'La descripción es obligatoria.';
    if (!this.titulo.trim() || !this.descripcion.trim()) return;

    this.publicando = true;

    this.crearAnuncioUseCase.execute({
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim()
    }).subscribe({
      next: () => {
        this.publicando = false;
        this.cerrarModal();
        this.cargarAnuncios();
      },
      error: () => {
        this.mensajeError = 'Error al publicar el anuncio. Inténtalo de nuevo.';
        this.publicando = false;
      }
    });
  }

  eliminar(id: number): void {
    this.eliminandoId = id;

    this.eliminarAnuncioUseCase.execute(id).subscribe({
      next: () => {
        this.anuncios = this.anuncios.filter(a => a.id !== id);
        this.eliminandoId = null;
      },
      error: () => {
        this.eliminandoId = null;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/admin-home']);
  }

  private limpiarValidaciones(): void {
    this.validacionTitulo = '';
    this.validacionDescripcion = '';
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
