import { inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { authenticatedFetch } from "../lib/authenticatedFetch";




@Injectable()
export class JobOfferService {

  route = inject(ActivatedRoute)

  apiUrl = "http://localhost:4000";

  jobOffer = signal<jobOffer | null>(null)


  constructor() {
    this.fetchJobOffer()
  }

  fetchJobOffer() {

    const id = this.route.snapshot.params['offerId']

    fetch(this.apiUrl + `/offers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        this.jobOffer.set({
          ...data,
          createdAt: new Date(data.createdAt)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }



  async applyForJob(
    {
      name,
      email,
      resumeFile,
      motivation
    }: {
      name: string,
      email: string,
      resumeFile: {
        id: number
      },
      motivation: string
    }
  ) {

    const savedApplication = await authenticatedFetch(this.apiUrl + `/application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        resumeFile: { id: resumeFile.id },
        motivation,
        jobOffer: { id: this.jobOffer()?.id }
      })
    })

    return savedApplication.json()
  }

}