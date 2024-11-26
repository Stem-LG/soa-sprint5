import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChevronLeft, Lock, LucideAngularModule } from 'lucide-angular';
import { JobOfferService } from '../../services/job-offer';
import { AppBarComponent } from "../../components/app-bar/app-bar";
import { AuthService } from '../../services/auth';
import { JobOfferDetailsSectionComponent } from "../../components/job-offer-details-section/job-offer-details-section";

@Component({
  selector: 'job-offer-details-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, AppBarComponent, JobOfferDetailsSectionComponent],
  providers: [JobOfferService, AuthService],
  templateUrl: './job-offer-details-page.html',
})
export class JobOfferDetailsPage {

  readonly ChevronLeft = ChevronLeft;
  readonly Lock = Lock;

  jobOfferService = inject(JobOfferService)

  authService = inject(AuthService);


}
