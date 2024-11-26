import { Injectable } from "@angular/core";
import { authenticatedFetch } from "../../lib/authenticatedFetch";



@Injectable()
export class RecruiterJobOfferService {

  apiUrl = "http://localhost:4000/offers";

  async createJobOffer(offer: {
    title: string,
    company: string,
    skills: string,
    description: string,
    images: string[]
  }) {

    const response = await authenticatedFetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offer)
    })
      .then(response => response.json())

    return response

  }

  async updateJobOffer(offer: jobOffer) {

    const response = await authenticatedFetch(this.apiUrl + `/${offer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offer)
    })
      .then(response => response.json())

    return response
  }

  async deleteJobOffer(offer: jobOffer) {

    const response = await authenticatedFetch(this.apiUrl + `/${offer.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())

    return response
  }

}