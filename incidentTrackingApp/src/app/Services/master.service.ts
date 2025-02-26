import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse, User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  http = inject(HttpClient);

  apiUrl: String = 'https://projectapi.gerasim.in/api/IncidentTracking/'

  login(obj: User) {
    return this.http.post<ApiResponse>('https://projectapi.gerasim.in/api/IncidentTracking/login', obj);
  }

  getAllUsers() {
    return this.http.get<ApiResponse>(`${this.apiUrl}GetAllUsers`);
  }

  createNewUser(obj: any) {
    return this.http.post<ApiResponse>(`${this.apiUrl}Register`, obj);
  }

  updateUser(obj: any) {
    return this.http.post<ApiResponse>(`${this.apiUrl}UpdateUser`, obj);
  }

  deleteUser(id: number) {
    return this.http.delete<ApiResponse>(`${this.apiUrl}DeleteUserByUserId?userId=${id}`);
  }

  createNewIncident(obj: any) {
    return this.http.post<ApiResponse>(`${this.apiUrl}createIncident`, obj);
  }

  getIncidentCreatedByUser(id: number) {
    return this.http.get(`${this.apiUrl}/getIncidentCreatedByUser?userId=${id}`);
  }

  getAllIncidents() {
    return this.http.get<ApiResponse>(`${this.apiUrl}getAllIncidents`);
  }

  getIncidentAssigntoUser(id: number) {
    return this.http.get(`${this.apiUrl}/getIncidentAssigntoUser?userId=${id}`);
  }

}
