import { Injectable } from "@angular/core";
import { authenticatedFetch } from "../lib/authenticatedFetch";





@Injectable()
export class FileService {
  apiUrl = "http://localhost:4000/file";

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await authenticatedFetch(this.apiUrl, {
      method: 'POST',
      body: formData,

    })

    return response.json()
  }
}