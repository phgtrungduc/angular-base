export interface LoginResponse {
  IsSuccess: boolean;
  JWT : string;
  User : {
    Username : string;
    Role : number;
  }
}
