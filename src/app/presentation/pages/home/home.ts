import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {

  constructor(
    private router: Router
  ) {}

  irAIncidencias() {

    this.router.navigate([
      '/incidencias'
    ]);
  }

  irAMisIncidencias() {

    this.router.navigate([
      '/mis-incidencias'
    ]);
  }
}
