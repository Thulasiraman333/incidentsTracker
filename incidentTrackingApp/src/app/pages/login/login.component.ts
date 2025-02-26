import { Component, inject } from '@angular/core';
import { ApiResponse, User } from '../../model/User';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../Services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginObj: User = new User();
  masterService = inject(MasterService);
  router = inject(Router);
  constructor() { }

  ngOnInit() { }

  onLogin() {
    this.masterService.login(this.loginObj).subscribe((res: ApiResponse) => {
      if (res.result) {
        localStorage.setItem('IncidentDetail', JSON.stringify(res.data));
        this.router.navigateByUrl('/dashboard');
      } else {
        alert("Wrong Credentials");
      }
    })
  }
}
