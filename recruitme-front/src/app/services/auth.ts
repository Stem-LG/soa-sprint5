import { Injectable, signal } from "@angular/core";
import { jwtDecode } from "jwt-decode";


const authUrl = "http://localhost:4000/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {


  user = signal<User | null>(null);

  constructor() {
    this.getUser();
  }

  async login(username: string, password: string): Promise<User | null> {

    const response = await fetch(`${authUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
      const token = response.headers.get("Authorization");
      if (!token) {
        return null;
      }
      localStorage.setItem("token", token);
    }

    return this.getUser();
  }

  async register(username: string, email: string, password: string, role: string): Promise<boolean> {

    const result = await fetch(`${authUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, role }),
    });

    if (result.status !== 200) {
      return false;
    }

    return true;
  }

  async verify(token: string): Promise<Boolean> {
    return await fetch(`${authUrl}/verify/${token}`).then((response) => {
      return response.status === 200;
    });
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getUser(): User | null {

    const token = this.getToken();

    if (!token) {
      return null
    }

    const decodedToken = jwtDecode<User>(token);

    if (!decodedToken) {
      return null
    }

    this.user.set({
      id: decodedToken.id,
      username: decodedToken.username,
      email: decodedToken.email,
      role: decodedToken.role,
    });

    return this.user();
  }

  logout() {
    localStorage.removeItem("token");
    this.user.set(null);
  }


}