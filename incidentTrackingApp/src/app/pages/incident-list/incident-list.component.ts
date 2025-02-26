import { Component, inject } from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { ApiResponse } from '../../model/User';
import { error } from 'console';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.scss'
})
export class IncidentListComponent {

  masterService = inject(MasterService);
  loggedUserData: any;
  incidentList: any = [];

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem("IncidentDetail");
      if (data != null) {
        this.loggedUserData = JSON.parse(data);

        if (this.loggedUserData.role == 'User') {
          this.getIncidentCreatedByUser();
        } else if (this.loggedUserData.role == 'IncidentAdmin') {
          this.getAllIncidents()
        } else if (this.loggedUserData.role == 'Support Staff') {
          this.getIncidentCreatedByUser();
        }
      }
    }
  }

  ngOnInit() {

  }

  getAllIncidents() {
    this.masterService.getAllIncidents().subscribe((res) => {
      this.incidentList = res;
    })
  }

  getIncidentCreatedByUser() {
    const id = this.loggedUserData.userId;
    this.masterService.getIncidentCreatedByUser(id).subscribe((res: any) => {
      if (res.result) {
        this.incidentList = res.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getIncidentAssigntoUser() {
    const id = this.loggedUserData.userId;
    this.masterService.getIncidentAssigntoUser(id).subscribe((res: any) => {
      if (res.result) {
        this.incidentList = res.data;
      }
    }, (error) => {
      console.log(error);
    });
  }
}
