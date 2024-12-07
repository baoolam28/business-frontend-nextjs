import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  constructor(message, type) {
    super(message); 
    this.type = type; 
    this.name = "CustomAuthError"; 
  }
};

export class InvalidEmailPasswordError extends AuthError {
    constructor(message) {
      super(message);
      this.type = "invalid_email_password";
      this.name = "InvalidEmailPasswordError";
    }
};