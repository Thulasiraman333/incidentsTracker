import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../Services/master.service';
import { ApiResponse } from '../../model/User';
import { error } from 'console';

@Component({
  selector: 'app-create-incident',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.scss'
})
export class CreateIncidentComponent {

  masterService = inject(MasterService);
  loggedUserData: any;

  incidentObj = {
    "incidentId": 0,
    "title": "",
    "description": "",
    "priority": "",
    "status": "Open",
    "createdBy": 0,
    "assignedTo": 0,
    "createdDate": new Date(),
    "resolvedDate": null
  }

  saveIncident() {
    this.loggedUserData = localStorage.getItem("IncidentDetail");
    if (this.loggedUserData != null) {
      this.loggedUserData = JSON.parse(this.loggedUserData);
      this.incidentObj.createdBy = this.loggedUserData.userId;
    }
    this.masterService.createNewIncident(this.incidentObj).subscribe((res: ApiResponse) => {
      alert("Incident created successfully");
    }, (error) => {
      alert(error);
    })
  }
  resetForm() {
    this.incidentObj = {
      "incidentId": 0,
      "title": "",
      "description": "",
      "priority": "",
      "status": "Open",
      "createdBy": 0,
      "assignedTo": 0,
      "createdDate": new Date(),
      "resolvedDate": null
    }
  }

}
