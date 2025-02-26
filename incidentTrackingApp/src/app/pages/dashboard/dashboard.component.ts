import { Component } from '@angular/core';
import { UsersComponent } from "../users/users.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
