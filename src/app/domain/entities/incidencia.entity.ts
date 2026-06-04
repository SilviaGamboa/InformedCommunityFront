export interface Incidencia {
  id: number;
  idUsuario: number;
  titulo: string;
  descripcion: string;
  estado: string;
  fechaCreacion: Date;
  imagenUrl?: string;
}