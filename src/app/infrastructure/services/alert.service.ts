import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  success(title: string, text?: string) {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      timer: 2500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timerProgressBar: true
    });
  }

  error(title: string, text?: string) {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timerProgressBar: true
    });
  }

  warning(title: string, text?: string) {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timerProgressBar: true
    });
  }

  info(title: string, text?: string) {
    return Swal.fire({
      icon: 'info',
      title,
      text,
      timer: 2500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timerProgressBar: true
    });
  }

  confirm(title: string, text?: string): Promise<boolean> {
    return Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      reverseButtons: true
    }).then(result => result.isConfirmed);
  }

}