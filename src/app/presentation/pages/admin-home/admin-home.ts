import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  templateUrl: './admin-home.html',
  styleUrls: ['./admin-home.scss']
})
export class AdminHomeComponent {
  constructor(private router: Router) {}

  irARegistroUsuarios() {
    this.router.navigate(['/registro-usuarios']);
  }
}
