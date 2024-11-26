import { Component, inject, Input, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth";
import { ChevronLeft, Images, Lock, LucideAngularModule } from 'lucide-angular';
import { RecruiterJobOfferService } from "../../services/recruiter/job-offer";
import { JobOfferService } from "../../services/job-offer";
import { FileService } from "../../services/file";




@Component({
  selector: "job-offer-details-section",
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  providers: [AuthService, RecruiterJobOfferService, JobOfferService, FileService],
  templateUrl: "./job-offer-details-section.html",
})
export class JobOfferDetailsSectionComponent {

  readonly ChevronLeft = ChevronLeft;
  readonly Lock = Lock;
  readonly Images = Images

  @Input({ required: true }) offer!: jobOffer | null;
  @Input() role: User["role"] = "USER";

  authService = inject(AuthService)
  recruiterJobOfferService = inject(RecruiterJobOfferService)
  jobOfferService = inject(JobOfferService)
  fileService = inject(FileService)
  router = inject(Router)

  selectedImage = "";

  openImage(image: string) {
    this.selectedImage = image;
    //@ts-ignore
    image_modal.showModal();
  }

  deleteOffer() {
    this.recruiterJobOfferService.deleteJobOffer(this.jobOfferService.jobOffer()!).then(() => {
      this.router.navigate(['/recruiter/offers']);
    });
  }

}