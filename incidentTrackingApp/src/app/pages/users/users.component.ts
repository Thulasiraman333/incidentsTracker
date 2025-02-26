import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../Services/master.service';
import { ApiResponse } from '../../model/User';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  userForm: FormGroup = new FormGroup({});
  masterService = inject(MasterService);
  userList = signal<any[]>([]);

  intializeForm(userData?: any) {
    this.userForm = new FormGroup({
      userId: new FormControl(userData ? userData.userId : 0),
      userName: new FormControl(userData ? userData.userName : ""),
      emailId: new FormControl(userData ? userData.emailId : ""),
      fullName: new FormControl(userData ? userData.fullName : ""),
      password: new FormControl(userData ? userData.password : ""),
      role: new FormControl(userData ? userData.role : "")
    });
  }
  constructor() {
    this.intializeForm();
    this.loadUsers();
  }

  loadUsers() {
    this.masterService.getAllUsers().subscribe((res: ApiResponse) => {
      this.userList.set(res.data);
    })
  }
  onSaveUser() {
    const formValue = this.userForm.value;
    this.masterService.createNewUser(formValue).subscribe((res: ApiResponse) => {
      if (res.result) {
        alert("User Created Success");
        this.userForm.reset();
        this.loadUsers();
      } else {
        alert(res.message);
      }
    })
  }

  deleteUser(item: any) {
    this.masterService.deleteUser(item.userId).subscribe((res: ApiResponse) => {
      if (res.result) {
        alert("User Deleted Successfully");
        this.loadUsers();
      } else {
        alert(res.message);
      }
    })
  }

  editUser(item: any) {
    this.intializeForm(item);
  }

  onUpdateUser() {
    const formData = this.userForm.value;
    formData.createdDate = new Date();
    formData.projectName = "IncidentTracking";
    formData.refreshToken = new Date();
    formData.refreshTokenExpiryTime = new Date();
    this.masterService.updateUser(formData).subscribe((res: ApiResponse) => {
      if (res.result) {
        alert("User Details Updated Succesfully");
        this.userForm.reset();
        this.loadUsers();
      } else {
        alert(res.message);
      }
    })
  }
}
