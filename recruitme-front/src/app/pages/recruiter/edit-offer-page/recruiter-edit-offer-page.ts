import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArrowUp, ChevronLeft, LucideAngularModule, Plus, X } from 'lucide-angular';
import { JobOfferService } from '../../../services/job-offer';
import { RecruiterJobOfferService } from '../../../services/recruiter/job-offer';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppBarComponent } from "../../../components/app-bar/app-bar";
import { FileService } from '../../../services/file';

@Component({
  selector: 'recruiter-edit-offer-page',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, AppBarComponent],
  providers: [JobOfferService, RecruiterJobOfferService, FileService],
  templateUrl: './recruiter-edit-offer-page.html',
})
export class RecruiterEditOfferPage {

  jobOfferService = inject(JobOfferService)
  recruiterJobOfferService = inject(RecruiterJobOfferService)
  fileService = inject(FileService)
  router = inject(Router)


  readonly PlusIcon = Plus;
  readonly XIcon = X;
  readonly ArrowUpIcon = ArrowUp

  editOfferForm = new FormGroup({
    title: new FormControl(''),
    company: new FormControl(''),
    skills: new FormControl(''),
    description: new FormControl(''),
  });

  pictures: string[] = [];

  constructor() {

    effect(() => {
      this.editOfferForm.patchValue({
        title: this.jobOfferService.jobOffer()?.title,
        company: this.jobOfferService.jobOffer()?.company,
        skills: this.jobOfferService.jobOffer()?.skills,
        description: this.jobOfferService.jobOffer()?.description,
      });

      this.pictures = this.jobOfferService.jobOffer()?.images || [];
    })
  }

  updateOffer() {
    this.recruiterJobOfferService.updateJobOffer(
      {
        ...this.jobOfferService.jobOffer()!,
        title: this.editOfferForm.get('title')?.value!,
        company: this.editOfferForm.get('company')?.value!,
        skills: this.editOfferForm.get('skills')?.value!,
        description: this.editOfferForm.get('description')?.value!,
        images: this.pictures
      }
    ).then(() => {
      this.router.navigate(['/recruiter/offers/' + this.jobOfferService.jobOffer()?.id]);
    });
  }

  addPictures() {

    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = async () => {
      const files = Array.from(input.files!);
      const DBFiles = await Promise.all(files.map(file => this.fileService.uploadFile(file)));

      const pictureLinks = DBFiles.map(file => (this.fileService.apiUrl + "/" + file.id));

      this.pictures = [...this.pictures, ...pictureLinks];
    }
    input.click();

  }

  removePicture(index: number) {
    this.pictures = this.pictures.filter((_, i) => i !== index);
  }

  movePicture(index: number, direction: 'up' | 'down') {

    if (index === 0 && direction === 'up') return;
    if (index === this.pictures.length - 1 && direction === 'down') return;

    const temp = this.pictures[index];
    this.pictures[index] = this.pictures[direction === 'up' ? index - 1 : index + 1];
    this.pictures[direction === 'up' ? index - 1 : index + 1] = temp;
  }


}
