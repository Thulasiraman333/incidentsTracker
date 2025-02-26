export class User {
  userName: string;
  password: string;

  constructor() {
    this.userName = "";
    this.password = "";
  }
}

export interface ApiResponse {
  message: string,
  result: boolean,
  data: any;
}