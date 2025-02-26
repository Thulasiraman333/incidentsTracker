import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  router = inject(Router);
  loggedUserData: any;
  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem("IncidentDetail");
      if (data != null) {
        this.loggedUserData = JSON.parse(data);
      }
    }
  }

  logOff() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem("IncidentDetail");
  }
}
