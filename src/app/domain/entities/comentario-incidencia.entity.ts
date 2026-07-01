export interface ComentarioIncidencia {
  id: number;
  incidenciaId: number;
  comentario: string;
  fechaCreacion: Date;
  autor?: string;
}
