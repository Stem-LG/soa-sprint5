import { Injectable, signal } from "@angular/core";
import { authenticatedFetch } from "../../lib/authenticatedFetch";





@Injectable()
export class UsersService {
  apiUrl = "http://localhost:4000/auth/users";

  users = signal<User[]>([]);

  user = signal<User | null>(null);

  constructor() {
    this.getUsers()
  }

  async getUsers() {
    const response = await authenticatedFetch(this.apiUrl).then((response) => response.json());

    this.users.set(response);

    return response;
  }

  async getUser(id: string) {
    const response = await authenticatedFetch(`${this.apiUrl}/${id}`).then((response) => response.json());

    this.user.set(response);

    return response;

  }

  async updateUser(user: any) {
    const response = await authenticatedFetch(`${this.apiUrl}/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user)
    }).then((response) => response.json());

    this.user.set(response);

    return response;
  }

  async deleteUser(id: string) {
    const response = await authenticatedFetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    });

    return response.json();
  }

}