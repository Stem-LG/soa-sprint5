import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JobOfferService } from '../../../services/job-offer';
import { RecruiterJobOfferService } from '../../../services/recruiter/job-offer';
import { AppBarComponent } from "../../../components/app-bar/app-bar";
import { JobOfferDetailsSectionComponent } from "../../../components/job-offer-details-section/job-offer-details-section";

@Component({
  selector: 'recruiter-offer-details-page',
  standalone: true,
  imports: [AppBarComponent, JobOfferDetailsSectionComponent],
  providers: [JobOfferService, RecruiterJobOfferService],
  templateUrl: './offer-details-page.html',
})

export class RecruiterOfferDetailsPage {

  jobOfferService = inject(JobOfferService)
  recruiterJobOfferService = inject(RecruiterJobOfferService)
  router = inject(Router)

}